import { IPayment, ITransaction } from "../interface/ITransaction";

export interface IGetPaymentDetailsUseCase {
  execute(offerId: string): Promise<IPayment | null>;
}