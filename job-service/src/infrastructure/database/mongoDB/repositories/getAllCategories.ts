// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts
import { Category } from "../../../../domain/entities/category";
import { CategoryModel } from "../model/categoryModel";

export const getAllCategories = async (
  page: number,
  limit: number,
  search: string
): Promise<{ categories: Category[]; totalCount: number }> => {
  try {
    const skip = (page - 1) * limit;

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const [categories, totalCount] = await Promise.all([
      CategoryModel.find(query).skip(skip).limit(limit).lean().exec(),
      CategoryModel.countDocuments(query),
    ]);

    return { categories, totalCount };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
