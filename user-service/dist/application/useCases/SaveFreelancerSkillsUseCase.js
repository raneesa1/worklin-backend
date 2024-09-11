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
exports.SaveFreelancerSkillsUseCase = void 0;
const SaveFreelancerSkillsUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute: (freelancerId, category, subcategories, skills) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                console.log("Executing saveFreelancerSkillsAndCategory with:", {
                    freelancerId,
                    category,
                    subcategories,
                    skills,
                }); // Log input data
                yield repositories.saveFreelancerSkillsAndCategory(freelancerId, category, subcategories, skills);
                console.log("Data saved successfully"); // Log success
            }
            catch (error) {
                console.error("Use Case Error:", error); // Log any errors encountered
                throw error;
            }
        }),
    };
};
exports.SaveFreelancerSkillsUseCase = SaveFreelancerSkillsUseCase;
