"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const accessTokenSecret = String(process.env.AUTH_JWT_SECRET);
const refreshTokenSecret = String(process.env.AUTH_JWT_SECRET);
const refreshTokenController = () => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({ message: "Refresh token is required" });
            }
            // Verify the refresh token and extract the payload
            const decoded = jsonwebtoken_1.default.verify(refreshToken, refreshTokenSecret);
            // Use the full payload to generate a new access token
            const accessToken = jsonwebtoken_1.default.sign({
                userId: decoded.userId,
                firstName: decoded.firstName,
                userEmail: decoded.userEmail,
                accountType: decoded.accountType,
                isBlocked: decoded.isBlocked, // Optional fields are also passed
                country: decoded.country,
            }, accessTokenSecret, { expiresIn: "15m" });
            // Generate a new refresh token with the full payload
            const newRefreshToken = jsonwebtoken_1.default.sign({
                userId: decoded.userId,
                firstName: decoded.firstName,
                userEmail: decoded.userEmail,
                accountType: decoded.accountType,
                isBlocked: decoded.isBlocked,
                country: decoded.country,
            }, refreshTokenSecret, { expiresIn: "7d" });
            // Return the new tokens
            res.json({
                accessToken,
                refreshToken: newRefreshToken,
                message: "Token refreshed successfully",
            });
        }
        catch (error) {
            console.error("Token refresh error:", error);
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return res.status(401).json({ message: "Refresh token has expired" });
            }
            if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return res.status(401).json({ message: "Invalid refresh token" });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.refreshTokenController = refreshTokenController;
