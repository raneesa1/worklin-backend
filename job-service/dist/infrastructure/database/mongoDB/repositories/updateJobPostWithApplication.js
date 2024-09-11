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
exports.updateJobPostWithApplication = void 0;
const applicationModel_1 = require("../model/applicationModel");
const job_post_model_1 = require("../model/job-post.model");
const updateJobPostWithApplication = (applicationDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingApplication = yield applicationModel_1.applicationModel.findOne({
            jobPostId: applicationDetails.jobPostId,
            freelancerId: applicationDetails.freelancerId,
        });
        if (existingApplication) {
            console.log("User has already applied for this job");
            return {
                success: false,
                message: "You have already applied for this job.",
            }; // Exit the function if the user has already applied
        }
        const application = yield applicationModel_1.applicationModel.create({
            jobPostId: applicationDetails.jobPostId,
            freelancerId: applicationDetails.freelancerId,
            freelancerName: applicationDetails.freelancerName,
            email: applicationDetails.email,
            resume: applicationDetails.resume,
            publicId: applicationDetails.publicId,
            freelancerTitle: applicationDetails.freelancerTitle,
            freelancerCategory: applicationDetails.freelancerCategory,
            freelancerLocation: applicationDetails.freelancerLocation,
            freelancerProfile: applicationDetails.freelancerProfile,
        });
        const updatedJobPost = yield job_post_model_1.JobPostModel.findByIdAndUpdate(applicationDetails.jobPostId, {
            $push: { applications: application._id },
            appliedFreelancers: applicationDetails.freelancerId,
        }, { new: true });
        if (!updatedJobPost) {
            throw new Error("Job post not found");
        }
        console.log("Job post updated successfully:", updatedJobPost);
        return {
            success: true,
            message: "Application submitted successfully.",
        };
    }
    catch (error) {
        console.error("Error updating job post with application:", error);
        throw error;
    }
});
exports.updateJobPostWithApplication = updateJobPostWithApplication;
