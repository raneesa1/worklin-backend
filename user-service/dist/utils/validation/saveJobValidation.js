"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJobData = exports.jobDataSchema = void 0;
// src/validations/jobValidation.ts
const joi_1 = __importDefault(require("joi"));
// Define the Joi schema for validating job data
exports.jobDataSchema = joi_1.default.object({
    freelancerId: joi_1.default.string().required(),
    clientId: joi_1.default.string().required(),
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    duration: joi_1.default.string().required(),
    experience: joi_1.default.string().required(),
    skills: joi_1.default.array().items(joi_1.default.string()).required(),
    priceFrom: joi_1.default.number().required(),
    priceTo: joi_1.default.number().required(),
    rate: joi_1.default.string().required(),
    jobId: joi_1.default.string().required(),
    isActive: joi_1.default.boolean(),
    status: joi_1.default.string().valid("active", "stopped", "draft").default("active"),
    hires: joi_1.default.number().optional(),
    applications: joi_1.default.number().optional(),
    location: joi_1.default.string().optional().allow(''),
    createdAt: joi_1.default.date().optional(),
});
const validateJobData = (jobData) => {
    return exports.jobDataSchema.validate(jobData);
};
exports.validateJobData = validateJobData;
