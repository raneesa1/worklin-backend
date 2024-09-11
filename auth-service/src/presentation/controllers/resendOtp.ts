import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { sendVerificationEmail } from "../../utils/nodemailer";
import { generateOTP } from "../../utils/generateOtp";

export const resendOtp = (dependencies: IDependencies) => {
  const {
    useCases: { saveOtpUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body, "consoling the body from resend otp");
      const { email } = req.body as { email: string }; // Ensure email is a string
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is not provided",
        });
      }
      const newOtp = generateOTP();
      console.log(newOtp, "consoling the new otp");
      await saveOtpUseCase(dependencies).execute(email, newOtp);
      console.log("sending the email");
      await sendVerificationEmail(email, newOtp);
      return res
        .status(200)
        .json({ success: true, message: "OTP resent successfully" });
    } catch (error) {
      console.error("Error in resendOtp:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
};
