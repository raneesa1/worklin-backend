import { IDependencies } from "../../application/interfaces/IDependencies";
import { JobPost } from "../../domain/interface/IJobPost";

export const getJobInvitesUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies; // Make sure repositories is included in IDependencies

  return {
    execute: async (freelancerId: string): Promise<JobPost[]|null> => {
      return await repositories.getJobInvitesRepository(freelancerId);
    },
  };
};
