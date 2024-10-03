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
exports.sendPaymentConfirmation = sendPaymentConfirmation;
const rabbit_config_1 = require("./rabbit.config");
function sendPaymentConfirmation(offerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const channel = yield (0, rabbit_config_1.getChannel)(); // Await the async channel getter
            if (channel) {
                const message = JSON.stringify({ offerId, status: "paid" });
                console.log(message, "consoling the message from payment service");
                const exchange = "paymentServiceExchange";
                const routingKey = "payment.confirmation";
                channel.publish(exchange, routingKey, Buffer.from(message));
                console.log(`Payment confirmation sent to job service: ${message}`);
            }
            else {
                console.error("RabbitMQ channel not available after reconnect attempt");
            }
        }
        catch (error) {
            console.error("Error sending payment confirmation:", error);
        }
    });
}
