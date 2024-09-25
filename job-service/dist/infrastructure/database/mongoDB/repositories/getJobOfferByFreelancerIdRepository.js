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
exports.getJobOfferByFreelancerIdRepository = getJobOfferByFreelancerIdRepository;
const jobOfferModel_1 = require("../model/jobOfferModel");
function getJobOfferByFreelancerIdRepository(freelancerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(freelancerId, 'consoling the freelancer if from the repo');
            const jobOffers = yield jobOfferModel_1.JobOfferModel.find({ freelancerId: freelancerId })
                .populate("mileStone")
                .exec();
            console.log(jobOffers, "consoling the job offer of freelancer", freelancerId);
            return jobOffers;
        }
        catch (error) {
            console.error("Error fetching job invites for freelancer:", error);
            throw error;
        }
    });
}
