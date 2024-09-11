import {
  ILoginUserUseCase,
  ISignupUserUseCase,
  IFindUserByEmailUseCase,
  IOtpRepository,
  IVerifyOtpUseCase,
  ISaveOtpUseCase,
} from "../../domain/useCaseInterface";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
  signupUserUseCase: (dependencies: IDependencies) => ISignupUserUseCase;
  loginUserUseCase: (dependencies: IDependencies) => ILoginUserUseCase;
  findUserByEmailUseCase: (
    dependencies: IDependencies
  ) => IFindUserByEmailUseCase;
  verifyOtpUseCase: (dependencies: IDependencies) => IVerifyOtpUseCase;
  saveOtpUseCase: (dependencies: IDependencies) => ISaveOtpUseCase;

}
