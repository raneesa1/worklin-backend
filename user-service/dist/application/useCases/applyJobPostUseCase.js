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
exports.applyJobPostUseCase = void 0;
const rabbit_config_1 = require("../../infrastructure/rabbitmq/rabbit.config");
const applyJobPostUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute(freelancerId, jobPostId) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const updatedFreelancer = yield repositories.applyJobPostRepository(freelancerId, jobPostId);
                    if (!updatedFreelancer) {
                        throw new Error("couldn't apply for this job");
                    }
                    const channel = (0, rabbit_config_1.getChannel)();
                    if (channel) {
                        const message = {
                            freelancerId: updatedFreelancer._id,
                            jobPostId: jobPostId,
                            resume: updatedFreelancer.resume,
                            publicId: updatedFreelancer.publicId,
                            freelancerName: updatedFreelancer.firstName || "name",
                            email: updatedFreelancer.email,
                            freelancerTitle: updatedFreelancer.role,
                            freelancerLocation: updatedFreelancer.country,
                            freelancerProfile: updatedFreelancer.picture,
                        };
                        channel.publish("jobServiceExchange", // Define a new exchange for job service
                        "", // Use the appropriate routing key if needed
                        Buffer.from(JSON.stringify(message)));
                        console.log("Freelancer application details sent to job service");
                    }
                    // Return the updated freelancer details
                    return updatedFreelancer;
                }
                catch (error) {
                    console.error("Error in addLocationUseCase:", error);
                    throw error;
                }
            });
        },
    };
};
exports.applyJobPostUseCase = applyJobPostUseCase;
