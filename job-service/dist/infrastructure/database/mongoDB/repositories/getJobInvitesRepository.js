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
exports.getJobInvitesRepository = getJobInvitesRepository;
const job_post_model_1 = require("../model/job-post.model"); // Path to your JobPostModel
const invitedFreelancersModel_1 = require("../model/invitedFreelancersModel");
function getJobInvitesRepository(freelancerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const invites = yield invitedFreelancersModel_1.InviteFreelancerModel.find({ freelancerId });
            const jobIds = invites.map((invite) => invite.jobId);
            // Find the job posts that correspond to these invites
            const jobPosts = yield job_post_model_1.JobPostModel.find({ _id: { $in: jobIds } })
                .populate("skills")
                .populate({
                path: "invitedFreelancers",
                match: { freelancerId: freelancerId }, // Filter invitedFreelancers by freelancerId
                select: "clientId jobId clientName description status requestedAt", // Fields you want to include
            })
                .exec();
            return jobPosts;
        }
        catch (error) {
            console.error("Error fetching job invites for freelancer:", error);
            throw error;
        }
    });
}
