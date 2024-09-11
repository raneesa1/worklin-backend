"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationModel = void 0;
const mongoose_1 = require("mongoose");
const applicationSchema = new mongoose_1.Schema({
    freelancerId: { type: String, required: true },
    resume: { type: String },
    freelancerName: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ["accepted", "rejected", "hired"] },
    jobPostId: { type: String, required: true },
    freelancerTitle: { type: String },
    freelancerLocation: { type: String },
    freelancerProfile: { type: String },
    publicId: { type: String },
});
exports.applicationModel = (0, mongoose_1.model)("Application", applicationSchema);
