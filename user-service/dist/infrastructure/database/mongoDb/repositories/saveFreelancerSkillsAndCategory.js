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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFreelancerSkillsAndCategory = saveFreelancerSkillsAndCategory;
const mongoose_1 = __importDefault(require("mongoose"));
const freelancer_1 = require("../model/freelancer");
const categoryModel_1 = require("../model/categoryModel");
const skillModel_1 = require("../model/skillModel");
function saveFreelancerSkillsAndCategory(freelancerId, category, subcategories, skills) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(freelancerId, "consoling the freelancerId");
            console.log(category, "consoling the category");
            console.log(skills, "consoling the skills");
            console.log(subcategories, "consoling the subcategories");
            const freelancer = yield freelancer_1.FreelancerModel.findById(freelancerId);
            if (!freelancer) {
                console.log("no freelancer found");
                throw new Error("Freelancer not found");
            }
            // If the category doesn't exist, create it; otherwise, find it.
            let existingCategory = yield categoryModel_1.CategoryModel.findById(category._id);
            if (!existingCategory) {
                existingCategory = new categoryModel_1.CategoryModel({
                    _id: new mongoose_1.default.Types.ObjectId(category._id),
                    name: category.name,
                    description: category.description,
                    subcategories: category.subcategories,
                    skills: category.skills.map((skillId) => new mongoose_1.default.Types.ObjectId(skillId)),
                });
                yield existingCategory.save();
            }
            const skillIds = [];
            for (const skill of skills) {
                let existingSkill = yield skillModel_1.SkillModel.findById(skill._id);
                if (!existingSkill) {
                    console.log("No existing skill found, creating new skill:", skill);
                    existingSkill = new skillModel_1.SkillModel({
                        _id: new mongoose_1.default.Types.ObjectId(skill._id),
                        name: skill.name,
                        description: skill.description,
                    });
                    yield existingSkill.save();
                }
                // Convert _id to ObjectId if needed
                skillIds.push(typeof existingSkill._id === "string"
                    ? new mongoose_1.default.Types.ObjectId(existingSkill._id)
                    : existingSkill._id);
            }
            console.log(existingCategory, "consoling the existing category");
            freelancer.category = [existingCategory._id];
            freelancer.subCategory = subcategories;
            freelancer.skill = skillIds;
            yield freelancer.save();
            console.log(freelancer, "consoling the freelancer");
        }
        catch (error) {
            console.error("Error saving freelancer data:", error);
            throw error;
        }
    });
}
