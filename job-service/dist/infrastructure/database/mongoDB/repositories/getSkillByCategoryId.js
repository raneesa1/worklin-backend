"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSkillByCategoryId = void 0;
const categoryModel_1 = require("../model/categoryModel");
const getSkillByCategoryId = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryModel_1.CategoryModel.findById(categoryId)
            .populate("skills") // Populate the skills field
            .lean()
            .exec();
        if (!category) {
            return null;
        }
        // Cast skills to the correct type
        const skills = category.skills;
        return skills;
    }
    catch (error) {
        console.error("Error fetching skills by category ID:", error);
        throw error;
    }
});
exports.getSkillByCategoryId = getSkillByCategoryId;
