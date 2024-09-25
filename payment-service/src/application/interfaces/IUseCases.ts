import {
  IGetTransactionsByUserIdUseCase,
  IGetPaymentDetailsUseCase,
  IHandlePaymentUseCase,
  IUpdatePaymentStatusUseCase,
} from "../../domain/useCaseInterface";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
  processPaymentUseCase: (dependencies: IDependencies) => IHandlePaymentUseCase;
  getTransactionsByUserIdUseCase: (
    dependencies: IDependencies
  ) => IGetTransactionsByUserIdUseCase;
  getPaymentDetailsUseCase: (
    dependencies: IDependencies
  ) => IGetPaymentDetailsUseCase;
  updatePaymentStatusUseCase: (
    dependencies: IDependencies
  ) => IUpdatePaymentStatusUseCase;
}
