// src/application/useCases/getAllCategoriesUseCase.ts
import { Category } from "../../domain/entities/category";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllCategoriesUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;
  return {
    execute: async (
      page: number,
      limit: number,
      search: string
    ): Promise<{ categories: Category[]; totalCount: number }> => {
      return await repositories.getAllCategories(page, limit, search);
    },
  };
};
