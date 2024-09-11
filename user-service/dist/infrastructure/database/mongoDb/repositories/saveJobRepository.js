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
exports.saveJobRepository = saveJobRepository;
const savedJobsModel_1 = require("../model/savedJobsModel"); // Import the SavedJobs model
const freelancer_1 = require("../model/freelancer"); // Import the Freelancer model
function saveJobRepository(jobData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const freelancer = yield freelancer_1.FreelancerModel.findById(jobData.freelancerId);
            if (!freelancer) {
                throw new Error("Freelancer not found");
            }
            const existingSavedJob = yield savedJobsModel_1.SavedJobsModel.findOne({
                freelancerId: jobData.freelancerId,
                jobId: jobData.jobId,
            });
            if (existingSavedJob) {
                return { success: true };
            }
            const savedJob = new savedJobsModel_1.SavedJobsModel({
                freelancerId: jobData.freelancerId,
                clientId: jobData.clientId,
                title: jobData.title,
                jobId: jobData.jobId,
                description: jobData.description,
                duration: jobData.duration,
                experience: jobData.experience,
                skills: jobData.skills,
                priceFrom: jobData.priceFrom,
                priceTo: jobData.priceTo,
                rate: jobData.rate,
                hires: jobData.hires,
                status: jobData.status,
                applications: jobData.applications,
            });
            yield savedJob.save();
            freelancer.savedJobs.push(jobData.jobId);
            yield freelancer.save();
            return { success: true };
        }
        catch (error) {
            console.error("Error saving job to freelancer's saved jobs:", error);
            throw error;
        }
    });
}
