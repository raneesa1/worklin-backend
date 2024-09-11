import { SkillModel } from "../model/skillModel";

export async function countAllSkills(): Promise<number> {
  try {
    return await SkillModel.countDocuments().exec();
  } catch (error) {
    console.error("Error counting all skills:", error);
    throw error;
  }
}
