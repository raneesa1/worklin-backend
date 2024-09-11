import { FreelancerEntity } from "../../domain/entities";
import { IAddress } from "../../domain/interface/IAddress";
import { IDependencies } from "../interfaces/IDependencies";

export const postProfileUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    async execute(
      freelancer: FreelancerEntity
    ): Promise<FreelancerEntity | null> {
      try {
        const savedFreelancer = await repositories.postProfileRepository(
          freelancer
        );
        if (!savedFreelancer) {
          throw new Error("Freelancer could not be updated.");
        }

        // Return the updated freelancer details
        return savedFreelancer;
      } catch (error) {
        console.error("Error in freelancer use case:", error);
        throw error;
      }
    },
  };
};
