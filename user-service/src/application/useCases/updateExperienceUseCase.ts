import { IDependencies } from "../interfaces/IDependencies";
import { IExperience } from "../../domain/entities";

export const updateExperienceUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (
      id: string,
      experience: Partial<IExperience>,
      userId: string
    ): Promise<{ success: boolean }> => {
      const result = await repositories.updateExperience(
        id,
        experience,
        userId
      );

      return { success: true };
    },
  };
};
