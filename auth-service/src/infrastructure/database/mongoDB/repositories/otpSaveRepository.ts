import { Otp } from "../models/otp";
import { IOtpRepository } from "../../../../domain/useCaseInterface";

export const saveOtp = async (email: string, otp: string): Promise<void> => {
  try {
    const savedOtp = await Otp.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );
    console.log(savedOtp, "consoling saved otp from otpsaveRepository");
  } catch (error: any) {
    throw new Error(error?.message);
  }
};