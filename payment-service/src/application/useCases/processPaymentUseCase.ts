import mongoose from "mongoose";
import { IPayment, ITransaction } from "../../domain/interface/ITransaction";
import { IHandlePaymentUseCase } from "../../domain/useCaseInterface";
import { IDependencies } from "../interfaces/IDependencies";

export const processPaymentUseCase = (
  dependencies: IDependencies
): IHandlePaymentUseCase => {
  const { repositories } = dependencies;

  const processPayment = async (paymentData: ITransaction): Promise<void> => {
    console.log(
      "hi from use case ===== = = = = = = = = == == = = = = = == = = = = = = = = = = = =>"
    );
    console.log("Processing payment:", JSON.stringify(paymentData, null, 2));

    // Validate payment data
    if (
      !paymentData.offerId ||
      !paymentData.contractTitle ||
      !paymentData.sender ||
      !paymentData.receiver ||
      !paymentData.totalAmount
    ) {
      throw new Error(`Invalid payment data: ${JSON.stringify(paymentData)}`);
    }

    const payment: IPayment = {
      ...paymentData,
      offerId: paymentData.offerId, // Convert ObjectId to string
      dueDate: paymentData.dueDate || new Date(), // Provide a default value if dueDate is undefined
    };

    // Process the payment
    console.log(
      `Processing payment of ${paymentData.totalAmount} from ${paymentData.sender.senderId} to ${paymentData.receiver.receiverId}`
    );

    await repositories.createPaymentRepository(payment);
     const offerIdString: string = (paymentData.offerId as unknown as mongoose.Types.ObjectId).toString();

    await repositories.updatePaymentStatusRepository(
      offerIdString,
      "processed"
    );

    console.log(
      `Payment for offer ${paymentData.offerId} processed successfully`
    );
  };

  return {
    execute: async (paymentData: ITransaction): Promise<void> => {
      try {
        await processPayment(paymentData);

        // // Handle admin-to-freelancer payment if necessary
        // if (paymentData.receiver.type === "admin") {
        //   const adminToFreelancerPayment: ITransaction = {
        //     ...paymentData,
        //     sender: {
        //       type: "admin",
        //       accountType: "business",
        //       senderId: paymentData.receiver.receiverId,
        //     },
        //     receiver: {
        //       type: "freelancer",
        //       accountType: "individual",
        //       receiverId: paymentData.sender.senderId,
        //     },
        //   };

        //   // Queue this payment for separate processing
        //   await repositories.queuePaymentForProcessing(
        //     adminToFreelancerPayment
        //   );
        // }
      } catch (error: any) {
        console.error(
          `Error processing payment for offer ${paymentData.offerId}:`,
          error
        );
         const offerIdString: string = (
           paymentData.offerId as unknown as mongoose.Types.ObjectId
         ).toString();

        await repositories.updatePaymentStatusRepository(
          offerIdString,
          "failed"
        );
        throw new Error(`Payment processing failed: ${error.message}`);
      }
    },
  };
};
