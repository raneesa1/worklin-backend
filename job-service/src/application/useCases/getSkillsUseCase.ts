import { IDependencies } from "../../application/interfaces/IDependencies";
import { skillEntity } from "../../domain/entities/skillEntity";
import { IGetSkillsUseCase } from "../../domain/useCaseInterface/IskillUserCase";

export const getSkillsUseCase = (
  dependencies: IDependencies
): IGetSkillsUseCase => {
  const { repositories } = dependencies;

  return {
    execute: async (
      page: number,
      itemsPerPage: number
    ): Promise<{ skills: skillEntity[]; totalItems: number }> => {
      const skip = (page - 1) * itemsPerPage;
      const limit = itemsPerPage;
      const skills = await repositories.findAllSkills(skip, limit);
      const totalItems = await repositories.countAllSkills();

      return { skills, totalItems };
    },
  };
};