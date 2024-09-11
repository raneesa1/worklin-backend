"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationModel = void 0;
const mongoose_1 = require("mongoose");
const educationSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    school: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    fromMonth: { type: String, required: true },
    fromYear: { type: String, required: true },
    toMonth: { type: String, required: true },
    toYear: { type: String, required: true },
    description: { type: String },
}, {
    timestamps: true,
});
exports.EducationModel = (0, mongoose_1.model)("Education", educationSchema);
