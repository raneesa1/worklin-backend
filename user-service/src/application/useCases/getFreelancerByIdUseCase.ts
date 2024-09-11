import { IDependencies } from "../../application/interfaces/IDependencies";
import { FreelancerEntity } from "../../domain/entities";

export const getFreelancerByIdUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (freelancerId: string): Promise<FreelancerEntity | null> => {
      return await repositories.getFreelancerByIdRepository(freelancerId);
    },
  };
};
