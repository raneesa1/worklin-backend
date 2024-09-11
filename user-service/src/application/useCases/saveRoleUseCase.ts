import { IDependencies } from "../interfaces/IDependencies";
import { IExperience } from "../../domain/entities";
import { BioData } from "../../domain/interface/IBioData";
import { IProfileData } from "../../domain/interface/IProfileData";

export const saveRoleUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (
      role: string,
      freelancerId: string
    ): Promise<{ success: boolean }> => {
      return await repositories.saveRoleRepository(role,freelancerId);
    },
  };
};
