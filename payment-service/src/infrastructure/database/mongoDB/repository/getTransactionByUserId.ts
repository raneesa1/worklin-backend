import mongoose from "mongoose";
import { IPayment } from "../../../../domain/interface/ITransaction";
import { PaymentModel } from "../model/paymentModel";

export const getTransactionByUserIdRepository = async (
  userId: string
): Promise<IPayment[]> => {
  try {
    const objectId = new mongoose.Types.ObjectId(userId);

     const payments = await PaymentModel.find({
      $or: [
        { "sender.senderId": objectId }, // Admin as sender
        { "receiver.receiverId": objectId }, // Admin as receiver
      ],
    }).sort({ createdAt: -1 });

    console.log(payments, "consoling the admin transactions");
    return payments;
  } catch (error) {
    console.error("Error fetching payments by ID:", error);
    throw error;
  }
};
