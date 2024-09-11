import { IDependencies } from "../../application/interfaces/IDependencies";
import { IExperience } from "../../domain/entities";

export const getUserExperienceUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (id: string): Promise<any[] | null> => {
      return await repositories.findExperienceByUserId(id);
    },
  };
};
