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
exports.JobOfferModel = void 0;
exports.scheduleOfferDeletion = scheduleOfferDeletion;
const mongoose_1 = require("mongoose");
const jobOffer_1 = require("../../../../domain/entities/jobOffer");
const jobOfferSchema = new mongoose_1.Schema({
    clientId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    freelancerId: { type: String, required: true },
    hiringTeam: { type: String, required: true },
    relatedJobId: { type: String, required: true },
    title: { type: String, required: true },
    paymentType: { type: String },
    paymentOption: { type: String, enum: Object.values(jobOffer_1.paymentOption) }, // enum for paymentOption
    totalAmount: { type: Number, required: true },
    hourlyRate: { type: Number },
    numberOfHours: { type: Number },
    mileStone: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "MileStone" }],
    description: { type: String },
    files: [{ type: String }],
    offerStatus: {
        type: String,
        enum: Object.values(jobOffer_1.offerStatus),
        default: jobOffer_1.offerStatus.pending,
    },
    isActive: { type: Boolean },
    dueDate: { type: Date },
    expiresAt: { type: Date, default: () => new Date(+new Date() + 3 * 24 * 60 * 60 * 1000) },
    createdAt: { type: Date, default: Date.now, expires: "3d" }, // Add this line
});
jobOfferSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3 * 24 * 60 * 60 });
// Create an index on expiresAt field
jobOfferSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// Static method to handle conditional deletion
jobOfferSchema.statics.deleteExpiredOffers = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const threeDaysAgo = new Date(+new Date() - 3 * 24 * 60 * 60 * 1000);
        yield this.deleteMany({
            createdAt: { $lte: threeDaysAgo },
            offerStatus: jobOffer_1.offerStatus.pending
        });
    });
};
exports.JobOfferModel = (0, mongoose_1.model)("JobOffer", jobOfferSchema);
// Function to schedule the deletion task
function scheduleOfferDeletion() {
    setInterval(() => {
        exports.JobOfferModel.deleteExpiredOffers();
    }, 24 * 60 * 60 * 1000); // Run once every 24 hours
}
