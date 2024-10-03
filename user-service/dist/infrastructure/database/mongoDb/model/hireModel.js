"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HireModel = void 0;
const mongoose_1 = require("mongoose");
const hireSchema = new mongoose_1.Schema({
    client: { type: mongoose_1.Types.ObjectId, ref: "Client", required: true },
    freelancer: { type: mongoose_1.Types.ObjectId, ref: "Freelancer", required: true },
    jobDetails: { type: mongoose_1.Schema.Types.Mixed, required: true }, // Store job-related details
    hireDate: { type: Date, default: Date.now },
}, {
    timestamps: true,
});
exports.HireModel = (0, mongoose_1.model)("Hire", hireSchema);
