"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceModel = void 0;
// src/infrastructure/database/mongoDb/model/experienceModel.ts
const mongoose_1 = __importStar(require("mongoose"));
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
exports.ExperienceModel = mongoose_1.default.model("Experience", experienceSchema);
