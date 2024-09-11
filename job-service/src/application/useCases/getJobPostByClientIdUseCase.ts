import { IDependencies } from "../../application/interfaces/IDependencies";
import { JobPost } from "../../domain/interface/IJobPost";

export const getJobPostByClientIdUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (clientId: string): Promise<JobPost[]> => {
      const jobPosts = await repositories.getJobPostByClientId(clientId);
      return jobPosts || []; // Return an empty array if jobPosts is null
    },
  };
};
