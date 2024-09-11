// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts
import { skillEntity } from "../../../../domain/entities/skillEntity";
import { CategoryModel } from "../model/categoryModel";

export const getSkillByCategoryId = async (
  categoryId: string
): Promise<skillEntity[] | null> => {
  try {
   const category = await CategoryModel.findById(categoryId)
     .populate("skills") // Populate the skills field
     .lean()
     .exec();

   if (!category) {
     return null;
   }

   // Cast skills to the correct type
   const skills: skillEntity[] = category.skills as any[];
   return skills;
  } catch (error) {
    console.error("Error fetching skills by category ID:", error);
    throw error;
  }
};
