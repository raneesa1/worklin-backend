import { IDependencies } from "../../application/interfaces/IDependencies";
import { skillEntity } from "../../domain/entities/skillEntity";

export const getSkillByIdUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (id: string): Promise<skillEntity | null> => {
      return await repositories.findSkillById(id);
    },
  };
};
