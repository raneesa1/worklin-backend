import { IDependencies } from "../../application/interfaces/IDependencies";
import { createPaymentSessionController } from "./createPaymentSessionController";
import { getTransactionsByUserIdController } from "./getTransactionsByUserIdController";

export const controllers = (dependencies: IDependencies) => {
  return {
    getTransactions: getTransactionsByUserIdController(dependencies),
    createPaymentSession: createPaymentSessionController(dependencies),
  };
};
