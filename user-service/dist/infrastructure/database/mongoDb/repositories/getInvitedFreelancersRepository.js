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
exports.getInvitedFreelancersRepository = getInvitedFreelancersRepository;
const freelancer_1 = require("../model/freelancer");
const jobInvitesModel_1 = require("../model/jobInvitesModel");
function getInvitedFreelancersRepository(jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobInvites = yield jobInvitesModel_1.JobInvitesModel.find({ jobId }).exec();
            if (!jobInvites.length) {
                return []; // No invites found for this job
            }
            // Step 2: Get the list of freelancerIds from the job invites
            const freelancerIds = jobInvites.map((invite) => invite.freelancerId);
            // Step 3: Fetch freelancer details based on freelancerIds
            const freelancers = yield freelancer_1.FreelancerModel.find({
                _id: { $in: freelancerIds },
            })
                .populate("category skill experience education languages address") // Populate any necessary fields
                .exec();
            // Step 4: Map freelancers and invitation statuses together
            const invitedFreelancers = freelancers.map((freelancer) => {
                var _a;
                const invite = jobInvites.find((inv) => inv.freelancerId.toString() === freelancer._id.toString());
                return {
                    freelancer,
                    status: (_a = invite === null || invite === void 0 ? void 0 : invite.status) !== null && _a !== void 0 ? _a : "Unknown", // Add status from the invite, default to "Unknown"
                };
            });
            return invitedFreelancers;
        }
        catch (error) {
            console.error("Error fetching invited freelancers:", error);
            throw new Error("Error fetching invited freelancers");
        }
    });
}
