"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedJobsModel = void 0;
const mongoose_1 = require("mongoose");
const savedJobsSchema = new mongoose_1.Schema({
    freelancerId: { type: String, required: true },
    clientId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    jobId: { type: String },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    experience: { type: String, required: true },
    skills: [{ type: String, required: true }],
    priceFrom: { type: Number, required: true },
    priceTo: { type: Number, required: true },
    rate: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    hires: { type: Number },
    status: {
        type: String,
        enum: ["active", "stopped", "draft"],
        default: "active",
    },
    applications: { type: Number },
    location: { type: String },
});
exports.SavedJobsModel = (0, mongoose_1.model)("SavedJobs", savedJobsSchema);
