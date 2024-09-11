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
exports.editJobPost = editJobPost;
const mongoose_1 = require("mongoose");
const job_post_model_1 = require("../model/job-post.model");
function editJobPost(jobPostData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("hi from edit job post repository");
            const { clientId, title, description, duration, experience, skills, priceFrom, priceTo, rate, } = jobPostData;
            const skillIds = skills.map((skill) => new mongoose_1.Types.ObjectId(skill._id));
            console.log(skillIds, "Skill IDs");
            // Find and update job post
            const updatedJobPost = yield job_post_model_1.JobPostModel.findByIdAndUpdate(jobPostData._id, {
                clientId: new mongoose_1.Types.ObjectId(clientId),
                title,
                description,
                duration,
                experience,
                skills: skillIds,
                priceFrom,
                priceTo,
                rate,
                isCompleted: true,
            }, { new: true } // Return the updated document
            ).exec();
            if (!updatedJobPost) {
                throw new Error("Job post not found");
            }
            console.log(updatedJobPost, "Saved job post");
            return updatedJobPost.toObject();
        }
        catch (error) {
            console.error("Error updating job post:", error);
            throw new Error("Error updating job post: " + error.message);
        }
    });
}
