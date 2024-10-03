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
exports.processPaymentUseCase = void 0;
const processPaymentUseCase = (dependencies) => {
    const { repositories } = dependencies;
    const processPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("hi from use case ===== = = = = = = = = == == = = = = = == = = = = = = = = = = = =>");
        console.log("Processing payment:", JSON.stringify(paymentData, null, 2));
        // Validate payment data
        if (!paymentData.offerId ||
            !paymentData.contractTitle ||
            !paymentData.sender ||
            !paymentData.receiver ||
            !paymentData.totalAmount) {
            throw new Error(`Invalid payment data: ${JSON.stringify(paymentData)}`);
        }
        const payment = Object.assign(Object.assign({}, paymentData), { offerId: paymentData.offerId, dueDate: paymentData.dueDate || new Date() });
        // Process the payment
        console.log(`Processing payment of ${paymentData.totalAmount} from ${paymentData.sender.senderId} to ${paymentData.receiver.receiverId}`);
        yield repositories.createPaymentRepository(payment);
        const offerIdString = paymentData.offerId.toString();
        yield repositories.updatePaymentStatusRepository(offerIdString, "processed");
        console.log(`Payment for offer ${paymentData.offerId} processed successfully`);
    });
    return {
        execute: (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield processPayment(paymentData);
                // // Handle admin-to-freelancer payment if necessary
                // if (paymentData.receiver.type === "admin") {
                //   const adminToFreelancerPayment: ITransaction = {
                //     ...paymentData,
                //     sender: {
                //       type: "admin",
                //       accountType: "business",
                //       senderId: paymentData.receiver.receiverId,
                //     },
                //     receiver: {
                //       type: "freelancer",
                //       accountType: "individual",
                //       receiverId: paymentData.sender.senderId,
                //     },
                //   };
                //   // Queue this payment for separate processing
                //   await repositories.queuePaymentForProcessing(
                //     adminToFreelancerPayment
                //   );
                // }
            }
            catch (error) {
                console.error(`Error processing payment for offer ${paymentData.offerId}:`, error);
                const offerIdString = paymentData.offerId.toString();
                yield repositories.updatePaymentStatusRepository(offerIdString, "failed");
                throw new Error(`Payment processing failed: ${error.message}`);
            }
        }),
    };
};
exports.processPaymentUseCase = processPaymentUseCase;
