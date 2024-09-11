"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceModel = void 0;
const mongoose_1 = require("mongoose");
const experienceSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    jobLocation: { type: String, required: true },
    country: { type: String, required: true },
    startMonth: { type: String },
    startYear: { type: String },
    startDate: { type: String, required: true },
    endMonth: { type: String },
    endYear: { type: String },
    endDate: { type: String },
    description: { type: String, required: true },
    isCurrentlyWorking: { type: Boolean },
}, {
    timestamps: true,
});
exports.ExperienceModel = (0, mongoose_1.model)("Experience", experienceSchema);
