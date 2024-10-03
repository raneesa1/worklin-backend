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
exports.getJobOfferById = getJobOfferById;
const jobOfferModel_1 = require("../model/jobOfferModel");
function getJobOfferById(offerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobOffer = yield jobOfferModel_1.JobOfferModel.findById(offerId).populate([
                { path: "mileStone", model: "MileStone" }, // Populate milestone data if needed
            ]);
            if (!jobOffer) {
                return null;
            }
            return jobOffer;
        }
        catch (error) {
            console.error(`Error fetching job offer with ID ${offerId}:`, error);
            return null;
        }
    });
}
