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
exports.addEducation = void 0;
const educationModel_1 = require("../model/educationModel");
const freelancer_1 = require("../model/freelancer");
const addEducation = (education, userId // Pass the userId to update the freelancer's education array
) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freelancer = yield freelancer_1.FreelancerModel.findById(userId);
        if (!freelancer) {
            throw new Error("Freelancer not found");
        }
        // Save the new education
        const newEducation = new educationModel_1.EducationModel(education);
        yield newEducation.save();
        freelancer.education.push(newEducation._id);
        yield freelancer.save();
        console.log(freelancer.education);
        return newEducation.toObject();
    }
    catch (error) {
        console.error("Error saving education or updating freelancer:", error);
        throw new Error("Error saving education or updating freelancer");
    }
});
exports.addEducation = addEducation;
