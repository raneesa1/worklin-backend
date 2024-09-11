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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtp = void 0;
const nodemailer_1 = require("../../utils/nodemailer");
const generateOtp_1 = require("../../utils/generateOtp");
const resendOtp = (dependencies) => {
    const { useCases: { saveOtpUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body, "consoling the body from resend otp");
            const { email } = req.body; // Ensure email is a string
            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "Email is not provided",
                });
            }
            const newOtp = (0, generateOtp_1.generateOTP)();
            console.log(newOtp, "consoling the new otp");
            yield saveOtpUseCase(dependencies).execute(email, newOtp);
            console.log("sending the email");
            yield (0, nodemailer_1.sendVerificationEmail)(email, newOtp);
            return res
                .status(200)
                .json({ success: true, message: "OTP resent successfully" });
        }
        catch (error) {
            console.error("Error in resendOtp:", error);
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    });
};
exports.resendOtp = resendOtp;
