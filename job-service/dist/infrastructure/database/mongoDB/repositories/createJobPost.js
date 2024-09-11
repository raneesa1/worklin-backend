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
exports.createJobPost = createJobPost;
const mongoose_1 = require("mongoose");
const job_post_model_1 = require("../model/job-post.model");
function createJobPost(jobPostData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("hi from job post repository");
            const { clientId, title, description, duration, experience, skills, priceFrom, priceTo, rate, } = jobPostData;
            const skillIds = skills.map((skill) => new mongoose_1.Types.ObjectId(skill._id));
            console.log(skillIds, "consoling the skills id");
            const newJobPost = new job_post_model_1.JobPostModel({
                clientId: new mongoose_1.Types.ObjectId(clientId),
                title,
                description,
                duration,
                experience,
                skills: skillIds,
                priceFrom,
                priceTo,
                rate,
            });
            console.log(newJobPost, "consoling the new job post");
            const savedJobPost = yield newJobPost.save();
            // Populate the skills field to return the complete skill objects
            const populatedJobPost = yield job_post_model_1.JobPostModel.findById(savedJobPost._id)
                .populate("skills")
                .exec();
            if (!populatedJobPost) {
                throw new Error("Job post not found after creation");
            }
            console.log(populatedJobPost, "consoling the populated job post");
            // Return the populated job post as a plain object
            return populatedJobPost.toObject();
        }
        catch (error) {
            console.error("Error saving the job post:", error);
            throw new Error("Error saving the job post: " + error.message);
        }
    });
}
