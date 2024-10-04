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
exports.sendInvitationToQueue = sendInvitationToQueue;
const amqplib_1 = __importDefault(require("amqplib"));
function sendInvitationToQueue(invitationData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rabbitMqUrl = process.env.RABBITMQ_URL;
            if (!rabbitMqUrl) {
                throw new Error("RABBITMQ_URL environment variable is not set.");
            }
            const connection = yield amqplib_1.default.connect(rabbitMqUrl);
            const channel = yield connection.createChannel();
            const exchange = "userManagementExchange";
            yield channel.assertExchange(exchange, "direct", { durable: true });
            channel.publish(exchange, "", Buffer.from(JSON.stringify(invitationData)));
            console.log("Invitation sent to queue:", invitationData);
            yield channel.close();
            yield connection.close();
        }
        catch (error) {
            console.error("Failed to send invitation to queue:", error);
        }
    });
}
