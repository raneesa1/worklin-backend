import { IPayment } from "../../domain/interface/ITransaction";
 import { IDependencies } from "../interfaces/IDependencies";

export const getPaymentDetailsUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (paymentId: string): Promise<IPayment | null> => {
      return await repositories.getPaymentByPaymentId(paymentId);
    },
  };
};
