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
exports.connectRabbitMQ = connectRabbitMQ;
exports.getChannel = getChannel;
const amqplib_1 = __importDefault(require("amqplib"));
let channel = null;
let isConnecting = false;
function connectRabbitMQ() {
    return __awaiter(this, arguments, void 0, function* (retries = 5, delay = 5000) {
        const rabbitMqUrl = process.env.RABBITMQ_URL;
        if (!rabbitMqUrl) {
            throw new Error("RABBITMQ_URL environment variable is not set.");
        }
        try {
            const connection = yield amqplib_1.default.connect(rabbitMqUrl, {
                heartbeat: 60, // Set heartbeat to 60 seconds
            });
            channel = yield connection.createChannel();
            console.log("RabbitMQ connection and channel established.");
            // Declare the exchange
            if (channel) {
                yield channel.assertExchange("userManagementExchange", "direct", {
                    durable: true,
                });
                console.log("Exchange 'userManagementExchange' declared.");
            }
            isConnecting = false;
        }
        catch (error) {
            console.error("Error connecting to RabbitMQ:", error);
            isConnecting = false;
            if (retries > 0) {
                console.log(`Retrying connection to RabbitMQ... attempts left: ${retries}`);
                yield new Promise((res) => setTimeout(res, delay));
                return connectRabbitMQ(retries - 1, delay);
            }
            else {
                throw error;
            }
        }
    });
}
function getChannel() {
    return channel;
}
