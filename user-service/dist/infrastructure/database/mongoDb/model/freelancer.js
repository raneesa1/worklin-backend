"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreelancerModel = void 0;
const mongoose_1 = require("mongoose");
const freelancerSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    secondName: { type: String },
    phoneNumber: { type: Number },
    country: { type: String },
    dob: { type: Date },
    accountType: { type: String, required: true },
    picture: { type: String },
    isBlocked: { type: Boolean, default: false },
    bio: { type: String },
    resume: { type: String },
    role: { type: String },
    category: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Category" }],
    subCategory: [{ type: String }],
    skill: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Skill" }],
    experience: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Experience" }],
    education: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Education" }],
    languages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Language" }],
    isProfileCompleted: { type: Boolean, default: false },
    address: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Address" }],
    serviceRate: { type: Number },
    hourlyRate: { type: Number },
    freelancedBefore: { type: String },
    freelancingGoal: { type: String },
    token: { type: Number, default: 30 },
    appliedJobs: [{ type: String }],
    publicId: { type: String },
    savedJobs: [{ type: String, ref: "SavedJobs" }],
    jobInvites: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "JobInvites" }],
});
exports.FreelancerModel = (0, mongoose_1.model)("Freelancer", freelancerSchema);
