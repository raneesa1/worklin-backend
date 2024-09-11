"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPostModel = void 0;
const mongoose_1 = require("mongoose");
const jobPostSchema = new mongoose_1.Schema({
    clientId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    experience: { type: String, required: true },
    skills: [{ type: mongoose_1.Types.ObjectId, ref: "Skill", required: true }],
    priceFrom: { type: Number, required: true },
    priceTo: { type: Number, required: true },
    rate: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    hires: [{ type: String }],
    status: {
        type: String,
        enum: ["active", "stopped", "draft"],
        default: "active",
    },
    acceptedApplication: [{ type: String, ref: "Application" }],
    invitedFreelancers: [{ type: String, ref: "invitedFreelancers" }],
    applications: [{ type: String, ref: "Application" }],
    appliedFreelancers: [{ type: String }],
});
exports.JobPostModel = (0, mongoose_1.model)("JobPost", jobPostSchema);
