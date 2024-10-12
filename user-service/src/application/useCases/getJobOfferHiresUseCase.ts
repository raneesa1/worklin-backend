import { IDependencies } from "../interfaces/IDependencies";
import { FreelancerEntity } from "../../domain/entities";

export const getJobOfferHiresUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (
      jobId: string
    ): Promise<Array<{ freelancer: FreelancerEntity }>> => {
      return await repositories.getJobOfferHiresRepository(jobId);
    },
  };
};
