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
exports.consumeJobApplications = consumeJobApplications;
const useCases_1 = require("../../application/useCases");
const rabbit_config_1 = require("./rabbit.config");
function consumeJobApplications(jobApplicationQueue, dependencies) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const channel = (0, rabbit_config_1.getChannel)();
            if (!channel) {
                throw new Error("RabbitMQ channel not available");
            }
            // Setup for receiving job applications
            yield channel.assertQueue(jobApplicationQueue, { durable: true });
            yield channel.assertExchange("jobServiceExchange", "direct", {
                durable: true,
            });
            yield channel.bindQueue(jobApplicationQueue, "jobServiceExchange", "");
            // Setup for sending messages back to user service
            const userServiceExchange = "userServiceExchange";
            const userServiceQueue = "userServiceQueue";
            yield channel.assertExchange(userServiceExchange, "direct", {
                durable: true,
            });
            yield channel.assertQueue(userServiceQueue, { durable: true });
            yield channel.bindQueue(userServiceQueue, userServiceExchange, "");
            const { execute } = (0, useCases_1.processJobApplicationUseCase)(dependencies);
            channel.consume(jobApplicationQueue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg) {
                    const message = JSON.parse(msg.content.toString());
                    console.log("Received job application message:", message);
                    try {
                        const result = yield execute(message);
                        // Send the result back to the user service
                        channel.publish(userServiceExchange, "", Buffer.from(JSON.stringify({
                            userId: message.freelancerId, // Assuming this is how we identify the user
                            success: result.success,
                            message: result.message,
                        })));
                        console.log(`Result sent to user service: ${result.success ? "Success" : "Failure"} - ${result.message}`);
                        channel.ack(msg); // Acknowledge the original message
                    }
                    catch (error) {
                        console.error("Error processing job application:", error);
                        // Send error message back to the user service
                        channel.publish(userServiceExchange, "", Buffer.from(JSON.stringify({
                            userId: message.freelancerId,
                            success: false,
                            message: "An unexpected error occurred while processing your application.",
                        })));
                        channel.ack(msg); // Acknowledge the message even in case of error
                    }
                }
            }));
            console.log(`Waiting for messages in queue: ${jobApplicationQueue}`);
        }
        catch (error) {
            console.error("Error setting up job application consumer:", error);
            throw error;
        }
    });
}
