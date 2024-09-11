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
exports.sendMessage = void 0;
const chatSchema_1 = __importDefault(require("../model/chatSchema"));
const messageSchema_1 = __importDefault(require("../model/messageSchema"));
const sendMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data ||
            !data.sender ||
            !data.receiver ||
            !data.content ||
            !data.type ||
            !data.chatId) {
            return null;
        }
        const messageData = {
            sender: data.sender,
            receiver: data.receiver,
            content: data.content,
            type: data.type,
            chatId: data.chatId,
        };
        const newMessage = yield messageSchema_1.default.create(messageData);
        if (!newMessage)
            return false;
        const updateChat = yield chatSchema_1.default.findByIdAndUpdate(data.chatId, {
            $push: { message: newMessage._id },
            $set: { lastMessage: new Date() },
        }, { new: true });
        if (!updateChat)
            return false;
        return newMessage;
    }
    catch (error) {
        console.error("Error adding message:", error);
        throw new Error("Failed to add message.");
    }
});
exports.sendMessage = sendMessage;
