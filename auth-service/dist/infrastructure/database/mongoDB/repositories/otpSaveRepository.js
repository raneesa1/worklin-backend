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
exports.saveOtp = void 0;
const otp_1 = require("../models/otp");
const saveOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedOtp = yield otp_1.Otp.findOneAndUpdate({ email }, { otp, createdAt: new Date() }, { upsert: true, new: true });
        console.log(savedOtp, "consoling saved otp from otpsaveRepository");
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.saveOtp = saveOtp;
