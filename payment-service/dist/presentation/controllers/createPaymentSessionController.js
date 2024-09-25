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
exports.createPaymentSessionController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const STRIPE_SECRET = process.env.STRIPE_SECRET ||
    "sk_test_51PyTWU06QK8ZKcxNMntPf025XOBtVL8QQPcwQhEBcSxhxCPv924zCndsSLnxfh9fBu3P9kSs8BvhblVFxvXaB5Sv00PrwpKiOa";
const FRONTEND_URL = "http://localhost:4200";
console.log(STRIPE_SECRET, "consoling the stripe secret=========>>>");
const stripe = new stripe_1.default(STRIPE_SECRET, {
    apiVersion: "2024-06-20",
});
const createPaymentSessionController = (dependencies) => {
    const { useCases: { getPaymentDetailsUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { paymentId } = req.body;
        if (!paymentId) {
            return res.status(400).json({ error: "paymentId is required" });
        }
        try {
            const paymentDetails = yield getPaymentDetailsUseCase(dependencies).execute(paymentId);
            if (!paymentDetails) {
                return res.status(404).json({ error: "Payment details not found" });
            }
            const lineItems = [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: paymentDetails.contractTitle,
                        },
                        unit_amount: Math.round(paymentDetails.totalAmount * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ];
            const session = yield stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment", // Changed from "subscription" to "payment"
                success_url: `${FRONTEND_URL}/payment-success?amount=${paymentDetails.totalAmount}&receiver=${paymentDetails.receiver.receiverId}`,
                cancel_url: `${FRONTEND_URL}/payment-fail?amount=${paymentDetails.totalAmount}&receiver=${paymentDetails.receiver.receiverId}`,
                metadata: {
                    paymentId: paymentId.toString(),
                    senderId: paymentDetails.sender.senderId.toString(),
                    receiverId: paymentDetails.receiver.receiverId.toString(),
                    amount: paymentDetails.totalAmount.toString(),
                },
            });
            res.status(200).json({
                success: true,
                id: session.id,
                message: "payment session created",
            });
        }
        catch (error) {
            next(error);
        }
    });
};
exports.createPaymentSessionController = createPaymentSessionController;
