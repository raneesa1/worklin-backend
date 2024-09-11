"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    secondName: { type: String },
    phoneNumber: { type: Number },
    picture: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    accountType: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    country: { type: String },
    createdAt: { type: Date, default: Date.now },
    CompanyName: { type: String },
});
exports.AdminModel = (0, mongoose_1.model)("Admin", adminSchema);
