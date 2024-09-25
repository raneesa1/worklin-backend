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
function connectRabbitMQ() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield amqplib_1.default.connect("amqp://127.0.0.1:5672");
            channel = yield connection.createChannel();
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
        }
        catch (error) {
            console.error("Error connecting to RabbitMQ:", error);
            throw error;
        }
    });
}
function getChannel() {
    return channel;
}
