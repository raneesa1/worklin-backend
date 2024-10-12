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
exports.getJobOfferHiresController = void 0;
const getJobOfferHiresController = (dependencies) => {
    const { getJobOfferHiresUseCase } = dependencies.useCases;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { jobId } = req.params;
            if (!jobId) {
                res.status(400).json({ message: "jobId is required" });
                return;
            }
            const hires = yield getJobOfferHiresUseCase(dependencies).execute(jobId);
            if (!hires || hires.length === 0) {
                res.status(404).json({ message: "No hires found for this job" });
                return;
            }
            res.status(200).json(hires);
        }
        catch (error) {
            console.error("Error getting hires for job:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.getJobOfferHiresController = getJobOfferHiresController;
