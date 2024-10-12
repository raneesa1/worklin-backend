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
exports.setupHireInfoConsumer = setupHireInfoConsumer;
const updateClientWithNewHire_1 = require("../../../application/useCases/updateClientWithNewHire");
const rabbit_config_1 = require("../rabbit.config");
function setupHireInfoConsumer() {
    return __awaiter(this, void 0, void 0, function* () {
        const channel = (0, rabbit_config_1.getChannel)();
        if (!channel) {
            console.error("RabbitMQ channel not available");
            return;
        }
        yield channel.assertExchange("jobServiceExchange", "direct", {
            durable: true,
        });
        yield channel.assertQueue("user_service_hire_info", { durable: true });
        yield channel.bindQueue("user_service_hire_info", "jobServiceExchange", "hire.info");
        channel.consume("user_service_hire_info", (msg) => __awaiter(this, void 0, void 0, function* () {
            if (msg) {
                const hireInfo = JSON.parse(msg.content.toString());
                console.log("Received hire info:", hireInfo);
                try {
                    yield (0, updateClientWithNewHire_1.updateClientWithNewHire)(hireInfo);
                    console.log(hireInfo, "consoling the hire info from user service------------------>>>>>>");
                    console.log(`Client updated with new hire from job service to user ßervice now in user service: ${JSON.stringify(hireInfo)}`);
                    channel.ack(msg);
                }
                catch (error) {
                    console.error("Error updating client with new hire:", error);
                    // Decide whether to ack, nack, or requeue based on your error handling strategy
                }
            }
        }));
    });
}
