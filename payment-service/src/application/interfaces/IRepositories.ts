import { IPayment, ITransaction } from "../../domain/interface/ITransaction";

export interface IRepositories {
  createPaymentRepository: (paymentData: IPayment) => Promise<IPayment>;
  getTransactionByUserIdRepository: (userId: string) => Promise<IPayment[]>;
  updatePaymentStatusRepository: (
    paymentId: string,
    status: string
  ) => Promise<IPayment | null>;
  // queuePaymentForProcessing: (payment: ITransaction) => Promise<void>;
  getPaymentByPaymentId: (paymentId: string) => Promise<IPayment | null>;
}
