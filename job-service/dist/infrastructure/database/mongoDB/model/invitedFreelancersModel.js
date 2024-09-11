"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteFreelancerModel = void 0;
const mongoose_1 = require("mongoose");
const invitedFreelancersSchema = new mongoose_1.Schema({
    clientId: { type: String, required: true },
    freelancerId: { type: String, required: true },
    jobId: { type: String },
    clientName: { type: String },
    description: { type: String, required: true },
    requestedAt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["received", "accepted", "rejected"],
        default: "received",
    },
});
exports.InviteFreelancerModel = (0, mongoose_1.model)("invitedFreelancers", invitedFreelancersSchema);
