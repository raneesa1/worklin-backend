"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienceSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Define the Joi schema with custom validation
exports.experienceSchema = joi_1.default.object({
    userId: joi_1.default.string().required().messages({
        "any.required": '"User ID" is required',
    }),
    title: joi_1.default.string().min(3).max(100).required().messages({
        "string.base": '"Title" should be a type of text',
        "string.empty": '"Title" cannot be an empty field',
        "string.min": '"Title" should have a minimum length of {#limit}',
        "string.max": '"Title" should have a maximum length of {#limit}',
        "any.required": '"Title" is required',
    }),
    company: joi_1.default.string().min(2).max(100).required().messages({
        "string.base": '"Company" should be a type of text',
        "string.empty": '"Company" cannot be an empty field',
        "string.min": '"Company" should have a minimum length of {#limit}',
        "string.max": '"Company" should have a maximum length of {#limit}',
        "any.required": '"Company" is required',
    }),
    jobLocation: joi_1.default.string().max(100).optional().messages({
        "string.base": '"Job Location" should be a type of text',
        "string.max": '"Job Location" should have a maximum length of {#limit}',
    }),
    country: joi_1.default.string().required().messages({
        "any.required": '"Country" is required',
    }),
    startDate: joi_1.default.string().required().messages({
        "any.required": '"Start Date" is required',
    }),
    endDate: joi_1.default.string().allow("").optional(),
    startMonth: joi_1.default.string().allow("").optional(),
    startYear: joi_1.default.string().allow("").optional(),
    endMonth: joi_1.default.string().allow("").optional(),
    endYear: joi_1.default.string().allow("").optional(),
    description: joi_1.default.string().max(500).optional().messages({
        "string.base": '"Description" should be a type of text',
        "string.max": '"Description" should have a maximum length of {#limit}',
    }),
    isCurrentlyWorking: joi_1.default.boolean().optional(),
})
    .custom((value, helpers) => {
    const { startDate, endDate, isCurrentlyWorking } = value;
    if (isCurrentlyWorking) {
        // If currently working, endDate should not be validated
        return value;
    }
    // Convert date strings to Date objects for comparison
    const start = new Date(`${startDate} 01`);
    const end = endDate ? new Date(`${endDate} 01`) : null;
    if (end && end < start) {
        return helpers.error("dateComparison");
    }
    return value;
}, "Date Comparison Validation")
    .messages({
    dateComparison: "End date cannot be before start date",
});
