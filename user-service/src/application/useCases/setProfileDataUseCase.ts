import { IDependencies } from "../../application/interfaces/IDependencies";
import { IExperience } from "../../domain/entities";
import { BioData } from "../../domain/interface/IBioData";
import { IProfileData } from "../../domain/interface/IProfileData";

export const setProfileDataUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (
      profileData: IProfileData
    ): Promise<{ success: boolean }> => {
      return await repositories.setProfileDataRepository(profileData);
    },
  };
};
