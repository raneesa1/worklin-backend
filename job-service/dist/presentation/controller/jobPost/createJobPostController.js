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
exports.createJobPostController = void 0;
const validateJobPost_1 = require("../../../utils/validations/validateJobPost");
const createJobPostController = (dependencies) => {
    const { useCases: { JobPostUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body, "consoling the req.body");
            // Validate the input
            const { error, value } = (0, validateJobPost_1.validateJobPostInput)(req.body);
            if (error) {
                res.status(400).json({
                    message: "Validation failed",
                    errors: error.details.map((detail) => detail.message),
                });
                return;
            }
            const { title, skills, rate, priceTo, priceFrom, experience, duration, description, clientId, } = req.body;
            const jobPost = {
                title,
                skills,
                rate,
                priceTo,
                priceFrom,
                experience,
                duration,
                description,
                clientId,
            };
            console.log(jobPost, "consoling the job post");
            // Directly call the JobPostUseCase with jobPost as the argument
            const createdJobPost = yield JobPostUseCase(dependencies).execute(jobPost);
            console.log(createdJobPost, "consoling the created job post");
            res.status(201).json({
                message: "Job post created successfully!",
                jobPost: createdJobPost,
            });
        }
        catch (error) {
            console.error("Error in creating job post controller:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
};
exports.createJobPostController = createJobPostController;
