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
exports.acceptJobOfferRepository = void 0;
const jobOffer_1 = require("../../../../domain/entities/jobOffer");
const jobOfferModel_1 = require("../model/jobOfferModel");
const acceptJobOfferRepository = (jobOfferId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobOffer = yield jobOfferModel_1.JobOfferModel.findById(jobOfferId);
        if (!jobOffer) {
            throw new Error("no job offer found");
        }
        if (status === jobOffer_1.offerStatus.accepted) {
            jobOffer.offerStatus = jobOffer_1.offerStatus.accepted;
            jobOffer.expiresAt = new Date(+new Date() + 100 * 365 * 24 * 60 * 60 * 1000); // 100 years in the future
            jobOffer.isActive = true; // Assuming an accepted job offer is considered active
        }
        else if (status === jobOffer_1.offerStatus.rejected) {
            jobOffer.offerStatus = jobOffer_1.offerStatus.rejected;
            jobOffer.expiresAt = new Date(+new Date() + 100 * 365 * 24 * 60 * 60 * 1000); // 100 years in the future
        }
        yield jobOffer.save(); // Save the updated job offer
        return jobOffer;
    }
    catch (error) {
        console.error("Error updating job post with application:", error);
        throw error;
    }
});
exports.acceptJobOfferRepository = acceptJobOfferRepository;
