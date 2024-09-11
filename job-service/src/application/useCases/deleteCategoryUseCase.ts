// deleteSkillUseCase.ts
import { IDependencies } from "../../application/interfaces/IDependencies";
import { Category } from "../../domain/entities/category";

export const deleteCategoryUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (id: string): Promise<boolean> => {
      try {
        const result = await repositories.deleteCategory(id);
        return result;
      } catch (error: any) {
        throw new Error(`Error in deleteCategoryUseCase: ${error.message}`);
      }
    },
  };
};
