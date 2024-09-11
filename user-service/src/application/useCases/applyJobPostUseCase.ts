import { FreelancerEntity } from "../../domain/entities";
import { IAddress } from "../../domain/interface/IAddress";
import { getChannel } from "../../infrastructure/rabbitmq/rabbit.config";
import { IDependencies } from "../interfaces/IDependencies";

export const applyJobPostUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    async execute(
      freelancerId: string,
      jobPostId: string
    ): Promise<FreelancerEntity | null> {
      try {
        const updatedFreelancer = await repositories.applyJobPostRepository(
          freelancerId,
          jobPostId
        );
        if (!updatedFreelancer) {
          throw new Error("couldn't apply for this job");
        }
        const channel = getChannel();
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
          channel.publish(
            "jobServiceExchange", // Define a new exchange for job service
            "", // Use the appropriate routing key if needed
            Buffer.from(JSON.stringify(message))
          );
          console.log("Freelancer application details sent to job service");
        }

        // Return the updated freelancer details
        return updatedFreelancer;
      } catch (error) {
        console.error("Error in addLocationUseCase:", error);
        throw error;
      }
    },
  };
};
