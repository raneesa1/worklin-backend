import mongoose from "mongoose";
import { PaymentModel } from "../model/paymentModel";
import { IPayment } from "../../../../domain/interface/ITransaction";

export const updatePaymentStatusRepository = async (
  paymentId: string,
  status:string
): Promise<void> => {
  try {
    console.log(
      paymentId,
      status,
      "consoling the payment id and status from the repository"
    );
    const updatedPayment = await PaymentModel.findByIdAndUpdate(
      paymentId,
      { status },
      { updatedAt: new Date() }
    ).lean();
    console.log(
      updatedPayment,
      "consoling the updated payment from repository"
    );
  } catch (error) {
    console.error("Error in updating payment status:", error);
    throw error;
  }
};
