import { IDependencies } from "../interfaces/IDependencies";
import { IJobOffer } from "../../domain/entities/jobOffer";

export const createJobOfferUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createJobOfferRepository },
  } = dependencies;

  return {
    execute: async (jobOfferData: IJobOffer): Promise<IJobOffer> => {
      return await createJobOfferRepository(jobOfferData);
    },
  };
};
