"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
    },
    secondName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    picture: {
        type: String,
    },
    accountType: {
        type: String,
        enum: ["client", "freelancer", "admin"],
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    country: {
        type: String,
    },
    verificationToken: {
        type: String,
    },
    isVerified: {
        type: Boolean,
    },
}, {
    timestamps: true,
});
exports.User = mongoose_2.default.model("users", userSchema);
