"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillModel = void 0;
const mongoose_1 = require("mongoose");
const skillSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});
exports.SkillModel = (0, mongoose_1.model)("Skill", skillSchema);
