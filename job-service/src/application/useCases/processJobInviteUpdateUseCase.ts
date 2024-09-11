import { status } from "../../domain/interface/IApplication";
import { invitedFreelancerStatus } from "../../domain/interface/IInviteFreelancer";
import { IDependencies } from "../interfaces/IDependencies";
export const processJobInviteUpdateUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    async execute(message: {
      freelancerId: string;
      jobPostId: string;
      status: invitedFreelancerStatus;
      resume?: string;
      publicId?: string;
      freelancerName?: string;
      email?: string;
      freelancerTitle?: string;
      freelancerLocation?: string;
      freelancerProfile?: string;
      freelancerCategory?: string;
    }) {
      try {
        console.log("Entering processJobInviteUpdateUseCase execute method");
        console.log("Received message:", message);

        // First, update the job invite status
        const updatedJobInvite = await repositories.updateJobInviteRepository(
          message.jobPostId,
          message.freelancerId,
          message.status
        );

        console.log("Updated job invite:", updatedJobInvite);

        if (message.status === "accepted") {
          // If accepted, create an application
          await repositories.updateJobPostWithApplication({
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
            status: status.applied, // Set the initial status to 'applied'
          });
        }

        return { success: true, message: "Job invite updated successfully" };
      } catch (error) {
        console.error("Error in processJobInviteUpdateUseCase:", error);
        return { success: false, message: "Failed to update job invite" };
      }
    },
  };
};