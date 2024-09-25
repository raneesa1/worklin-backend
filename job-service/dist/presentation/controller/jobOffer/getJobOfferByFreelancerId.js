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
exports.getJobOfferByFreelancerIdController = void 0;
const getJobOfferByFreelancerIdController = (dependencies) => {
    const { useCases: { getJobOfferByFreelancerIdUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { freelancerId } = req.params;
            console.log(freelancerId, "consoling the freelancer id from controller");
            const jobOffer = yield getJobOfferByFreelancerIdUseCase(dependencies).execute(freelancerId);
            res.status(200).json({
                message: "job offer retrieved successfully!",
                jobOffer,
            });
        }
        catch (error) {
            console.error("Error in getJobOfferByFreelancerIdController controller:", error);
            res
                .status(500)
                .json({ message: error.message || "Internal Server Error" });
        }
    });
};
exports.getJobOfferByFreelancerIdController = getJobOfferByFreelancerIdController;
