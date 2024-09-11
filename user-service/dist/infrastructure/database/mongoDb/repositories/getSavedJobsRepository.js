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
exports.getSavedJobsRepository = getSavedJobsRepository;
const freelancer_1 = require("../model/freelancer");
const savedJobsModel_1 = require("../model/savedJobsModel");
function getSavedJobsRepository(freelancerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const freelancer = yield freelancer_1.FreelancerModel.findById(freelancerId);
            if (!freelancer) {
                console.error(`Freelancer with ID ${freelancerId} not found.`);
                return [];
            }
            console.log(freelancer);
            const savedJobs = yield savedJobsModel_1.SavedJobsModel.find({
                jobId: { $in: freelancer.savedJobs },
            }).sort({ createdAt: -1 });
            return savedJobs;
        }
        catch (error) {
            console.error("Error fetching saved jobs:", error);
            throw error;
        }
    });
}
