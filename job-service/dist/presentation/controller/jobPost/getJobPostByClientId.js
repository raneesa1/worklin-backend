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
exports.getJobPostByClientIdController = void 0;
const getJobPostByClientIdController = (dependencies) => {
    const { useCases: { getJobPostByClientIdUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { clientId } = req.params;
            if (!clientId) {
                throw new Error("client id is required");
            }
            const JobPosts = yield getJobPostByClientIdUseCase(dependencies).execute(clientId);
            console.log(JobPosts, "consoling the JobPosts job post");
            if (JobPosts && JobPosts.length > 0) {
                res.status(200).json({
                    message: "Job posts retrieved successfully!",
                    jobPosts: JobPosts, // Ensure this key matches your Angular service expectations
                });
            }
            else {
                res.status(404).json({
                    message: "No job posts found for this client!",
                    jobPosts: [], // Provide an empty array for consistency
                });
            }
        }
        catch (error) {
            console.error("Error in creating job post controller:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
};
exports.getJobPostByClientIdController = getJobPostByClientIdController;
