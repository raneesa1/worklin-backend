import { skillEntity } from "../../../../domain/entities/skillEntity";
import { SkillModel } from "../model/skillModel";

export async function deleteSkill(id: string): Promise<skillEntity | null> {
  try {
    return await SkillModel.findByIdAndDelete(id).exec();
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
}
