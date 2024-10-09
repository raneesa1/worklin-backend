import { IDependencies } from "../interfaces/IDependencies";
import {
  IJobOffer,
  offerStatus,
  paymentOption,
  paymentType,
  mileStone,
} from "../../domain/entities/jobOffer";
import { sendPaymentToQueue } from "../../infrastructure/rabbitMq/sendPaymentToQueue";
import { MileStoneModel } from "../../infrastructure/database/mongoDB/model/mileStoneModel";

export interface ITransaction {
  offerId: string;
  contractTitle: string;
  sender: {
    accountType: string;
    senderId: string;
  };
  receiver: {
    accountType: string;
    receiverId: string;
  };
  status: "issued" | "due" | "overdue" | "paid";
  totalAmount: number;
  dueDate: Date;
  milestoneId?: string;
}

export const acceptJobOfferUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  const createTransaction = (
    jobOffer: IJobOffer,
    sender: { accountType: string; senderId: string },
    receiver: { accountType: string; receiverId: string },
    amount: number,
    dueDate: Date,
    milestoneId?: string
  ): ITransaction => {
    if (!jobOffer._id) {
      throw new Error("Job offer ID is undefined");
    }
    return {
      offerId: jobOffer._id.toString(),
      contractTitle: jobOffer.title,
      sender,
      receiver,
      status: "issued",
      totalAmount: amount,
      dueDate,
      milestoneId,
    };
  };

  const sendTransactionToPaymentService = async (transaction: ITransaction) => {
    try {
      await sendPaymentToQueue(transaction);
      console.log(
        `Transaction sent to payment service for offerId: ${
          transaction.offerId
        }${
          transaction.milestoneId
            ? `, milestoneId: ${transaction.milestoneId}`
            : ""
        }, dueDate: ${transaction.dueDate.toISOString()}`
      );
    } catch (error) {
      console.error(`Error sending transaction to payment service: ${error}`);
      throw new Error("Failed to send transaction to payment service");
    }
  };

  const processPayment = async (
    jobOffer: IJobOffer,
    amount: number,
    dueDate: Date,
    milestoneId?: string
  ) => {
    const adminId = process.env.ADMIN_ID;
    console.log(adminId, "consoling the admin id from accept job offer");
    if (!adminId) {
      throw new Error("Admin ID is not configured");
    }

    // Client to Admin transaction
    const clientToAdminTransaction = createTransaction(
      jobOffer,
      {
        accountType: "client",
        senderId: jobOffer.clientId.toString(),
      },
      {
        accountType: "admin",
        receiverId: adminId,
      },
      amount,
      dueDate,
      milestoneId
    );
    await sendTransactionToPaymentService(clientToAdminTransaction);

    // Admin to Freelancer transaction
    const adminToFreelancerTransaction = createTransaction(
      jobOffer,
      {
        accountType: "admin",
        senderId: adminId,
      },
      {
        accountType: "freelancer",
        receiverId: jobOffer.freelancerId.toString(),
      },
      amount,
      dueDate,
      milestoneId
    );
    await sendTransactionToPaymentService(adminToFreelancerTransaction);
  };

  return {
    execute: async (
      jobOfferId: string,
      status: offerStatus
    ): Promise<IJobOffer> => {
      const jobOffer: IJobOffer = await repositories.acceptJobOfferRepository(
        jobOfferId,
        status
      );

      if (status === offerStatus.accepted) {
        if (jobOffer.paymentOption === paymentOption.mileStone) {
          const milestones = await MileStoneModel.find({
            _id: { $in: jobOffer.mileStone },
          });
          for (const milestone of milestones) {
            if (!milestone.dueDate) {
              throw new Error(
                `Milestone ${milestone._id} is missing a due date`
              );
            }
            await processPayment(
              jobOffer,
              milestone.amount,
              milestone.dueDate,
              milestone._id.toString()
            );
          }
        } else {
          // For non-milestone payments, use the dueDate from the job offer
          if (!jobOffer.dueDate) {
            throw new Error("Due date is required for non-milestone payments");
          }
          await processPayment(
            jobOffer,
            jobOffer.totalAmount,
            jobOffer.dueDate
          );
        }
      }

      return jobOffer;
    },
  };
};
