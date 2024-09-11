import { skillEntity } from "../../../../domain/entities/skillEntity";
import { SkillModel } from "../model/skillModel";

export async function createSkill(skill: skillEntity): Promise<skillEntity> {
  try {
    const newSkill = new SkillModel(skill);
    return await newSkill.save();
  } catch (error) {
    console.error("Error creating skill:", error);
    throw error;
  }
}
