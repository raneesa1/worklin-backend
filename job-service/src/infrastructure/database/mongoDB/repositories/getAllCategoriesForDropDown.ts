// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts

import { Category } from "../../../../domain/entities/category";
import { CategoryModel } from "../model/categoryModel";

export const getAllCategoriesForDropDown = async (): Promise<Category[]> => {
  try {
    return await CategoryModel.find().lean().exec();
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw error;
  }
};
