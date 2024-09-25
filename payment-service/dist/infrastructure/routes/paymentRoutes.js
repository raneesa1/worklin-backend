"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const controllers_1 = require("../../presentation/controllers");
const express_2 = __importDefault(require("express")); // Add this import
const paymentWebhookController_1 = require("../../presentation/controllers/paymentWebhookController");
const paymentRoutes = (dependencies) => {
    const { getTransactions, createPaymentSession } = (0, controllers_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.route("/getTransaction/:userId").get(getTransactions);
    router.route("/createPaymentSession").post(createPaymentSession);
    router.post("/webhook", express_2.default.raw({ type: "application/json" }), (0, paymentWebhookController_1.paymentWebhookController)(dependencies));
    return router;
};
exports.paymentRoutes = paymentRoutes;
