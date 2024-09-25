import { IDependencies } from "../../application/interfaces/IDependencies";
import { IJobOffer } from "../../domain/entities/jobOffer";
import { JobPost } from "../../domain/interface/IJobPost";

export const getJobOfferByClientIdUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (clientId: string): Promise<IJobOffer[] | null> => {
      return await repositories.getJobOfferByClientIdRepository(clientId);
    },
  };
};
