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
exports.updateStatusJobOfferController = void 0;
const updateStatusJobOfferController = (dependencies) => {
    const { useCases: { updateJobOfferStatusUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { jobOfferId, status } = req.body;
            console.log(jobOfferId, status, "consoling the jobOfferId , status from controller");
            const jobOffer = yield updateJobOfferStatusUseCase(dependencies).execute(jobOfferId, status);
            res.status(200).json({
                message: `job offer ${status} successfully!`,
                jobOffer,
            });
        }
        catch (error) {
            console.error("Error in updateStatusJobOffer controller:", error);
            res
                .status(500)
                .json({ message: error.message || "Internal Server Error" });
        }
    });
};
exports.updateStatusJobOfferController = updateStatusJobOfferController;
