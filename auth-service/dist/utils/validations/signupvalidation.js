"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
exports.signupValidation = joi_1.default.object({
    firstName: joi_1.default.string().required().messages({
        "string.empty": "Username is required",
    }),
    accountType: joi_1.default.string().required().messages({
        "string.empty": "Account Type is required",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
    }),
    country: joi_1.default.string().required().messages({
        "string.empty": "Country is required",
    }),
    password: joi_1.default.string().pattern(passwordPattern).required().messages({
        "string.empty": "Password is required",
        "string.pattern.base": `Password is not strong!`,
    }),
});
