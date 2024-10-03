"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = void 0;
const mongoose_1 = require("mongoose");
const clientSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    secondName: { type: String },
    phoneNumber: { type: Number },
    picture: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    accountType: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    country: { type: String },
    jobPost: [{ type: mongoose_1.Types.ObjectId, ref: "JobPost" }],
    createdAt: { type: Date, default: Date.now },
    CompanyName: { type: String },
    hires: [{ type: mongoose_1.Types.ObjectId, ref: "Hire" }],
    savedTalents: [{ type: mongoose_1.Types.ObjectId, ref: "Freelancer" }],
    projects: [{ type: mongoose_1.Types.ObjectId, ref: "Project" }],
});
exports.ClientModel = (0, mongoose_1.model)("Client", clientSchema);
