// controllers/signupController.ts
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { hashPassword } from "../../utils/bcrypt/hashPassword";
import { sendVerificationEmail } from "../../utils/nodemailer";
import { generateOTP } from "../../utils/generateOtp";
import generateToken from "../../utils/jwt/generateToken";
import { signupValidation } from "../../utils/validations/signupvalidation";
import { publishToQueue } from "../../infrastructure/rabbitmq/publisher";

export const signupController = (dependencies: IDependencies) => {
  const {
    useCases: {
      signupUserUseCase,
      findUserByEmailUseCase,
      verifyOtpUseCase,
      saveOtpUseCase,
    },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    const userCredentials = req.body;
    const { email, otp } = userCredentials;

    try {
      // When there's no OTP, validate the user details and send OTP
      if (!otp) {
        // Validate user credentials
        const { error, value } = signupValidation.validate(userCredentials, {
          abortEarly: false,
        });
        if (error) {
          const errorMessages = error.details
            .map((detail) => detail.message)
            .join(", ");
          return res.status(400).json({
            success: false,
            message: errorMessages,
          });
        }

        // Check whether the user email is taken
        const userExist = await findUserByEmailUseCase(dependencies).execute(
          email
        );
        if (userExist) {
          return res.status(409).json({
            success: false,
            message: "Email is already registered. Try another email",
          });
        }

        // Generate and save OTP
        const newOtp = generateOTP();
        await saveOtpUseCase(dependencies).execute(email, newOtp);
        await sendVerificationEmail(email, newOtp);

        return res
          .status(200)
          .json({ success: true, message: "OTP sent successfully" });
      }

      // When OTP is present, verify it
      if (otp) {
        // Verify OTP
        const isVerified = await verifyOtpUseCase(dependencies).execute(
          email,
          otp
        );

        if (!isVerified) {
          return res.status(401).json({
            success: false,
            message: "OTP is invalid. Please try again",
          });
        }

        // Proceed with user registration if OTP is valid
        const { error, value } = signupValidation.validate(userCredentials, {
          abortEarly: false,
          allowUnknown: true, // Allow unknown fields (e.g., otp)
        });
        if (error) {
          return res.status(400).json({
            success: false,
            message:
              "Password must contain one capital letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long.",
          });
        }

        value.password = await hashPassword(value.password);
        const userData = await signupUserUseCase(dependencies).execute(value);

        if (!userData) {
          return res.status(500).json({
            success: false,
            message: "Something went wrong creating user",
          });
        }
        await publishToQueue("userQueue", userData);
        const userId: string = userData._id?.toString() ?? "";
        const token = generateToken(
          {
            userId: userId,
            userEmail: userData.email,
            firstName: userData.firstName as string,
            accountType: userData.accountType,
            isBlocked: userData.isBlocked,
            country: userData.country,
          },
          "15m"
        );

        const refreshToken = generateToken(
          {
            userId: userId,
            userEmail: userData.email,
            firstName: userData.firstName as string,
            accountType: userData.accountType,
            isBlocked: userData.isBlocked,
            country: userData.country,
          },
          "7d"
        );

        res.cookie("auth", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        console.log("Cookie set from signup controller:", token);

        return res.status(200).json({
          success: true,
          user: userData,
          message: "User created successfully",
          token,
          refreshToken,
        });
      }
    } catch (error) {
      console.error("Error in signupController:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
};
