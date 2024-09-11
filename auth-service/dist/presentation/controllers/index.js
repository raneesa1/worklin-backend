"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const emailExistsController_1 = require("./emailExistsController");
const login_1 = require("./login");
const loginWithGoogle_1 = require("./loginWithGoogle");
const refreshToken_1 = require("./refreshToken");
const resendOtp_1 = require("./resendOtp");
const signup_1 = require("./signup");
const signupWithGoogle_1 = require("./signupWithGoogle");
const controllers = (dependencies) => {
    return {
        signup: (0, signup_1.signupController)(dependencies),
        login: (0, login_1.loginController)(dependencies),
        emailExists: (0, emailExistsController_1.emailExistsController)(dependencies),
        googleSignin: (0, loginWithGoogle_1.verifyGoogleToken)(dependencies),
        googleSignup: (0, signupWithGoogle_1.googleSignupController)(dependencies),
        resendOtp: (0, resendOtp_1.resendOtp)(dependencies),
        refreshToken: (0, refreshToken_1.refreshTokenController)(),
    };
};
exports.controllers = controllers;
