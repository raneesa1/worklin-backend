// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts
import { Category } from "../../../../domain/entities/category";
import { CategoryModel } from "../model/categoryModel";

export const createCategory = async (category: Category): Promise<Category> => {
  try {
    const newCategory = new CategoryModel(category);
    return await newCategory.save();
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
