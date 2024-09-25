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
exports.paymentWebhookController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dependencies_1 = require("../../config/dependencies");
// Make sure this is your actual secret key
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ||
    "sk_test_51PyTWU06QK8ZKcxNMntPf025XOBtVL8QQPcwQhEBcSxhxCPv924zCndsSLnxfh9fBu3P9kSs8BvhblVFxvXaB5Sv00PrwpKiOa";
const stripe = new stripe_1.default(STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
});
const STRIPE_ENDPOINT_SECRET = "whsec_2633ce1bdcd212f059fba110efd5291bd24f72031ed3f556cb6ad4ab4d43417e";
const paymentWebhookController = (dependencies) => {
    const { useCases: { updatePaymentStatusUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const stripeSignature = req.headers["stripe-signature"];
        if (!stripeSignature) {
            console.log("no stripe signature");
            return res.status(400).send("No Stripe signature found");
        }
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, stripeSignature.toString(), STRIPE_ENDPOINT_SECRET);
        }
        catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
        try {
            switch (event.type) {
                case "checkout.session.completed": {
                    console.log("inside the checkout session completed event");
                    const session = event.data.object;
                    console.log(session, "consoling the session of completed event");
                    console.log("Session metadata:", session.metadata);
                    yield handleSuccessfulPayment(session, updatePaymentStatusUseCase);
                    break;
                }
                case "payment_intent.payment_failed": {
                    const paymentIntent = event.data.object;
                    yield handleFailedPayment(paymentIntent, updatePaymentStatusUseCase);
                    break;
                }
                default:
                    console.log(`Unhandled event type ${event.type}`); // Add this line
            }
            res.json({ received: true });
        }
        catch (error) {
            console.error("Error processing webhook:", error);
            res.status(500).send("Error processing webhook");
        }
    });
};
exports.paymentWebhookController = paymentWebhookController;
function handleSuccessfulPayment(session, updatePaymentStatusUseCase) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const paymentId = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.paymentId;
        if (paymentId) {
            yield updatePaymentStatusUseCase(dependencies_1.dependencies).execute(paymentId, "paid");
        }
    });
}
function handleFailedPayment(paymentIntent, updatePaymentStatusUseCase) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const paymentId = (_a = paymentIntent.metadata) === null || _a === void 0 ? void 0 : _a.paymentId;
        if (paymentId) {
            yield updatePaymentStatusUseCase(dependencies_1.dependencies).execute(paymentId, "paymentFailed");
        }
    });
}
