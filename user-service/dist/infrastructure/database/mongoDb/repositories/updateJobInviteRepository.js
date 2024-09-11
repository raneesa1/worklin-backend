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
exports.updateJobInviteRepository = void 0;
const IJobInvites_1 = require("../../../../domain/entities/IJobInvites");
const freelancer_1 = require("../model/freelancer");
const jobInvitesModel_1 = require("../model/jobInvitesModel");
const updateJobInviteRepository = (userId, jobPostId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const freelancer = yield freelancer_1.FreelancerModel.findById(userId).populate("jobInvites");
        if (!freelancer) {
            throw new Error("Freelancer not found");
        }
        const jobInvite = yield jobInvitesModel_1.JobInvitesModel.findOne({
            freelancerId: userId,
            jobId: jobPostId,
        });
        if (!jobInvite) {
            throw new Error("Job invite not found");
        }
        if (!Object.values(IJobInvites_1.JobInvitesStatus).includes(status)) {
            throw new Error("Invalid status provided");
        }
        jobInvite.status = status;
        yield jobInvite.save();
        if (status === IJobInvites_1.JobInvitesStatus.accepted) {
            if (freelancer.token <= 0) {
                throw new Error("Insufficient tokens to apply for the job");
            }
            // Apply for the job
            if (!freelancer.appliedJobs.includes(jobPostId)) {
                freelancer.appliedJobs.push(jobPostId);
                freelancer.token -= 1;
                yield freelancer_1.FreelancerModel.findByIdAndUpdate(userId, {
                    $inc: { token: -1 },
                    $push: { appliedJobs: jobPostId },
                }, { new: true });
            }
        }
        // If rejected, we don't need to do anything additional
        yield freelancer.save();
        return freelancer;
    }
    catch (error) {
        console.error("Error updating job invite or freelancer:", error);
        throw new Error("Error updating job invite or freelancer");
    }
});
exports.updateJobInviteRepository = updateJobInviteRepository;
