import { IDependencies } from "../../application/interfaces/IDependencies";
import { skillEntity } from "../../domain/entities/skillEntity";
import { ICreateSkillUseCase } from "../../domain/useCaseInterface/IskillUserCase";

export const createSkillUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (skill: skillEntity): Promise<any> => {
      return await repositories.createSkill(skill);
    },
  };
};
