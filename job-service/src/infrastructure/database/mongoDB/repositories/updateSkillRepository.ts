import { skillEntity } from "../../../../domain/entities/skillEntity";
import { SkillModel } from "../model/skillModel";

export async function updateSkill(
  id: string,
  skill: Partial<skillEntity>
): Promise<skillEntity | null> {
  try {
    return await SkillModel.findByIdAndUpdate(id, skill, { new: true }).exec();
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
}
