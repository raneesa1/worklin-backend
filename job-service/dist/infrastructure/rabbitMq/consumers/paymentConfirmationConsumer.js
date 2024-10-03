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
exports.setupPaymentConfirmationConsumer = setupPaymentConfirmationConsumer;
const sendJobOfferDetails_1 = require("../sendJobOfferDetails");
const rabbit_config_1 = require("../rabbit.config");
function setupPaymentConfirmationConsumer() {
    return __awaiter(this, void 0, void 0, function* () {
        const channel = (0, rabbit_config_1.getChannel)();
        if (!channel) {
            console.error("RabbitMQ channel not available");
            return;
        }
        yield channel.assertExchange("paymentServiceExchange", "direct", {
            durable: true,
        });
        yield channel.assertQueue("job_service_payment_confirmation", {
            durable: true,
        });
        yield channel.bindQueue("job_service_payment_confirmation", "paymentServiceExchange", "payment.confirmation");
        channel.consume("job_service_payment_confirmation", (msg) => __awaiter(this, void 0, void 0, function* () {
            if (msg) {
                const content = JSON.parse(msg.content.toString());
                console.log("Received payment confirmation message:", content);
                // Process the payment confirmation
                yield (0, sendJobOfferDetails_1.processJobOffer)(content);
                channel.ack(msg);
            }
        }));
    });
}
