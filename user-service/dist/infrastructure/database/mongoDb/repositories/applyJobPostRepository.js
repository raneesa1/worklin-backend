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
exports.applyJobPostRepository = void 0;
const freelancer_1 = require("../model/freelancer");
const applyJobPostRepository = (userId, jobPostId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(userId, "consoling the user id");
        const freelancer = yield freelancer_1.FreelancerModel.findById(userId);
        if (!jobPostId) {
            throw new Error("job post id not found");
        }
        console.log(freelancer, "consoling the freelancer ");
        if (!freelancer) {
            throw new Error("Freelancer not found");
        }
        if (freelancer.token <= 0) {
            throw new Error("Insufficient tokens to apply for the job");
        }
        freelancer.appliedJobs.push(jobPostId);
        freelancer.token -= 1;
        yield freelancer_1.FreelancerModel.findByIdAndUpdate(userId, {
            $inc: { tokens: -1 },
            $push: { appliedJobs: jobPostId },
        }, { new: true } // Return the updated document
        );
        yield freelancer.save();
        return freelancer;
    }
    catch (error) {
        console.error("Error saving experience or updating freelancer:", error);
        throw new Error("Error saving experience or updating freelancer");
    }
});
exports.applyJobPostRepository = applyJobPostRepository;
