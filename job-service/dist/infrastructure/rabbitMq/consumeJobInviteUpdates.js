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
exports.consumeJobInviteUpdates = consumeJobInviteUpdates;
const processJobInviteUpdateUseCase_1 = require("../../application/useCases/processJobInviteUpdateUseCase");
const rabbit_config_1 = require("./rabbit.config");
function consumeJobInviteUpdates(jobInviteUpdateQueue, dependencies) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const channel = (0, rabbit_config_1.getChannel)();
            if (!channel) {
                throw new Error("RabbitMQ channel not available");
            }
            yield channel.assertQueue(jobInviteUpdateQueue, { durable: true });
            yield channel.bindQueue(jobInviteUpdateQueue, "jobServiceExchange", "");
            const { execute } = (0, processJobInviteUpdateUseCase_1.processJobInviteUpdateUseCase)(dependencies);
            channel.consume(jobInviteUpdateQueue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg) {
                    const message = JSON.parse(msg.content.toString());
                    console.log("Received job invite update message:", message);
                    try {
                        const result = yield execute(message);
                        console.log(`Job invite update processed: ${result.success ? "Success" : "Failure"} - ${result.message}`);
                        channel.ack(msg);
                    }
                    catch (error) {
                        console.error("Error processing job invite update:", error);
                        channel.nack(msg, false, true); // Requeue the message
                    }
                }
            }));
            console.log(`Waiting for messages in queue: ${jobInviteUpdateQueue}`);
        }
        catch (error) {
            console.error("Error setting up job invite update consumer:", error);
            throw error;
        }
    });
}
