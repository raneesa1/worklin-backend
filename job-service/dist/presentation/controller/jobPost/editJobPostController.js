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
exports.editJobPostController = void 0;
const validateJobPost_1 = require("../../../utils/validations/validateJobPost");
const editJobPostController = (dependencies) => {
    const { useCases: { editJobPostUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body, "Request body");
            // Validate the incoming request body
            const { error, value } = (0, validateJobPost_1.validateJobPostInput)(req.body);
            if (error) {
                res.status(400).json({
                    message: "Validation failed",
                    errors: error.details.map((detail) => detail.message),
                });
                return;
            }
            // Check if `id` is provided in the request body
            if (!req.body._id) {
                res.status(400).json({
                    message: "Job post ID is required for updating a job post.",
                });
                return;
            }
            const { _id, title, skills, rate, priceTo, priceFrom, experience, duration, description, clientId, } = req.body;
            // Create a JobPost object
            const jobPost = {
                _id, // Ensure _id is included for update operations
                title,
                skills,
                rate,
                priceFrom,
                priceTo,
                experience,
                duration,
                description,
                clientId,
            };
            console.log(jobPost, "Job post");
            // Call the use case to handle the job post update
            const updatedJobPost = yield editJobPostUseCase(dependencies).execute(jobPost);
            console.log(updatedJobPost, "Updated job post");
            res.status(200).json({
                message: "Job post updated successfully!",
                jobPost: updatedJobPost,
            });
        }
        catch (error) {
            console.error("Error in edit job post controller:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
};
exports.editJobPostController = editJobPostController;
