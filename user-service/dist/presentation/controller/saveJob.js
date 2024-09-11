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
exports.saveJobController = void 0;
const saveJobValidation_1 = require("../../utils/validation/saveJobValidation");
const saveJobController = (dependencies) => {
    const { useCases: { saveJobUseCase, removeSavedJobUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { jobData, action } = req.body;
            // Validate jobData using the validation function from jobValidation.ts
            const { error } = (0, saveJobValidation_1.validateJobData)(jobData);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
            let result;
            if (action === "save") {
                result = yield saveJobUseCase(dependencies).execute(jobData);
                return res
                    .status(201)
                    .json({ message: "Job saved successfully", data: result });
            }
            else if (action === "unsave") {
                result = yield removeSavedJobUseCase(dependencies).execute(jobData.jobId, jobData.freelancerId);
                return res
                    .status(200)
                    .json({ message: "Job unsaved successfully", data: result });
            }
            else {
                return res
                    .status(400)
                    .json({ message: "Invalid action. Must be 'save' or 'unsave'." });
            }
        }
        catch (error) {
            console.error("Error saving/unsaving the job:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
};
exports.saveJobController = saveJobController;
