// deleteSkillUseCase.ts
import { IDependencies } from "../../application/interfaces/IDependencies";
import { skillEntity } from "../../domain/entities/skillEntity";

export const deleteSkillUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (id: string): Promise<skillEntity | null> => {
      return await repositories.deleteSkill(id); // Corrected repository call
    }
  };
};
