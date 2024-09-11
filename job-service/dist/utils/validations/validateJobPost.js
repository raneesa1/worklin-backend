"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJobPostInput = exports.jobPostValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Validation schema for JobPost
exports.jobPostValidation = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100).required().messages({
        "string.empty": "Title is required",
        "string.min": "Title should be at least 3 characters long",
        "string.max": "Title should not exceed 100 characters",
    }),
    skills: joi_1.default.array()
        .items(joi_1.default.object({
        _id: joi_1.default.string().required().messages({
            "string.empty": "Skill ID is required",
        }),
        name: joi_1.default.string().required().messages({
            "string.empty": "Skill name is required",
        }),
        description: joi_1.default.string().required().messages({
            "string.empty": "Skill description is required",
        }),
        __v: joi_1.default.number().optional(), // Allowing __v key
    }))
        .min(1)
        .required()
        .messages({
        "array.min": "At least one skill is required",
        "any.required": "Skills are required",
    }),
    rate: joi_1.default.string().valid("hourly", "fixed").required().messages({
        "any.only": "Rate should be either 'hourly' or 'fixed'",
        "any.required": "Rate is required",
    }),
    priceTo: joi_1.default.number().greater(joi_1.default.ref("priceFrom")).required().messages({
        "number.greater": "Price To must be greater than Price From",
        "any.required": "Price To is required",
    }),
    priceFrom: joi_1.default.number().required().messages({
        "any.required": "Price From is required",
    }),
    createdAt: joi_1.default.optional(),
    isActive: joi_1.default.optional(),
    hires: joi_1.default.optional(),
    acceptedApplication: joi_1.default.optional(),
    applications: joi_1.default.optional(),
    experience: joi_1.default.string()
        .valid("Entry", "Intermediate", "Expert")
        .required()
        .messages({
        "any.only": "Experience should be 'Entry', 'Intermediate', or 'Expert'",
        "any.required": "Experience is required",
    }),
    duration: joi_1.default.string().required().messages({
        "string.empty": "Duration is required",
    }),
    description: joi_1.default.string().min(10).max(50000).required().messages({
        "string.empty": "Description is required",
        "string.min": "Description should be at least 10 characters long",
        "string.max": "Description should not exceed 50000 characters",
    }),
    clientId: joi_1.default.string().required().messages({
        "string.empty": "Client ID is required",
    }),
    isCompleted: joi_1.default.boolean().optional(),
    _id: joi_1.default.string().optional(), // Allowing _id key
    __v: joi_1.default.number().optional(), // Allowing __v key
});
// Function to validate the job post input
const validateJobPostInput = (jobPost) => {
    const { error, value } = exports.jobPostValidation.validate(jobPost, {
        abortEarly: false,
        allowUnknown: true, // Allowing unknown fields
    });
    // Return the error and value
    return { error, value };
};
exports.validateJobPostInput = validateJobPostInput;
