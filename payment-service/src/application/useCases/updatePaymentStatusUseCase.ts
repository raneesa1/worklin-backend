import { IPayment } from "../../domain/interface/ITransaction";
import { IDependencies } from "../interfaces/IDependencies";

export const updatePaymentStatusUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (
      paymentId: string,
      status: string
    ): Promise<IPayment | null> => {
      try {
        console.log(
          paymentId,
          status,
          "consoling the payment id and status from the update payment status use case"
        );
        const paymentData = await repositories.updatePaymentStatusRepository(
          paymentId,
          status
        );
        if (paymentData) {
          return paymentData;
        }
        return null;
      } catch (error: any) {
        throw new Error(`updatePaymentStatusUseCase failed: ${error.message}`);
      }
    },
  };
};
