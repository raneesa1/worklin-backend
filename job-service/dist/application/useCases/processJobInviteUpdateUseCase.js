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
exports.processJobInviteUpdateUseCase = void 0;
const IApplication_1 = require("../../domain/interface/IApplication");
const processJobInviteUpdateUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute(message) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log("Entering processJobInviteUpdateUseCase execute method");
                    console.log("Received message:", message);
                    // First, update the job invite status
                    const updatedJobInvite = yield repositories.updateJobInviteRepository(message.jobPostId, message.freelancerId, message.status);
                    console.log("Updated job invite:", updatedJobInvite);
                    if (message.status === "accepted") {
                        // If accepted, create an application
                        yield repositories.updateJobPostWithApplication({
                            jobPostId: message.jobPostId,
                            freelancerId: message.freelancerId,
                            resume: message.resume,
                            publicId: message.publicId || "",
                            freelancerName: message.freelancerName || "",
                            email: message.email || "",
                            freelancerTitle: message.freelancerTitle || "",
                            freelancerLocation: message.freelancerLocation || "",
                            freelancerProfile: message.freelancerProfile || "",
                            freelancerCategory: message.freelancerCategory || "",
                            status: IApplication_1.status.applied, // Set the initial status to 'applied'
                        });
                    }
                    return { success: true, message: "Job invite updated successfully" };
                }
                catch (error) {
                    console.error("Error in processJobInviteUpdateUseCase:", error);
                    return { success: false, message: "Failed to update job invite" };
                }
            });
        },
    };
};
exports.processJobInviteUpdateUseCase = processJobInviteUpdateUseCase;
