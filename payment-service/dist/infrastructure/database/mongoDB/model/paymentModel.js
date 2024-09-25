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
exports.PaymentModel = void 0;
exports.schedulePaymentStatusUpdates = schedulePaymentStatusUpdates;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    offerId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    contractTitle: { type: String, required: true },
    sender: {
        accountType: { type: String, required: true },
        senderId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    },
    receiver: {
        accountType: { type: String, required: true },
        receiverId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    },
    status: {
        type: String,
        enum: ["issued", "due", "overdue", "paid", "paymentFailed"],
        default: "issued",
    },
    totalAmount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
paymentSchema.index({ dueDate: 1 }); // Index for efficient querying by dueDate
paymentSchema.statics.updateStatuses = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        // Update 'issued' to 'due' when the due date has arrived
        yield this.updateMany({ status: "issued", dueDate: { $lte: now } }, {
            $set: {
                status: "due",
                updatedAt: now,
            },
        });
        // Update 'due' to 'overdue' when 24 hours have passed since the due date
        const overdueThreshold = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        yield this.updateMany({ status: "due", dueDate: { $lt: overdueThreshold } }, {
            $set: {
                status: "overdue",
                updatedAt: now,
            },
        });
    });
};
exports.PaymentModel = (0, mongoose_1.model)("Payment", paymentSchema);
// Function to schedule the status update task
function schedulePaymentStatusUpdates() {
    setInterval(() => {
        exports.PaymentModel.updateStatuses().catch((error) => {
            console.error("Error updating payment statuses:", error);
        });
    }, 15 * 60 * 1000); // Run every 15 minutes
}
