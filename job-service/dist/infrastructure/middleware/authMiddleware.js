"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTokenAndRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessTokenSecret = String(process.env.AUTH_JWT_SECRET);
const checkTokenAndRole = (allowedRoles) => {
    return (req, res, next) => {
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
            // console.log(
            //   token,
            //   "consoling the token before decoding===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
            // );
            const decoded = jsonwebtoken_1.default.verify(token, String(process.env.AUTH_JWT_SECRET));
            console.log("Decoded token:===<><><><><><><><><><><>", decoded);
            if (!allowedRoles.includes(decoded.accountType)) {
                return res
                    .status(403)
                    .json({ message: "Access denied. Insufficient permissions." });
            }
            req.user = decoded;
            console.log("sending to next function");
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return res.status(401).json({ message: "Token expired." });
            }
            return res.status(401).json({ message: "Invalid token." });
        }
    };
};
exports.checkTokenAndRole = checkTokenAndRole;
