import { NextFunction, Request, Response } from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { IDependencies } from "../../application/interfaces/IDependencies";
import {
  findUserByEmailUseCase,
  googleSignupUseCase,
  loginUserUseCase,
} from "../../application/useCases";
import { publishToQueue } from "../../infrastructure/rabbitmq/publisher";
import generateToken from "../../utils/jwt/generateToken";

const client = new OAuth2Client(
  "125784755803-3sor1tr15o31rjgelflafs7femkcip2e.apps.googleusercontent.com"
);

export const googleSignupController = (dependencies: IDependencies) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log("hi from google signup controller");
      const { credential, accountType } = req.body;

      console.log(req.body, "consoling the req body from signup with google");
      if (!credential || !accountType) {
        res.status(400).json({
          success: false,
          message: "Credential and accountType are required",
        });
        return;
      }

      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience:
          "125784755803-3sor1tr15o31rjgelflafs7femkcip2e.apps.googleusercontent.com",
      });

      console.log("after verifying");

      const payload = ticket.getPayload() as TokenPayload;
      const email = payload?.email;
      const name = payload?.name;
      const picture = payload?.picture;

      if (!email || !name || !picture) {
        res.status(400).json({
          success: false,
          message: "Failed to get required user details from Google token",
        });
        return;
      }

      const existingUser = await findUserByEmailUseCase(dependencies).execute(
        email
      );
      console.log(existingUser, "existing user ---->>>>>>>>>>");

      let userData;

      if (existingUser) {
        console.log(existingUser, "existing user found");
        // User already exists, call the login function
        userData = existingUser;
        if (!userData._id) {
          throw new Error("User ID is not defined.");
        }
        const userId: string = userData._id?.toString() ?? "";

        // Generate token
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
          "7d",
         );

        res.cookie("auth", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        res.status(200).json({
          success: true,
          message: "User logged in successfully",
          user: userData,
          token,
          refreshToken,
        });
        return;
      }
      // Create a new user
      userData = {
        email,
        name,
        picture,
        accountType,
      };

      const newUser = await googleSignupUseCase(dependencies).execute(userData);
      console.log(
        newUser,
        "consoling the new userrrrr=r=r=r=r=r=r=r=r=r==r=r=r=r=r=rR?RRRR?RR?R?RR>R>>R>R>RR>R>R>R>R>R>R>R>R>R>R>RR>>R>R"
      );
      await publishToQueue("userQueue", newUser);
      if (newUser) {
        if (!newUser._id) {
          throw new Error("User ID is not defined.");
        }

        const token = generateToken(
          {
            userId: newUser._id.toString(),
            userEmail: newUser.email,
            firstName: newUser.firstName as string,
            accountType: newUser.accountType,
            isBlocked: newUser.isBlocked,
            country: newUser.country ?? "",
          },
          "15m"
        );
        const refreshToken = generateToken(
          {
            userId: newUser._id.toString(),
            userEmail: newUser.email,
            firstName: newUser.firstName as string,
            accountType: newUser.accountType,
            isBlocked: newUser.isBlocked,
            country: newUser.country ?? "",
          },
          "7d",
        );
        res.cookie("auth", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        console.log("Cookie set from signup with gogole:", token);

        res.status(201).json({
          success: true,
          message: "User registered successfully",
          user: newUser,
          token,
          refreshToken,
        });
      }
    } catch (error) {
      console.error("Google Signup error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error });
    }
  };
};
