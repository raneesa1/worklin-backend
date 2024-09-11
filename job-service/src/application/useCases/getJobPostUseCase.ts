import { IDependencies } from "../../application/interfaces/IDependencies";
import { skillEntity } from "../../domain/entities/skillEntity";
import { JobPost } from "../../domain/interface/IJobPost";

export const getJobPostUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (): Promise<JobPost[] > => {
      return await repositories.getJobPost();
    },
  };
};
