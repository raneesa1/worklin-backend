import { Otp } from "../models/otp";
import { IOtpRepository } from "../../../../domain/useCaseInterface";

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<boolean | null> => {
  try {
    const savedOtp = await Otp.findOne({ email });
    console.log(
      savedOtp,
      "consoling the query of saved otp from the verify otp"
    );
    if (savedOtp?.otp == otp) {
      console.log("valid otp====>>>>>>");
      return true;
    }
    return false;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
