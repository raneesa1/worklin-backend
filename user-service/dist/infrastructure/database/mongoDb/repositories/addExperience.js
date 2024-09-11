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
exports.addExperience = void 0;
const experienceModel_1 = require("../model/experienceModel");
const freelancer_1 = require("../model/freelancer");
const addExperience = (experience, userId // Pass the userId to update the freelancer's experience array
) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freelancer = yield freelancer_1.FreelancerModel.findById(userId);
        if (!freelancer) {
            throw new Error("Freelancer not found");
        }
        // Save the new experience
        const newExperience = new experienceModel_1.ExperienceModel(experience);
        yield newExperience.save();
        freelancer.experience.push(newExperience._id);
        yield freelancer.save();
        return newExperience.toObject();
    }
    catch (error) {
        console.error("Error saving experience or updating freelancer:", error);
        throw new Error("Error saving experience or updating freelancer");
    }
});
exports.addExperience = addExperience;
