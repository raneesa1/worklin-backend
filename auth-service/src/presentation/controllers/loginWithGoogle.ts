import { NextFunction, Request, Response } from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { IDependencies } from "../../application/interfaces/IDependencies";
import generateToken from "../../utils/jwt/generateToken";

const client = new OAuth2Client(
  "125784755803-3sor1tr15o31rjgelflafs7femkcip2e.apps.googleusercontent.com"
);

export const verifyGoogleToken = (dependencies: IDependencies) => {
  const {
    useCases: { findUserByEmailUseCase },
  } = dependencies;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log("hi from google login controller function");
    if (!req.body || !req.body.credential) {
      res.status(400).json({ message: "Bad Request: credential is missing" });
      return;
    }
    const { credential } = req.body;

    console.log(
      credential,
      "consoling the credentails from signin with google controller"
    );
    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience:
          "125784755803-3sor1tr15o31rjgelflafs7femkcip2e.apps.googleusercontent.com",
      });

      const payload = ticket.getPayload() as TokenPayload;
      const userId = payload.sub;
      const email = payload.email;
      const name = payload.name;
      const picture = payload.picture;

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

      if (!existingUser) {
        // User does not exist
        res.status(404).json({
          message: "No account found with this email. Please sign up.",
        });
        return;
      }
      if (!existingUser._id) {
        res.status(500).json({
          message: "User ID is not available.",
        });
        return;
      }
      const accountType = existingUser.accountType;

      const token = generateToken(
        {
          userId: existingUser._id.toString(),
          userEmail: existingUser.email,
          firstName: existingUser.firstName as string,
          accountType: existingUser.accountType,
          isBlocked: existingUser.isBlocked ?? false,
          country: existingUser.country ?? "",
        },
        "15m"
      );

      const refreshToken = generateToken(
        {
          userId: existingUser._id.toString(),
          userEmail: existingUser.email,
          firstName: existingUser.firstName as string,
          accountType: existingUser.accountType,
          isBlocked: existingUser.isBlocked ?? false,
          country: existingUser.country ?? "",
        },
        "7d"
      );

      // Set the token as a cookie
      res.cookie("auth", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      console.log("Cookie set from login with google:", token);

      console.log(refreshToken, "consoling the refresh token=====>>");
      res.status(200).json({
        success: true,
        message: "User authenticated",
        user: {
          userId: existingUser._id.toString(),
          email: existingUser.email,
          name,
          picture,
          accountType: existingUser.accountType,
        },
        token,
        refreshToken,
      });
    } catch (error) {
      console.error("Error verifying Google token:", error);
      res.status(401).json({ message: "Unauthorized", error });
    }
  };
};
