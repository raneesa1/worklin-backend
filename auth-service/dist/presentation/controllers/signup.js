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
exports.signupController = void 0;
const hashPassword_1 = require("../../utils/bcrypt/hashPassword");
const nodemailer_1 = require("../../utils/nodemailer");
const generateOtp_1 = require("../../utils/generateOtp");
const generateToken_1 = __importDefault(require("../../utils/jwt/generateToken"));
const signupvalidation_1 = require("../../utils/validations/signupvalidation");
const publisher_1 = require("../../infrastructure/rabbitmq/publisher");
const signupController = (dependencies) => {
    const { useCases: { signupUserUseCase, findUserByEmailUseCase, verifyOtpUseCase, saveOtpUseCase, }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const userCredentials = req.body;
        const { email, otp } = userCredentials;
        try {
            // When there's no OTP, validate the user details and send OTP
            if (!otp) {
                // Validate user credentials
                const { error, value } = signupvalidation_1.signupValidation.validate(userCredentials, {
                    abortEarly: false,
                });
                if (error) {
                    const errorMessages = error.details
                        .map((detail) => detail.message)
                        .join(", ");
                    return res.status(400).json({
                        success: false,
                        message: errorMessages,
                    });
                }
                // Check whether the user email is taken
                const userExist = yield findUserByEmailUseCase(dependencies).execute(email);
                if (userExist) {
                    return res.status(409).json({
                        success: false,
                        message: "Email is already registered. Try another email",
                    });
                }
                // Generate and save OTP
                const newOtp = (0, generateOtp_1.generateOTP)();
                yield saveOtpUseCase(dependencies).execute(email, newOtp);
                yield (0, nodemailer_1.sendVerificationEmail)(email, newOtp);
                return res
                    .status(200)
                    .json({ success: true, message: "OTP sent successfully" });
            }
            // When OTP is present, verify it
            if (otp) {
                // Verify OTP
                const isVerified = yield verifyOtpUseCase(dependencies).execute(email, otp);
                if (!isVerified) {
                    return res.status(401).json({
                        success: false,
                        message: "OTP is invalid. Please try again",
                    });
                }
                // Proceed with user registration if OTP is valid
                const { error, value } = signupvalidation_1.signupValidation.validate(userCredentials, {
                    abortEarly: false,
                    allowUnknown: true, // Allow unknown fields (e.g., otp)
                });
                if (error) {
                    return res.status(400).json({
                        success: false,
                        message: "Password must contain one capital letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long.",
                    });
                }
                value.password = yield (0, hashPassword_1.hashPassword)(value.password);
                const userData = yield signupUserUseCase(dependencies).execute(value);
                if (!userData) {
                    return res.status(500).json({
                        success: false,
                        message: "Something went wrong creating user",
                    });
                }
                yield (0, publisher_1.publishToQueue)("userQueue", userData);
                const userId = (_b = (_a = userData._id) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
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
                console.log("Cookie set from signup controller:", token);
                return res.status(200).json({
                    success: true,
                    user: userData,
                    message: "User created successfully",
                    token,
                    refreshToken,
                });
            }
        }
        catch (error) {
            console.error("Error in signupController:", error);
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    });
};
exports.signupController = signupController;
