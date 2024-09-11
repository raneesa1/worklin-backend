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
exports.getJobPostById = void 0;
const job_post_model_1 = require("../model/job-post.model");
const getJobPostById = (jobPostId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find job posts associated with the specified clientId
        const jobPost = yield job_post_model_1.JobPostModel.findById(jobPostId)
            .populate("skills") // Populates the 'skills' field
            .populate("acceptedApplication") // Populates the 'acceptedApplication' field
            .populate("applications"); // Populates the 'applications' field
        if (!jobPost) {
            return null; // Return null if no job post found
        }
        return jobPost; // Return the populated job post
    }
    catch (error) {
        console.error("Error fetching skills by category ID:", error);
        throw error;
    }
});
exports.getJobPostById = getJobPostById;
