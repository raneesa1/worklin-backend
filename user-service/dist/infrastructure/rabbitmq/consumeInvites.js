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
exports.consumeInvites = consumeInvites;
const rabbit_config_1 = require("./rabbit.config");
const useCases_1 = require("../../application/useCases");
function consumeInvites(queue, dependencies) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const channel = (0, rabbit_config_1.getChannel)();
            if (!channel) {
                throw new Error("RabbitMQ channel not available");
            }
            yield channel.assertQueue(queue, { durable: true });
            yield channel.assertExchange("userManagementExchange", "direct", {
                durable: true,
            });
            yield channel.bindQueue(queue, "userManagementExchange", "");
            const { execute } = (0, useCases_1.processInviteUseCase)(dependencies);
            channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg) {
                    const message = JSON.parse(msg.content.toString());
                    console.log("Received invite message:", message);
                    // Use the use case to process the invite
                    yield execute(message);
                    channel.ack(msg); // Acknowledge message
                }
            }));
            console.log(`Waiting for messages in queue: ${queue}`);
        }
        catch (error) {
            console.error("Error consuming invite messages:", error);
            throw error;
        }
    });
}
