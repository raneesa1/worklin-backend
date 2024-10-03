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
exports.deleteJobPostController = void 0;
const deleteJobPostController = (dependencies) => {
    const { useCases: { deleteJobPostUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { jobId } = req.body;
            // Validate the ID parameter
            if (!jobId) {
                res.status(400).json({ message: "category ID is required." });
                return;
            }
            // Directly call the JobPostUseCase with jobPost as the argument
            const deleted = yield deleteJobPostUseCase(dependencies).execute(jobId);
            console.log(deleted, "consoling the created job post");
            res.status(201).json({
                message: "deleted job successfully!",
            });
        }
        catch (error) {
            console.error("Error in creating job post controller:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
};
exports.deleteJobPostController = deleteJobPostController;
