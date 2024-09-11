import mongoose from "mongoose";
import { FreelancerModel } from "../model/freelancer";
import {
  Category,
  Skill,
  SubCategory,
} from "../../../../domain/interface/ICategory";
import { CategoryModel } from "../model/categoryModel";
import { SkillModel } from "../model/skillModel";

export async function saveFreelancerSkillsAndCategory(
  freelancerId: string,
  category: Category,
  subcategories: SubCategory[],
  skills: Skill[]
): Promise<void> {
  try {
    console.log(freelancerId, "consoling the freelancerId");
    console.log(category, "consoling the category");
    console.log(skills, "consoling the skills");
    console.log(subcategories, "consoling the subcategories");

    const freelancer = await FreelancerModel.findById(freelancerId);
    if (!freelancer) {
      console.log("no freelancer found");
      throw new Error("Freelancer not found");
    }

    // If the category doesn't exist, create it; otherwise, find it.
    let existingCategory = await CategoryModel.findById(category._id);
    if (!existingCategory) {
      existingCategory = new CategoryModel({
        _id: new mongoose.Types.ObjectId(category._id),
        name: category.name,
        description: category.description,
        subcategories: category.subcategories,
        skills: category.skills.map(
          (skillId) => new mongoose.Types.ObjectId(skillId)
        ),
      });
      await existingCategory.save();
    }

    const skillIds: mongoose.Types.ObjectId[] = [];
    for (const skill of skills) {
      let existingSkill = await SkillModel.findById(skill._id);
      if (!existingSkill) {
        console.log("No existing skill found, creating new skill:", skill);
        existingSkill = new SkillModel({
          _id: new mongoose.Types.ObjectId(skill._id),
          name: skill.name,
          description: skill.description,
        });
        await existingSkill.save();
      }
      // Convert _id to ObjectId if needed
      skillIds.push(
        typeof existingSkill._id === "string"
          ? new mongoose.Types.ObjectId(existingSkill._id)
          : existingSkill._id
      );
    }
    console.log(existingCategory, "consoling the existing category");

    freelancer.category = [existingCategory._id];
    freelancer.subCategory = subcategories;
    freelancer.skill = skillIds;

    await freelancer.save();
    console.log(freelancer, "consoling the freelancer");
  } catch (error) {
    console.error("Error saving freelancer data:", error);
    throw error;
  }
}
