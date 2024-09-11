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
exports.verifyGoogleToken = void 0;
const google_auth_library_1 = require("google-auth-library");
const generateToken_1 = __importDefault(require("../../utils/jwt/generateToken"));
const client = new google_auth_library_1.OAuth2Client("125784755803-3sor1tr15o31rjgelflafs7femkcip2e.apps.googleusercontent.com");
const verifyGoogleToken = (dependencies) => {
    const { useCases: { findUserByEmailUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        console.log("hi from google login controller function");
        if (!req.body || !req.body.credential) {
            res.status(400).json({ message: "Bad Request: credential is missing" });
            return;
        }
        const { credential } = req.body;
        console.log(credential, "consoling the credentails from signin with google controller");
        try {
            const ticket = yield client.verifyIdToken({
                idToken: credential,
                audience: "125784755803-3sor1tr15o31rjgelflafs7femkcip2e.apps.googleusercontent.com",
            });
            const payload = ticket.getPayload();
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
            const existingUser = yield findUserByEmailUseCase(dependencies).execute(email);
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
            const token = (0, generateToken_1.default)({
                userId: existingUser._id.toString(),
                userEmail: existingUser.email,
                firstName: existingUser.firstName,
                accountType: existingUser.accountType,
                isBlocked: (_a = existingUser.isBlocked) !== null && _a !== void 0 ? _a : false,
                country: (_b = existingUser.country) !== null && _b !== void 0 ? _b : "",
            }, "15m");
            const refreshToken = (0, generateToken_1.default)({
                userId: existingUser._id.toString(),
                userEmail: existingUser.email,
                firstName: existingUser.firstName,
                accountType: existingUser.accountType,
                isBlocked: (_c = existingUser.isBlocked) !== null && _c !== void 0 ? _c : false,
                country: (_d = existingUser.country) !== null && _d !== void 0 ? _d : "",
            }, "7d");
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
        }
        catch (error) {
            console.error("Error verifying Google token:", error);
            res.status(401).json({ message: "Unauthorized", error });
        }
    });
};
exports.verifyGoogleToken = verifyGoogleToken;
