"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationValidation = void 0;
// locationValidation.ts
const joi_1 = __importDefault(require("joi"));
exports.locationValidation = joi_1.default.object({
    country: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    state: joi_1.default.string().optional(),
    phone: joi_1.default.string().required(),
    zip: joi_1.default.string().optional(),
    apt: joi_1.default.string().allow("").optional(),
    dob: joi_1.default.date().required(),
    imageUrl: joi_1.default.string().uri(),
});
