import { skillEntity } from "../../../../domain/entities/skillEntity";
import { SkillModel } from "../model/skillModel";
export async function findAllSkills(
  skip: number,
  limit: number
): Promise<skillEntity[]> {
  try {
    return await SkillModel.find().skip(skip).limit(limit).exec();
  } catch (error) {
    console.error("Error finding paginated skills:", error);
    throw error;
  }
}
