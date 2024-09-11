"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageModel = void 0;
const mongoose_1 = require("mongoose");
const languageSchema = new mongoose_1.Schema({
    userId: { type: String },
    language: { type: String, required: true },
    proficiency: { type: String, required: true },
});
exports.languageModel = (0, mongoose_1.model)("Language", languageSchema);
