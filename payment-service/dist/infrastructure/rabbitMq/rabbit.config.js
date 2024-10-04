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
        try {
            const rabbitMqUrl = process.env.RABBITMQ_URL;
            if (!rabbitMqUrl) {
                throw new Error("RABBITMQ_URL environment variable is not set.");
            }
            if (isConnecting)
                return;
            isConnecting = true;
            console.log("Attempting to connect to RabbitMQ...");
            const connection = yield amqplib_1.default.connect(rabbitMqUrl, {
                heartbeat: 60, // Set heartbeat to 60 seconds
            });
            channel = yield connection.createChannel();
            console.log("Connected to RabbitMQ, creating channel...");
            console.log("RabbitMQ connection and channel established.");
            if (channel) {
                yield channel.assertExchange("paymentServiceExchange", "direct", {
                    durable: true,
                });
                console.log("Exchange 'paymentServiceExchange' declared.");
                yield channel.assertExchange("jobManagementExchange", "direct", {
                    durable: true,
                });
                console.log("Exchange 'jobManagementExchange' declared.");
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
    return __awaiter(this, void 0, void 0, function* () {
        if (!channel) {
            console.log("Channel is not available, attempting to reconnect...");
            yield connectRabbitMQ();
        }
        return channel;
    });
}
