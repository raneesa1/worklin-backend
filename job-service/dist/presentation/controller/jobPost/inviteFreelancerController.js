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
exports.inviteFreelancerController = void 0;
const inviteFreelancerController = (dependencies) => {
    const { useCases: { inviteFreelancerUseCase }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { freelancerId, clientId, jobId, description, clientName } = req.body;
            console.log(freelancerId, clientId, jobId, clientName, description);
            // Destructure the invitation data directly from req.body
            console.log({ freelancerId, clientId, jobId, description, clientName }, "consoling the invitation data");
            console.log("hi from controller post inviteFreelancerUseCase");
            // Reassemble the data into a single object
            const invitationData = {
                freelancerId,
                clientId,
                jobId,
                clientName,
                description,
            };
            // Call the use case with the reassembled object
            const jobPost = yield inviteFreelancerUseCase(dependencies).execute(invitationData);
            console.log(jobPost, "consoling the job post");
            res.status(201).json({
                message: "Job post retrieved successfully!",
                jobPost: jobPost,
            });
        }
        catch (error) {
            console.error("Error in sending freelancer request post controller:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
};
exports.inviteFreelancerController = inviteFreelancerController;
