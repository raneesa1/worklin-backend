import { IDependencies } from "../../application/interfaces/IDependencies";
import { skillEntity } from "../../domain/entities/skillEntity";

export const updateSkillUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (
      id: string,
      skill: Partial<skillEntity>
    ): Promise<skillEntity | null> => {
      return await repositories.updateSkill(id, skill);
    },
  };
};
