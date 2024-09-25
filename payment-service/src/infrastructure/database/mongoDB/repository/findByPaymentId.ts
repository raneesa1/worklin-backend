import { IPayment } from "../../../../domain/interface/ITransaction";
import { PaymentModel } from "../model/paymentModel";

export const getPaymentByPaymentId = async (
  paymentId: string
): Promise<IPayment | null> => {
  try {
    console.log(paymentId, "offer id ");
     return await PaymentModel.findById(paymentId).exec();
  } catch (error) {
    console.error("Error fetching payment by offer ID:", error);
    throw error;
  }
};
