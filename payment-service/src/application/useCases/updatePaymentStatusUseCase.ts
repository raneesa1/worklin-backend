import { IDependencies } from "../interfaces/IDependencies";

export const updatePaymentStatusUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (paymentId: string, status: string): Promise<void> => {
      try {
        console.log(
          paymentId,
          status,
          "consoling the payment id and status from the update payment status use case"
        );
        return await repositories.updatePaymentStatusRepository(
          paymentId,
          status
        );
      } catch (error: any) {
        throw new Error(
          `getAdminTransactionsUseCase  failed: ${error.message}`
        );
      }
    },
  };
};
