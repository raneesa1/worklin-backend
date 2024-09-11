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
exports.postProfileRepository = postProfileRepository;
const freelancer_1 = require("../model/freelancer");
const experienceModel_1 = require("../model/experienceModel");
const educationModel_1 = require("../model/educationModel");
const addressModel_1 = require("../model/addressModel");
const skillModel_1 = require("../model/skillModel");
const categoryModel_1 = require("../model/categoryModel");
const languages_1 = require("../model/languages");
// Assuming FreelancerEntity has _id, which is a string or mongoose.Types.ObjectId
function postProfileRepository(freelancer) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!freelancer._id) {
            throw new Error("Freelancer ID is required");
        }
        try {
            // Process referenced documents
            if (freelancer.experience) {
                yield Promise.all(freelancer.experience.map((exp) => __awaiter(this, void 0, void 0, function* () {
                    if (exp._id) {
                        yield experienceModel_1.ExperienceModel.findByIdAndUpdate(exp._id, exp, {
                            new: true,
                        }).exec();
                    }
                    else {
                        yield experienceModel_1.ExperienceModel.create(exp);
                    }
                })));
            }
            if (freelancer.education) {
                yield Promise.all(freelancer.education.map((edu) => __awaiter(this, void 0, void 0, function* () {
                    if (edu._id) {
                        yield educationModel_1.EducationModel.findByIdAndUpdate(edu._id, edu, {
                            new: true,
                        }).exec();
                    }
                    else {
                        yield educationModel_1.EducationModel.create(edu);
                    }
                })));
            }
            if (freelancer.languages) {
                const languageIds = yield Promise.all(freelancer.languages.map((lang) => __awaiter(this, void 0, void 0, function* () {
                    if (lang._id) {
                        // Update existing language document
                        const updatedLanguage = yield languages_1.languageModel
                            .findByIdAndUpdate(lang._id, lang, { new: true })
                            .exec();
                        return updatedLanguage._id;
                    }
                    else {
                        // Create new language document
                        const newLanguage = yield languages_1.languageModel.create(lang);
                        return newLanguage._id;
                    }
                })));
                // Replace the languages array with the array of ObjectIds
                freelancer.languages = languageIds;
            }
            if (freelancer.address) {
                yield Promise.all(freelancer.address.map((addr) => __awaiter(this, void 0, void 0, function* () {
                    if (addr._id) {
                        yield addressModel_1.AddressModel.findByIdAndUpdate(addr._id, addr, {
                            new: true,
                        }).exec();
                    }
                    else {
                        yield addressModel_1.AddressModel.create(addr);
                    }
                })));
            }
            if (freelancer.skill) {
                yield Promise.all(freelancer.skill.map((skill) => __awaiter(this, void 0, void 0, function* () {
                    if (skill._id) {
                        yield skillModel_1.SkillModel.findByIdAndUpdate(skill._id, skill, {
                            new: true,
                        }).exec();
                    }
                    else {
                        yield skillModel_1.SkillModel.create(skill);
                    }
                })));
            }
            if (freelancer.category) {
                yield Promise.all(freelancer.category.map((cat) => __awaiter(this, void 0, void 0, function* () {
                    if (cat._id) {
                        yield categoryModel_1.CategoryModel.findByIdAndUpdate(cat._id, cat, {
                            new: true,
                        }).exec();
                    }
                    else {
                        yield categoryModel_1.CategoryModel.create(cat);
                    }
                })));
            }
            // Update the main freelancer document
            const updatedFreelancer = yield freelancer_1.FreelancerModel.findByIdAndUpdate(freelancer._id, Object.assign(Object.assign({}, freelancer), { isProfileCompleted: true }), { new: true }).exec();
            if (!updatedFreelancer) {
                console.warn(`Freelancer with ID ${freelancer._id} not found`);
                throw new Error("Freelancer not found");
            }
            console.info("Freelancer updated successfully:", updatedFreelancer);
            return updatedFreelancer;
        }
        catch (error) {
            console.error("Error updating freelancer data:", error);
            throw new Error(`Error updating freelancer data: ${error.message}`);
        }
    });
}
