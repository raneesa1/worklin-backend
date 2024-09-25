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
exports.getTransactionByUserIdRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paymentModel_1 = require("../model/paymentModel");
const getTransactionByUserIdRepository = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.default.Types.ObjectId(userId);
        const payments = yield paymentModel_1.PaymentModel.find({
            $or: [
                { "sender.senderId": objectId }, // Admin as sender
                { "receiver.receiverId": objectId }, // Admin as receiver
            ],
        }).sort({ createdAt: -1 });
        console.log(payments, "consoling the admin transactions");
        return payments;
    }
    catch (error) {
        console.error("Error fetching payments by ID:", error);
        throw error;
    }
});
exports.getTransactionByUserIdRepository = getTransactionByUserIdRepository;
