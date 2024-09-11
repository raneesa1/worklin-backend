import { IDependencies } from "../../application/interfaces/IDependencies";
import { IExperience } from "../../domain/entities";

export const deleteEducationUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (educationId: string): Promise<{ success: boolean }> => {
      try {
        const result = await repositories.deleteEducationById(educationId);
        return result;
      } catch (error: any) {
        throw new Error(`Error in deleteEducationUseCase: ${error.message}`);
      }
    },
  };
};
