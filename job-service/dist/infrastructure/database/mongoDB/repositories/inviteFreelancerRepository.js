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
exports.inviteFreelancerRepository = void 0;
const sendInvitationToQueue_1 = require("../../../rabbitMq/sendInvitationToQueue");
const invitedFreelancersModel_1 = require("../model/invitedFreelancersModel");
const job_post_model_1 = require("../model/job-post.model");
const inviteFreelancerRepository = (invitationData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId, freelancerId, jobId, description, clientName } = invitationData;
        // Create a new instance of the InviteFreelancerModel with the destructured data
        const newInvitation = new invitedFreelancersModel_1.InviteFreelancerModel({
            clientId,
            freelancerId,
            jobId,
            description,
            clientName
        });
        const savedInvitation = yield newInvitation.save();
        if (!savedInvitation) {
            return null;
        }
        yield job_post_model_1.JobPostModel.updateOne({ _id: invitationData.jobId }, { $push: { invitedFreelancers: savedInvitation._id } });
        yield (0, sendInvitationToQueue_1.sendInvitationToQueue)(savedInvitation);
        return savedInvitation;
    }
    catch (error) {
        console.error("Error fetching skills by category ID:", error);
        throw error;
    }
});
exports.inviteFreelancerRepository = inviteFreelancerRepository;
