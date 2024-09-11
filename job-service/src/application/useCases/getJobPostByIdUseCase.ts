import { IDependencies } from "../../application/interfaces/IDependencies";
import { JobPost } from "../../domain/interface/IJobPost";

export const getJobPostByIdUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (jobPostId: string): Promise<JobPost> => {
      const jobPost = await repositories.getJobPostById(jobPostId);
      if (!jobPost) {
        throw new Error(`Job post with ID ${jobPostId} not found`);
      }
      return jobPost;
    },
  };
};
