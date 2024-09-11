import { skillEntity } from "../../../../domain/entities/skillEntity";
import { SkillModel } from "../model/skillModel";

export async function findSkillById(id: string): Promise<skillEntity | null> {
  try {
    return await SkillModel.findById(id).exec();
  } catch (error) {
    console.error("Error finding skill by ID:", error);
    throw error;
  }
}
