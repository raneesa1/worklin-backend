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
exports.setProfileDataRepository = setProfileDataRepository;
const freelancer_1 = require("../model/freelancer");
function setProfileDataRepository(profileData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { goal, userId, experience } = profileData;
            const freelancer = yield freelancer_1.FreelancerModel.findById(userId);
            if (!freelancer) {
                return { success: false };
            }
            // Update the freelancer's goal and experience
            freelancer.freelancingGoal = goal;
            freelancer.freelancedBefore = experience; // Assuming experience is an array of ObjectId
            // Save the updated freelancer document
            yield freelancer.save();
            return { success: true };
        }
        catch (error) {
            console.error("Error saving bio data to database:", error);
            throw error;
        }
    });
}
