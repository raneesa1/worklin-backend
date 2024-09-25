"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobOfferValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const mileStoneSchema = joi_1.default.object({
    description: joi_1.default.string().required().messages({
        "any.required": "Task is required for milestone",
    }),
    dueDate: joi_1.default.date().required().messages({
        "any.required": "Date is required for milestone",
    }),
    amount: joi_1.default.number().positive().required().messages({
        "any.required": "Amount is required for milestone",
        "number.positive": "Amount must be a positive number",
    }),
    isPaid: joi_1.default.boolean(),
});
exports.jobOfferValidator = joi_1.default.object({
    clientId: joi_1.default.string().required().messages({
        "any.required": "Client ID is required",
    }),
    freelancerId: joi_1.default.string().required().messages({
        "any.required": "Freelancer ID is required",
    }),
    hiringTeam: joi_1.default.string().required().messages({
        "any.required": "Hiring team is required",
    }),
    relatedJobId: joi_1.default.string().optional().messages({}),
    title: joi_1.default.string().required().messages({
        "any.required": "Title is required",
    }),
    paymentType: joi_1.default.string().valid("hourly", "fixed").required().messages({
        "any.required": "Payment type is required",
        "any.only": "Payment type must be either 'hourly' or 'fixed'",
    }),
    paymentOption: joi_1.default.string()
        .valid("oneTime", "mileStone")
        .required()
        .messages({
        "any.required": "Payment option is required",
        "any.only": "Payment option must be either 'oneTime' or 'mileStone'",
    }),
    totalAmount: joi_1.default.number().positive().required().messages({
        "any.required": "Total amount is required",
        "number.positive": "Total amount must be a positive number",
    }),
    hourlyRate: joi_1.default.when("paymentType", {
        is: "hourly",
        then: joi_1.default.number().positive().required().messages({
            "any.required": "Hourly rate is required for hourly payment type",
            "number.positive": "Hourly rate must be a positive number",
        }),
        otherwise: joi_1.default.forbidden(), // Hourly rate should not be provided for fixed payment type
    }),
    dueDate: joi_1.default.when("paymentOption", {
        is: "oneTime",
        then: joi_1.default.date().required().messages({
            "any.required": "Due date is required for one-time payment",
        }),
        otherwise: joi_1.default.forbidden(), // Due date should not be provided for milestone payments
    }),
    numberOfHours: joi_1.default.when("paymentType", {
        is: "hourly",
        then: joi_1.default.number().positive().required().messages({
            "any.required": "Number of hours is required for hourly payment type",
            "number.positive": "Number of hours must be a positive number",
        }),
        otherwise: joi_1.default.forbidden(), // Number of hours should not be provided for fixed payment type
    }),
    mileStone: joi_1.default.when("paymentOption", {
        is: "mileStone",
        then: joi_1.default.array().items(mileStoneSchema).min(1).required().messages({
            "any.required": "Milestone is required when payment option is milestone",
        }),
        otherwise: joi_1.default.forbidden(), // MileStone fields should not be provided for one-time payment
    }),
    description: joi_1.default.string().optional(),
    files: joi_1.default.array().items(joi_1.default.string()),
    isActive: joi_1.default.boolean().optional().default(false),
});
