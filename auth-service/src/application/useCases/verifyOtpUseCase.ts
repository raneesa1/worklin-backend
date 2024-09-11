// application/useCases/verifyOtpUseCase.ts
import { IDependencies } from "../interfaces/IDependencies";

export const verifyOtpUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;
  const { verifyOtp } = repositories;

  return {
    execute: async (email: string, otp: string) => {
      try {
         const result = await verifyOtp(email, otp);
         // Default to false if result is null
         return result ?? false;
        
      } catch (error) {
        console.log("Something went wrong in verify OTP use case", error);
        return false;
      }
    },
  };
};
