// application/useCases/saveOtpUseCase.ts
import { IDependencies } from "../interfaces/IDependencies";

export const saveOtpUseCase = (dependencies: IDependencies) => {
  const { repositories:{saveOtp} } = dependencies;

  return {
    execute: async (email: string, otp: string) => {
      try {
        await saveOtp(email, otp);
      } catch (error) {
        console.log("Something went wrong in save OTP use case", error);
      }
    },
  };
};
