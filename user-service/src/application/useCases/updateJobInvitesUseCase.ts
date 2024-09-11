import { FreelancerEntity } from "../../domain/entities";
import { JobInvitesStatus } from "../../domain/entities/IJobInvites";
import { getChannel } from "../../infrastructure/rabbitmq/rabbit.config";
import { IDependencies } from "../interfaces/IDependencies";

export const updateJobInvitesUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    async execute(
      freelancerId: string,
      jobPostId: string,
      status: JobInvitesStatus
    ): Promise<FreelancerEntity | null> {
      try {
        const updatedFreelancer = await repositories.updateJobInviteRepository(
          freelancerId,
          jobPostId,
          status
        );

        if (!updatedFreelancer) {
          throw new Error("Couldn't update the job invite status");
        }

        const channel = getChannel();
        if (channel) {
          let message: any = {
            freelancerId: updatedFreelancer._id,
            jobPostId: jobPostId,
            status: status,
          };

          // If the status is accepted, include additional application details
          if (status === JobInvitesStatus.accepted) {
            message = {
              ...message,
              resume: updatedFreelancer.resume,
              publicId: updatedFreelancer.publicId,
              freelancerName: updatedFreelancer.firstName || "name",
              email: updatedFreelancer.email,
              freelancerTitle: updatedFreelancer.role,
              freelancerLocation: updatedFreelancer.country,
              freelancerProfile: updatedFreelancer.picture,
            };
          }

          channel.publish(
            "jobServiceExchange",
            "",
            Buffer.from(JSON.stringify(message))
          );

          console.log(
            status === JobInvitesStatus.accepted
              ? "Freelancer application details sent to job service"
              : "Job invite update sent to job service"
          );
        }

        return updatedFreelancer;
      } catch (error) {
        console.error("Error in updating job invite:", error);
        throw error;
      }
    },
  };
};
