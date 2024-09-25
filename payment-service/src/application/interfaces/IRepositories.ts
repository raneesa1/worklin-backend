import { IPayment, ITransaction } from "../../domain/interface/ITransaction";

export interface IRepositories {
  createPaymentRepository: (paymentData: ITransaction) => Promise<IPayment>;
  getTransactionByUserIdRepository: (userId: string) => Promise<IPayment[]>;
  updatePaymentStatusRepository: (
    paymentId: string,
    status: string
  ) => Promise<void>;
  // queuePaymentForProcessing: (payment: ITransaction) => Promise<void>;
  getPaymentByPaymentId: (paymentId: string) => Promise<IPayment | null>;
}
