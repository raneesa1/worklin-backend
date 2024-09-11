import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = String(process.env.AUTH_JWT_SECRET);

interface TokenPayload {
  userId: string;
  firstName: string;
  userEmail: string;
  accountType: string;
  isBlocked?: boolean;
  country?: string;
}

export default (payload: TokenPayload, expiresIn: string | number) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresIn,
  });
};
