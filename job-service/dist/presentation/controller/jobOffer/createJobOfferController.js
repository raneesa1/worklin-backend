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
exports.createJobOfferController = void 0;
const validateJobOffer_1 = require("../../../utils/validations/validateJobOffer");
const createJobOfferController = (dependencies) => {
    const { useCases: { createJobOfferUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body, "consoling the req body =========== ==  == = = = = = = == =============== = = = =  = == =  == =  == = = = == == == >>>>>>>>");
            // Validate incoming request using Joi
            const { error, value } = validateJobOffer_1.jobOfferValidator.validate(req.body, {
                abortEarly: false,
            });
            if (error) {
                const errorMessages = error.details.map((detail) => detail.message);
                res.status(400).json({ errors: errorMessages });
                return;
            }
            const jobOfferData = {
                clientId: value.clientId,
                freelancerId: value.freelancerId,
                hiringTeam: value.hiringTeam,
                relatedJobId: value.relatedJobId,
                title: value.title,
                paymentType: value.paymentType,
                paymentOption: value.paymentOption,
                totalAmount: value.totalAmount,
                hourlyRate: value.hourlyRate,
                numberOfHours: value.numberOfHours,
                mileStone: value.mileStone,
                description: value.description,
                files: value.files,
                offerStatus: value.offerStatus,
                isActive: value.isAccepted,
                dueDate: value.dueDate ? new Date(value.dueDate) : new Date(),
            };
            console.log(`Creating job offer with title: ${jobOfferData.title}, for freelancer: ${jobOfferData.freelancerId}`);
            console.log(jobOfferData, "consoling the job offer data before sending to useCase");
            // Execute the use case to create a job offer
            const jobOffer = yield createJobOfferUseCase(dependencies).execute(jobOfferData);
            // Respond with the created job offer
            res.status(201).json({
                message: "Job offer created successfully!",
                data: jobOffer,
            });
        }
        catch (error) {
            console.error("Error in createJobOfferController:", error.message);
            res.status(500).json({
                message: "An error occurred while creating the job offer.",
                error: error.message || "Internal Server Error",
            });
        }
    });
};
exports.createJobOfferController = createJobOfferController;
