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
exports.getFreelancerTransactionsController = void 0;
const getFreelancerTransactionsController = (dependencies) => {
    const { useCases: { getFreelancerTransactionsUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { freelancerId } = req.params;
            const payments = yield getFreelancerTransactionsUseCase(dependencies).execute(freelancerId);
            res.status(200).json({
                payments,
                message: "transaction fetched successfully",
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};
exports.getFreelancerTransactionsController = getFreelancerTransactionsController;
