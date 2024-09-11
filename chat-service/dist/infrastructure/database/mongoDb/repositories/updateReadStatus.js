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
exports.updateReadStatus = void 0;
const messageSchema_1 = __importDefault(require("../model/messageSchema"));
const updateReadStatus = (sender, receiver, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!sender || !receiver || !status) {
            return null;
        }
        const chats = messageSchema_1.default.find({ sender: sender, receiver: receiver });
        if (!chats) {
            return false;
        }
        const newMessageUpdate = yield messageSchema_1.default.updateMany({ receiver: receiver, sender: sender }, { $set: { status: status } });
        if (newMessageUpdate.modifiedCount == 0) {
            return false;
        }
        const message = yield messageSchema_1.default.find();
        if (!message.length) {
            return false;
        }
        return message;
    }
    catch (error) {
        console.error("Error adding message:", error);
        throw new Error("Failed to add message.");
    }
});
exports.updateReadStatus = updateReadStatus;
