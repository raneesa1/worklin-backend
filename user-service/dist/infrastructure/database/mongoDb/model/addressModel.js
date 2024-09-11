"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = exports.AddressModel = void 0;
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    phone: { type: String, required: true },
    zip: { type: String },
    apt: { type: String },
    dob: { type: Date, required: true },
});
exports.addressSchema = addressSchema;
exports.AddressModel = (0, mongoose_1.model)("Address", addressSchema);
