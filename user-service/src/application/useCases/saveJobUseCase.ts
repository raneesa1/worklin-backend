import { IDependencies } from "../interfaces/IDependencies";
import { IExperience } from "../../domain/entities";
import { BioData } from "../../domain/interface/IBioData";
import { IProfileData } from "../../domain/interface/IProfileData";
import { ISavedJobs } from "../../domain/entities/IJobInvites";

export const saveJobUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (
      jobData: ISavedJobs
    ): Promise<{ success: boolean }> => {
      return await repositories.saveJobRepository(jobData);
    },
  };
};
