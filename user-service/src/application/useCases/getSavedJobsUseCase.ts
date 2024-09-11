import { IDependencies } from "../../application/interfaces/IDependencies";
import { FreelancerEntity } from "../../domain/entities";

export const getSavedJobsUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (freelancerId: string): Promise<any[] | null> => {
      return await repositories.getSavedJobsRepository(freelancerId);
    },
  };
};
