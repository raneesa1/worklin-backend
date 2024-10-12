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
exports.getJobOfferHiresRepository = getJobOfferHiresRepository;
const hireModel_1 = require("../model/hireModel");
function getJobOfferHiresRepository(jobId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobHires = yield hireModel_1.HireModel.find({ "jobDetails.jobOffer": jobId })
                .populate("freelancer")
                .lean()
                .exec();
            if (!jobHires.length) {
                return [];
            }
            return jobHires.map((hire) => ({
                freelancer: hire.freelancer,
            }));
        }
        catch (error) {
            console.error("Error fetching hired freelancers:", error);
            throw new Error("Error fetching hired freelancers");
        }
    });
}
