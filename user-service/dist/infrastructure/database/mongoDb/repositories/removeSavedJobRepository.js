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
exports.removeSavedJobRepository = removeSavedJobRepository;
const freelancer_1 = require("../model/freelancer"); // Adjust path accordingly
function removeSavedJobRepository(jobId, freelancerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find the freelancer by ID
            const freelancer = yield freelancer_1.FreelancerModel.findById(freelancerId);
            if (!freelancer) {
                throw new Error("Freelancer not found");
            }
            // Remove the jobId from savedJobs array
            freelancer.savedJobs = freelancer.savedJobs.filter((savedJob) => savedJob !== jobId);
            // Save the freelancer with updated savedJobs
            yield freelancer.save();
            return { success: true };
        }
        catch (error) {
            console.error("Error removing job from freelancer's saved jobs:", error);
            return { success: false };
        }
    });
}
