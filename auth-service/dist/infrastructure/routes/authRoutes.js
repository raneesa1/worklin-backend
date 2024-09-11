"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const index_1 = require("../../presentation/controllers/index");
// import { verifyOtpController } from "../../presentation/controllers/otp";
const authRoutes = (dependencies) => {
    const { signup, login, emailExists, googleSignin, refreshToken, googleSignup, resendOtp, } = (0, index_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route("/signup").post(signup);
    router.route("/resend-otp").post(resendOtp);
    router.route("/login").post(login);
    router.route("/check-email").get(emailExists);
    router.route("/google-signin").post(googleSignin);
    router.route("/google-signup").post(googleSignup);
    router.route("/refresh-token").post(refreshToken);
    return router;
};
exports.authRoutes = authRoutes;
