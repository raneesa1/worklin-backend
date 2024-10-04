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
exports.consumePaymentData = consumePaymentData;
const amqplib_1 = __importDefault(require("amqplib"));
const useCases_1 = require("../../application/useCases");
const EXCHANGE_NAME = "paymentManagementExchange";
const QUEUE_NAME = "paymentDataQueue";
function consumePaymentData(dependencies) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rabbitMqUrl = process.env.RABBITMQ_URL;
            if (!rabbitMqUrl) {
                throw new Error("RABBITMQ_URL environment variable is not set.");
            }
            const connection = yield amqplib_1.default.connect(rabbitMqUrl);
            const channel = yield connection.createChannel();
            yield channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
            const { queue } = yield channel.assertQueue(QUEUE_NAME, { durable: true });
            yield channel.bindQueue(queue, EXCHANGE_NAME, "payment_routing_key");
            console.log(`Waiting for messages in queue: ${QUEUE_NAME}`);
            const { execute } = (0, useCases_1.processPaymentUseCase)(dependencies);
            channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg) {
                    try {
                        const message = JSON.parse(msg.content.toString());
                        console.log("Received payment data:", message);
                        yield execute(message);
                        console.log(`Payment processed: ${JSON.stringify(message)}`);
                        channel.ack(msg);
                    }
                    catch (error) {
                        console.error("Error processing payment:", error);
                        channel.nack(msg, false, false);
                    }
                }
            }));
        }
        catch (error) {
            console.error("Error setting up payment consumer:", error);
            throw error;
        }
    });
}
