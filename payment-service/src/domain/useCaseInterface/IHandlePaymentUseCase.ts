 import { ITransaction } from "../interface/ITransaction";


export interface IHandlePaymentUseCase {
  execute(paymentData: ITransaction): Promise<void>;
}
