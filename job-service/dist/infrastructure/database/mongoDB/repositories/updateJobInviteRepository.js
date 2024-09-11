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
const invitedFreelancersModel_1 = require("../model/invitedFreelancersModel");
const updateJobInviteRepository = (jobPostId, freelancerId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Params:", { jobPostId, freelancerId, status });
        const updatedJobInvite = yield invitedFreelancersModel_1.InviteFreelancerModel.findOneAndUpdate({ jobId: jobPostId, freelancerId: freelancerId }, { status: status }, { new: true });
        console.log("Updated job invite:", updatedJobInvite);
        if (!updatedJobInvite) {
            console.log("Job invite not found");
            throw new Error("Job invite not found");
        }
        return updatedJobInvite;
    }
    catch (error) {
        console.error("Error updating job invite:", error);
        throw error;
    }
});
exports.updateJobInviteRepository = updateJobInviteRepository;
