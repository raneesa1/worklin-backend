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
exports.googleSignupController = void 0;
const google_auth_library_1 = require("google-auth-library");
const useCases_1 = require("../../application/useCases");
const publisher_1 = require("../../infrastructure/rabbitmq/publisher");
const generateToken_1 = __importDefault(require("../../utils/jwt/generateToken"));
const client = new google_auth_library_1.OAuth2Client("125784755803-3sor1tr15o31rjgelflafs7femkcip2e.apps.googleusercontent.com");
const googleSignupController = (dependencies) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
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
            const ticket = yield client.verifyIdToken({
                idToken: credential,
                audience: "125784755803-3sor1tr15o31rjgelflafs7femkcip2e.apps.googleusercontent.com",
            });
            console.log("after verifying");
            const payload = ticket.getPayload();
            const email = payload === null || payload === void 0 ? void 0 : payload.email;
            const name = payload === null || payload === void 0 ? void 0 : payload.name;
            const picture = payload === null || payload === void 0 ? void 0 : payload.picture;
            if (!email || !name || !picture) {
                res.status(400).json({
                    success: false,
                    message: "Failed to get required user details from Google token",
                });
                return;
            }
            const existingUser = yield (0, useCases_1.findUserByEmailUseCase)(dependencies).execute(email);
            console.log(existingUser, "existing user ---->>>>>>>>>>");
            let userData;
            if (existingUser) {
                console.log(existingUser, "existing user found");
                // User already exists, call the login function
                userData = existingUser;
                if (!userData._id) {
                    throw new Error("User ID is not defined.");
                }
                const userId = (_b = (_a = userData._id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                // Generate token
                const token = (0, generateToken_1.default)({
                    userId: userId,
                    userEmail: userData.email,
                    firstName: userData.firstName,
                    accountType: userData.accountType,
                    isBlocked: userData.isBlocked,
                    country: userData.country,
                }, "15m");
                const refreshToken = (0, generateToken_1.default)({
                    userId: userId,
                    userEmail: userData.email,
                    firstName: userData.firstName,
                    accountType: userData.accountType,
                    isBlocked: userData.isBlocked,
                    country: userData.country,
                }, "7d");
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
            const newUser = yield (0, useCases_1.googleSignupUseCase)(dependencies).execute(userData);
            console.log(newUser, "consoling the new userrrrr=r=r=r=r=r=r=r=r=r==r=r=r=r=r=rR?RRRR?RR?R?RR>R>>R>R>RR>R>R>R>R>R>R>R>R>R>R>RR>>R>R");
            yield (0, publisher_1.publishToQueue)("userQueue", newUser);
            if (newUser) {
                if (!newUser._id) {
                    throw new Error("User ID is not defined.");
                }
                const token = (0, generateToken_1.default)({
                    userId: newUser._id.toString(),
                    userEmail: newUser.email,
                    firstName: newUser.firstName,
                    accountType: newUser.accountType,
                    isBlocked: newUser.isBlocked,
                    country: (_c = newUser.country) !== null && _c !== void 0 ? _c : "",
                }, "15m");
                const refreshToken = (0, generateToken_1.default)({
                    userId: newUser._id.toString(),
                    userEmail: newUser.email,
                    firstName: newUser.firstName,
                    accountType: newUser.accountType,
                    isBlocked: newUser.isBlocked,
                    country: (_d = newUser.country) !== null && _d !== void 0 ? _d : "",
                }, "7d");
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
        }
        catch (error) {
            console.error("Google Signup error:", error);
            res
                .status(500)
                .json({ success: false, message: "Internal server error", error });
        }
    });
};
exports.googleSignupController = googleSignupController;
