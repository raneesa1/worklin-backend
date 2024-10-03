import { IPayment } from "../../../../domain/interface/ITransaction";
import { PaymentModel } from "../model/paymentModel";

export const updatePaymentStatusRepository = async (
  paymentId: string,
  status: string
): Promise<IPayment| null> => {
  try {
    console.log(
      paymentId,
      status,
      "consoling the payment id and status from the repository"
    );
    const updatedPayment = await PaymentModel.findByIdAndUpdate(
      paymentId,
      { status },
      { new: true, lean: true }
    );
    console.log(
      updatedPayment,
      "consoling the updated payment from repository"
    );
    return updatedPayment;
  } catch (error) {
    console.error("Error in updating payment status:", error);
    throw error;
  }
};
