import { IDependencies } from "../../application/interfaces/IDependencies";
import { JobPost } from "../../domain/interface/IJobPost";

export const getJobDetailsUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies; // Make sure repositories is included in IDependencies

  return {
    execute: async (jobIds: string[]): Promise<JobPost[]> => {
      return await repositories.getJobDetailsRepository(jobIds);
    },
  };
};
