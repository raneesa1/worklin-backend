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
exports.sendPaymentToQueue = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const EXCHANGE_NAME = "paymentManagementExchange";
const sendPaymentToQueue = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rabbitMqUrl = process.env.RABBITMQ_URL;
        if (!rabbitMqUrl) {
            throw new Error("RABBITMQ_URL environment variable is not set.");
        }
        const connection = yield amqplib_1.default.connect(rabbitMqUrl);
        const channel = yield connection.createChannel();
        yield channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
        channel.publish(EXCHANGE_NAME, "payment_routing_key", Buffer.from(JSON.stringify(paymentData)));
        console.log("Payment data sent to exchange:", paymentData);
        yield channel.close();
        yield connection.close();
    }
    catch (error) {
        console.error("Error sending payment data to exchange:", error);
        throw error;
    }
});
exports.sendPaymentToQueue = sendPaymentToQueue;
const sendTransactionToPaymentService = (transaction) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.sendPaymentToQueue)(transaction);
        console.log(`Transaction sent to payment service for offerId: ${transaction.offerId}`);
    }
    catch (error) {
        console.error(`Error sending transaction to payment service: ${error}`);
        throw new Error("Failed to send transaction to payment service");
    }
});
