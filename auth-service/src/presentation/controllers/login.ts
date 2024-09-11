import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import generateToken from "../../utils/jwt/generateToken";
import { UserEntity } from "../../domain/entities";

export const loginController = (dependencies: IDependencies) => {
  const {
    useCases: { loginUserUseCase },
  } = dependencies;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res
          .status(400)
          .json({ success: false, message: "Email and password are required" });
        return;
      }

      const user: UserEntity | null = await loginUserUseCase(
        dependencies
      ).execute({ email, password });

      if (user) {
        const userId: string = user._id?.toString() ?? "";
        const token = generateToken(
          {
            userId: userId,
            userEmail: user.email,
            firstName: user.firstName as string,
            accountType: user.accountType,
            isBlocked: user.isBlocked,
            country: user.country,
          },
          "15m"
        );

        const refreshToken = generateToken(
          {
            userId: userId,
            userEmail: user.email,
            firstName: user.firstName as string,
            accountType: user.accountType,
            isBlocked: user.isBlocked,
            country: user.country,
          },
          "7d"
        );

        res.cookie("auth", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 15 * 60 * 1000, // 15 minutes
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        console.log("Cookie set from login controller:", token);
        res.status(200).json({
          success: true,
          user,
          message: "Login successful",
          token,
          refreshToken,
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }
    } catch (error) {
      next(error);
    }
  };
};
