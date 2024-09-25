"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MileStoneModel = void 0;
const mongoose_1 = require("mongoose");
const mileStoneSchema = new mongoose_1.Schema({
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    amount: { type: Number },
    isPaid: { type: Boolean },
}, {
    timestamps: true,
});
exports.MileStoneModel = (0, mongoose_1.model)("MileStone", mileStoneSchema);
