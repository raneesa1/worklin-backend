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
exports.jobInvitesRepository = jobInvitesRepository;
const freelancer_1 = require("../model/freelancer");
const jobInvitesModel_1 = require("../model/jobInvitesModel");
function jobInvitesRepository(inviteData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newInvite = new jobInvitesModel_1.JobInvitesModel(inviteData);
            const savedInvite = yield newInvite.save();
            if (savedInvite && inviteData.freelancerId) {
                yield freelancer_1.FreelancerModel.findByIdAndUpdate(inviteData.freelancerId, { $push: { jobInvites: savedInvite._id } }, { new: true, useFindAndModify: false }).exec();
            }
            return savedInvite;
        }
        catch (error) {
            console.error("Error saving invite and updating freelancer:", error);
            throw error;
        }
    });
}
