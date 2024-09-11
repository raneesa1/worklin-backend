"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobInvitesModel = void 0;
const mongoose_1 = require("mongoose");
const jobInvitesSchema = new mongoose_1.Schema({
    clientId: { type: String, required: true },
    freelancerId: { type: String, required: true },
    clientName: { type: String },
    jobId: { type: String },
    description: { type: String, required: true },
    requestedAt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["received", "accepted", "rejected"],
        default: "received",
    },
});
exports.JobInvitesModel = (0, mongoose_1.model)("JobInvites", jobInvitesSchema);
