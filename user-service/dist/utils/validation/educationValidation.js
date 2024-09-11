"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.educationValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Define the Joi schema with custom validation
exports.educationValidation = joi_1.default.object({
    userId: joi_1.default.string().required().messages({
        "any.required": "User ID is required",
    }),
    school: joi_1.default.string().min(2).max(100).required().messages({
        "string.base": "School should be a type of text",
        "string.empty": "School cannot be an empty field",
        "string.min": "School should have a minimum length of {#limit}",
        "string.max": "School should have a maximum length of {#limit}",
        "any.required": "School is required",
    }),
    degree: joi_1.default.string().min(2).max(100).required().messages({
        "string.base": "Degree should be a type of text",
        "string.empty": "Degree cannot be an empty field",
        "string.min": "Degree should have a minimum length of {#limit}",
        "string.max": "Degree should have a maximum length of {#limit}",
        "any.required": "Degree is required",
    }),
    fieldOfStudy: joi_1.default.string().min(2).max(100).required().messages({
        "string.base": "Field of Study should be a type of text",
        "string.empty": "Field of Study cannot be an empty field",
        "string.min": "Field of Study should have a minimum length of {#limit}",
        "string.max": "Field of Study should have a maximum length of {#limit}",
        "any.required": "Field of Study is required",
    }),
    fromMonth: joi_1.default.string().required().messages({
        "any.required": "From Month is required",
    }),
    fromYear: joi_1.default.string().required().messages({
        "any.required": "From Year is required",
    }),
    toMonth: joi_1.default.string().allow("").required().messages({
        "any.required": '"From Year" is required',
    }),
    toYear: joi_1.default.string().allow("").required().messages({
        "any.required": "From Year is required",
    }),
    description: joi_1.default.string().max(500).optional().messages({
        "string.base": "Description should be a type of text",
        "string.max": "Description should have a maximum length of {#limit}",
    }),
})
    .custom((value, helpers) => {
    const { fromMonth, fromYear, toMonth, toYear } = value;
    if (toMonth && toYear) {
        // Convert date strings to Date objects for comparison
        const start = new Date(`${fromMonth} ${fromYear}`);
        const end = new Date(`${toMonth} ${toYear}`);
        if (end < start) {
            return helpers.error("dateComparison");
        }
    }
    return value;
}, "Date Comparison Validation")
    .messages({
    dateComparison: "End date cannot be before start date",
});
