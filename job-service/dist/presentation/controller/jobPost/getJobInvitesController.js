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
exports.getJobInvitesController = void 0;
const getJobInvitesController = (dependencies) => {
    const { useCases: { getJobInvitesUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { freelancerId } = req.params;
            if (!freelancerId) {
                throw new Error("freelancer id is required");
            }
            const JobPosts = yield getJobInvitesUseCase(dependencies).execute(freelancerId);
            console.log(JobPosts, "consoling the JobPosts job post");
            if (JobPosts) {
                res.status(200).json({
                    message: "Job posts retrieved successfully!",
                    jobPosts: JobPosts, // Ensure this key matches your Angular service expectations
                });
            }
            else {
                res.status(404).json({
                    message: "No job posts found with this id!",
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
exports.getJobInvitesController = getJobInvitesController;
