"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const categoryValidation = (data) => {
    const skillSchema = joi_1.default.object({
        _id: joi_1.default.string().required(),
        name: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        __v: joi_1.default.number().optional(),
    });
    const schema = joi_1.default.object({
        category: joi_1.default.object({
            _id: joi_1.default.string().required(),
            name: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            subcategories: joi_1.default.array().items(joi_1.default.string()).min(1).required(),
            skills: joi_1.default.array().items(joi_1.default.string()).min(1).required(),
            createdAt: joi_1.default.date().optional(),
            updatedAt: joi_1.default.date().optional(),
            __v: joi_1.default.number().optional(),
        }).required(),
        subcategories: joi_1.default.array().items(joi_1.default.string()).min(1).required(),
        skills: joi_1.default.array().items(skillSchema).min(1).required(),
        userId: joi_1.default.required(),
    });
    return schema.validate(data);
};
exports.categoryValidation = categoryValidation;
