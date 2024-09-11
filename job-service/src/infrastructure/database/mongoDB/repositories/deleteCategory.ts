import { skillEntity } from "../../../../domain/entities/skillEntity";
import { CategoryModel } from "../model/categoryModel";
import { SkillModel } from "../model/skillModel";

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    const result = await CategoryModel.findByIdAndDelete(id).exec();
    if(result){
        return true
    }
    return false
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
}
