import { IDependencies } from "../interfaces/IDependencies";
import { clientEntity, FreelancerEntity } from "../../domain/entities";

export const getAllClientsUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (): Promise<clientEntity[] | null> => {
      return await repositories.getAllClientsRepository();
    },
  };
};
