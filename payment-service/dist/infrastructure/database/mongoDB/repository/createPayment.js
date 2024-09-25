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
exports.createPaymentRepository = void 0;
const paymentModel_1 = require("../model/paymentModel");
const createPaymentRepository = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPayment = new paymentModel_1.PaymentModel(paymentData);
        const savedPayment = yield newPayment.save();
        return savedPayment.toObject();
    }
    catch (error) {
        console.error("Error in creating payment:", error);
        throw error;
    }
});
exports.createPaymentRepository = createPaymentRepository;
