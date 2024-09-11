// src/application/useCases/createCategoryUseCase.ts
import { Category } from "../../domain/entities/category";
import { ICategoryRepository } from "../../domain/interface/ICreateCategoryRepository";
import { ICreateCategoryUseCase } from "../../domain/useCaseInterface/ICreateCategoryUseCase";
import { IDependencies } from "../interfaces/IDependencies";

export const createCategoryUseCase = (
  dependencies: IDependencies
): ICreateCategoryUseCase => {
  const { repositories } = dependencies;
  const { createCategory } = repositories;

  return {
    execute: async (categoryData: Category): Promise<Category> => {
      return await createCategory(categoryData);
    },
  };
};
