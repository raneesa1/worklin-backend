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
exports.saveProfileImage = saveProfileImage;
const freelancer_1 = require("../model/freelancer"); // Adjust path accordingly
function saveProfileImage(freelancerId, imageUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`Updating profile image for freelancer ID ${freelancerId} with URL ${imageUrl}`);
            // Find the freelancer by ID
            const freelancer = yield freelancer_1.FreelancerModel.findById(freelancerId);
            if (!freelancer) {
                console.error(`Freelancer with ID ${freelancerId} not found.`);
                return false;
            }
            // Update the freelancer's profile image URL
            freelancer.picture = imageUrl;
            yield freelancer.save();
            console.log("Profile image updated successfully.");
            return true;
        }
        catch (error) {
            console.error("Error updating profile image:", error);
            throw error;
        }
    });
}
