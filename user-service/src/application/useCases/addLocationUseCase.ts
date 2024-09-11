import { FreelancerEntity } from "../../domain/entities";
import { IAddress } from "../../domain/interface/IAddress";
import { IDependencies } from "../interfaces/IDependencies";


export const addLocationUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    async execute(
      freelancerId: string,
      location: IAddress,
      imageUrl: string
    ): Promise<FreelancerEntity | null> {
      try {
        // Save the address and get the updated freelancer details
        const updatedFreelancer = await repositories.saveAddress(
          freelancerId,
          location
        );
        if (!updatedFreelancer) {
          throw new Error("Address could not be saved.");
        }

        // Update the freelancer's profile image
        const imageSaved = await repositories.saveProfileImage(
          freelancerId,
          imageUrl
        );
        if (!imageSaved) {
          throw new Error("Profile image could not be updated.");
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
