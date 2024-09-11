import { IDependencies } from "../../application/interfaces/IDependencies";
import { IExperience } from "../../domain/entities";

export const deleteUserExperienceUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (experienceId: string): Promise<{ success: boolean }> => {
      try {
        const result = await repositories.deleteExperienceById(experienceId);
        return result;
      } catch (error: any) {
        throw new Error(`Error in deleteExperienceUseCase: ${error.message}`);
      }
    },
  };
};
