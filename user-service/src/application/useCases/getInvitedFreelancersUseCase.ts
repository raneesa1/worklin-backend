import { IDependencies } from "../interfaces/IDependencies";
import { FreelancerEntity } from "../../domain/entities";

export const getInvitedFreelancersUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (
      jobId: string
    ): Promise<Array<{
      freelancer: FreelancerEntity;
      status: string;
    }> | null> => {
      return await repositories.getInvitedFreelancersRepository(jobId);
    },
  };
};
