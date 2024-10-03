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
exports.updatePaymentStatusUseCase = void 0;
const updatePaymentStatusUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute: (paymentId, status) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log(paymentId, status, "consoling the payment id and status from the update payment status use case");
                const paymentData = yield repositories.updatePaymentStatusRepository(paymentId, status);
                if (paymentData) {
                    return paymentData;
                }
                return null;
            }
            catch (error) {
                throw new Error(`updatePaymentStatusUseCase failed: ${error.message}`);
            }
        }),
    };
};
exports.updatePaymentStatusUseCase = updatePaymentStatusUseCase;
