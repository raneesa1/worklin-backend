import { IDependencies } from "../../application/interfaces/IDependencies";
import { clientEntity, FreelancerEntity } from "../../domain/entities";

export const getClientByIdUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (clientId: string): Promise<clientEntity | null> => {
      return await repositories.getClientByIdRepository(clientId);
    },
  };
};
