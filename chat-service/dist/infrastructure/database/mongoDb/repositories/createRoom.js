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
exports.addRoom = void 0;
const chatSchema_1 = __importDefault(require("../model/chatSchema"));
const addRoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data || !data.sender || !data.receiver) {
            return null;
        }
        const alreadyExist = yield chatSchema_1.default.findOne({
            participants: { $all: [data.sender, data.receiver] },
        });
        if (alreadyExist)
            return true;
        const newRoom = yield chatSchema_1.default.create({
            Message: [],
            participants: [data.sender, data.receiver],
            lastMessage: new Date(),
        });
        if (newRoom) {
            return newRoom;
        }
        return null;
    }
    catch (error) {
        console.error("Error adding chat:", error);
        throw new Error("Failed to add chat..");
    }
});
exports.addRoom = addRoom;
