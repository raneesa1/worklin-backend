import { ITransaction } from "../interface/ITransaction";

export interface IUpdatePaymentStatusUseCase {
  execute(paymentId: string, status: string): Promise<void>;
}
