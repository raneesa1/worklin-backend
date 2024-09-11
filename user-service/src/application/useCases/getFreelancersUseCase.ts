import { IDependencies } from "../../application/interfaces/IDependencies";
import { FreelancerEntity } from "../../domain/entities";

export const getFreelancersUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (): Promise<FreelancerEntity[] | null> => {
      return await repositories.getFreelancersRepository();
    },
  };
};
