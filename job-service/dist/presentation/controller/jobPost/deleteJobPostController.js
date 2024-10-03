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
                res.status(400).json({ message: "Job ID is required." });
                return;
            }
            // Create the use case instance by passing dependencies
            const deleteUseCase = deleteJobPostUseCase(jobId);
            // Call the execute method with jobId as the argument
            const deleted = yield deleteUseCase.execute(jobId);
            if (deleted) {
                res.status(200).json({
                    message: "Deleted job successfully!",
                });
            }
            else {
                res.status(404).json({
                    message: "Job not found or already deleted",
                });
            }
        }
        catch (error) {
            console.error("Error in deleting job post controller:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
};
exports.deleteJobPostController = deleteJobPostController;
