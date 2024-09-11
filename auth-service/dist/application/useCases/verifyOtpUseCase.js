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
exports.verifyOtpUseCase = void 0;
const verifyOtpUseCase = (dependencies) => {
    const { repositories } = dependencies;
    const { verifyOtp } = repositories;
    return {
        execute: (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield verifyOtp(email, otp);
                // Default to false if result is null
                return result !== null && result !== void 0 ? result : false;
            }
            catch (error) {
                console.log("Something went wrong in verify OTP use case", error);
                return false;
            }
        }),
    };
};
exports.verifyOtpUseCase = verifyOtpUseCase;
