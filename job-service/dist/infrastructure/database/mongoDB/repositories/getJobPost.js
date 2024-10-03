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
exports.getJobPost = void 0;
const job_post_model_1 = require("../model/job-post.model");
const getJobPost = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobPosts = yield job_post_model_1.JobPostModel.find({
            isCompleted: true,
            isActive: true
        })
            .populate("skills") // Only fetch the skill `name` field
            .populate("applications") // Only fetch the skill `name` field
            .exec();
        console.log(jobPosts, "consoling the job post from backend");
        return jobPosts;
    }
    catch (error) {
        console.error("Error fetching skills by category ID:", error);
        throw error;
    }
});
exports.getJobPost = getJobPost;
