// src/application/useCases/getSkillByCategoryIdUseCase.ts
import { skillEntity } from "../../domain/entities/skillEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const getSkillByCategoryIdUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;
  return {
    execute: async (categoryId: string): Promise<skillEntity[] | null> => {
      return await repositories.getSkillByCategoryId(categoryId);
    },
  };
};
