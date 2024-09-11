import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const accessTokenSecret = String(process.env.AUTH_JWT_SECRET);

export const checkTokenAndRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      console.log(authHeader, "consoling the auth header from the middle ware");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ message: "Access denied. No token provided." });
      }

      const token = authHeader.split(" ")[1];
      // console.log(token, "consoling the token from middle ware");
      console.log(
        token,
        "consoling the token before decoding===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
      );
      const decoded = jwt.verify(
        token,
        String(process.env.AUTH_JWT_SECRET)
      ) as {
        accountType: string;
        userId: string;
      };
      console.log("Decoded token:", decoded);
   
      if (!allowedRoles.includes(decoded.accountType)) {
        return res
          .status(403)
          .json({ message: "Access denied. Insufficient permissions." });
      }

      (req as any).user = decoded;
      console.log("sending to next function");
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: "Token expired." });
      }
      return res.status(401).json({ message: "Invalid token." });
    }
  };
};
