import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const accessTokenSecret = String(process.env.AUTH_JWT_SECRET);
const refreshTokenSecret = String(process.env.AUTH_JWT_SECRET);
interface TokenPayload {
  userId: string;
  firstName: string;
  userEmail: string;
  accountType: string;
  isBlocked?: boolean;
  country?: string;
}

export const refreshTokenController = () => {
  return async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
      }

      // Verify the refresh token and extract the payload
      const decoded = jwt.verify(
        refreshToken,
        refreshTokenSecret
      ) as TokenPayload;

      // Use the full payload to generate a new access token
      const accessToken = jwt.sign(
        {
          userId: decoded.userId,
          firstName: decoded.firstName,
          userEmail: decoded.userEmail,
          accountType: decoded.accountType,
          isBlocked: decoded.isBlocked, // Optional fields are also passed
          country: decoded.country,
        },
        accessTokenSecret,
        { expiresIn: "15m" }
      );

      // Generate a new refresh token with the full payload
      const newRefreshToken = jwt.sign(
        {
          userId: decoded.userId,
          firstName: decoded.firstName,
          userEmail: decoded.userEmail,
          accountType: decoded.accountType,
          isBlocked: decoded.isBlocked,
          country: decoded.country,
        },
        refreshTokenSecret,
        { expiresIn: "7d" }
      );

      // Return the new tokens
      res.json({
        accessToken,
        refreshToken: newRefreshToken,
        message: "Token refreshed successfully",
      });
    } catch (error) {
      console.error("Token refresh error:", error);

      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: "Refresh token has expired" });
      }

      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      res.status(500).json({ message: "Internal server error" });
    }
  };
};
