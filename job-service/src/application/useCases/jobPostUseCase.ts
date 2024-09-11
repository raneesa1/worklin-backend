import { JobPost } from "../../domain/interface/IJobPost";
import { IJobPostUseCase } from "../../domain/useCaseInterface/IJobPostUseCase";
import { IDependencies } from "../interfaces/IDependencies";

export const JobPostUseCase = (
  dependencies: IDependencies
): IJobPostUseCase => {
  const { repositories } = dependencies;

  return {
    execute: async (jobPost: JobPost): Promise<JobPost> => {
      const createdJobPost = await repositories.createJobPost(
        jobPost
      );
      return createdJobPost;
    },
  };
};
