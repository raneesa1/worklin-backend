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
exports.createJobOfferRepository = void 0;
// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts
const jobOffer_1 = require("../../../../domain/entities/jobOffer");
const mileStoneModel_1 = require("../model/mileStoneModel");
const jobOfferModel_1 = require("../model/jobOfferModel");
const createJobOfferRepository = (jobOfferData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (jobOfferData.paymentOption === jobOffer_1.paymentOption.mileStone) {
            if (Array.isArray(jobOfferData.mileStone)) {
                const mileStones = yield Promise.all(jobOfferData.mileStone.map((ms) => new mileStoneModel_1.MileStoneModel(ms).save()));
                console.log(mileStones, "consoling the mile stones");
                // Store all milestone IDs instead of just the first one
                jobOfferData.mileStone = mileStones.map((ms) => ms._id);
            }
            else {
                throw new Error("Milestone data should be an array for milestone-based payments");
            }
        }
        if (jobOfferData.paymentType === jobOffer_1.paymentType.hourly) {
            // Ensure hourlyRate and numberOfHours are set
            if (!jobOfferData.hourlyRate || !jobOfferData.numberOfHours) {
                throw new Error("Hourly rate and number of hours are required for hourly payment type");
            }
            // Calculate total amount
            jobOfferData.totalAmount =
                jobOfferData.hourlyRate * jobOfferData.numberOfHours;
        }
        else if (jobOfferData.paymentType === jobOffer_1.paymentType.fixed) {
            // Ensure totalAmount is set
            if (!jobOfferData.totalAmount) {
                throw new Error("Total amount is required for fixed payment type");
            }
        }
        const newJobOffer = new jobOfferModel_1.JobOfferModel(jobOfferData);
        console.log(newJobOffer, "consoling the new job offer");
        const savedJobOffer = yield newJobOffer.save();
        console.log(savedJobOffer, "consoling the saved job offer");
        return savedJobOffer.toObject();
    }
    catch (error) {
        console.error("Error in creating job offer:", error);
        throw error;
    }
});
exports.createJobOfferRepository = createJobOfferRepository;
