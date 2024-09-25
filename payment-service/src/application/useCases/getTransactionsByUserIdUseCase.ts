import { IPayment, ITransaction } from "../../domain/interface/ITransaction";
import { IHandlePaymentUseCase } from "../../domain/useCaseInterface";
import { IDependencies } from "../interfaces/IDependencies";

export const getTransactionsByUserIdUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (userId: string): Promise<IPayment[]> => {
      try {
        return await repositories.getTransactionByUserIdRepository(userId);
      } catch (error: any) {
        throw new Error(
          `getTransactionsByUserIdUseCase  failed: ${error.message}`
        );
      }
    },
  };
};
