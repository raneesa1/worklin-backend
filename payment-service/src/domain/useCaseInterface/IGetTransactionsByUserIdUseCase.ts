import { IPayment, ITransaction } from "../interface/ITransaction";

export interface IGetTransactionsByUserIdUseCase {
  execute(userId: string): Promise<IPayment[]>;
}
