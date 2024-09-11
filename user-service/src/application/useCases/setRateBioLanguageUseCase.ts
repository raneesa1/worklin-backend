import { IDependencies } from "../../application/interfaces/IDependencies";
import { IExperience } from "../../domain/entities";
import { BioData } from "../../domain/interface/IBioData";

export const setRateBioLanguageUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (data: BioData): Promise<{ success: boolean }> => {
      return await repositories.setRateBioLanguageRepository(data);
    },
  };
};
