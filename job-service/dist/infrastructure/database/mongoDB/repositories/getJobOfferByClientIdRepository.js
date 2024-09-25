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
exports.getJobOfferByClientIdRepository = getJobOfferByClientIdRepository;
const jobOfferModel_1 = require("../model/jobOfferModel");
const mongoose_1 = require("mongoose");
function getJobOfferByClientIdRepository(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(clientId, "consoling the clientId if from the repo");
            const jobOffers = yield jobOfferModel_1.JobOfferModel.find({
                clientId: new mongoose_1.Types.ObjectId(clientId),
            })
                .populate("mileStone")
                .exec();
            console.log(jobOffers, "consoling the job offer of clientId", clientId);
            return jobOffers;
        }
        catch (error) {
            console.error("Error fetching job invites for clientId:", error);
            throw error;
        }
    });
}
