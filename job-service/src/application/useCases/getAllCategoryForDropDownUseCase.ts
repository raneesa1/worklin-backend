// src/application/useCases/getAllCategoriesUseCase.ts

import { Category } from "../../domain/entities/category";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllCategoryForDropDownUseCase = (
  dependencies: IDependencies
) => {
  const { repositories } = dependencies;
  return {
    execute: async (): Promise<Category[]> => {
      return await repositories.getAllCategoriesForDropDown();
    },
  };
};
