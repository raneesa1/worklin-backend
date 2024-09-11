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
exports.updateJobInvitesUseCase = void 0;
const IJobInvites_1 = require("../../domain/entities/IJobInvites");
const rabbit_config_1 = require("../../infrastructure/rabbitmq/rabbit.config");
const updateJobInvitesUseCase = (dependencies) => {
    const { repositories } = dependencies;
    return {
        execute(freelancerId, jobPostId, status) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const updatedFreelancer = yield repositories.updateJobInviteRepository(freelancerId, jobPostId, status);
                    if (!updatedFreelancer) {
                        throw new Error("Couldn't update the job invite status");
                    }
                    const channel = (0, rabbit_config_1.getChannel)();
                    if (channel) {
                        let message = {
                            freelancerId: updatedFreelancer._id,
                            jobPostId: jobPostId,
                            status: status,
                        };
                        // If the status is accepted, include additional application details
                        if (status === IJobInvites_1.JobInvitesStatus.accepted) {
                            message = Object.assign(Object.assign({}, message), { resume: updatedFreelancer.resume, publicId: updatedFreelancer.publicId, freelancerName: updatedFreelancer.firstName || "name", email: updatedFreelancer.email, freelancerTitle: updatedFreelancer.role, freelancerLocation: updatedFreelancer.country, freelancerProfile: updatedFreelancer.picture });
                        }
                        channel.publish("jobServiceExchange", "", Buffer.from(JSON.stringify(message)));
                        console.log(status === IJobInvites_1.JobInvitesStatus.accepted
                            ? "Freelancer application details sent to job service"
                            : "Job invite update sent to job service");
                    }
                    return updatedFreelancer;
                }
                catch (error) {
                    console.error("Error in updating job invite:", error);
                    throw error;
                }
            });
        },
    };
};
exports.updateJobInvitesUseCase = updateJobInvitesUseCase;
