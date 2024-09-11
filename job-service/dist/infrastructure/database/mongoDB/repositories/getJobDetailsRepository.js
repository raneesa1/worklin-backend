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
exports.getJobDetailsRepository = getJobDetailsRepository;
const job_post_model_1 = require("../model/job-post.model");
function getJobDetailsRepository(jobIds) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobDetails = yield job_post_model_1.JobPostModel.find({ _id: { $in: jobIds } }).exec();
            if (!jobDetails || jobDetails.length === 0) {
                console.error("No jobs found for the provided IDs.");
                return [];
            }
            return jobDetails;
        }
        catch (error) {
            console.error("Error fetching job details from database:", error);
            throw error;
        }
    });
}
