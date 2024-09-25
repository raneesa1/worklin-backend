import { IDependencies } from "../../application/interfaces/IDependencies";
import { IJobOffer } from "../../domain/entities/jobOffer";
import { JobPost } from "../../domain/interface/IJobPost";

export const getJobOfferByFreelancerIdUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies; 

  return {
    execute: async (freelancerId: string): Promise<IJobOffer[] | null> => {
      return await repositories.getJobOfferByFreelancerIdRepository(freelancerId);
    },
  };
};
