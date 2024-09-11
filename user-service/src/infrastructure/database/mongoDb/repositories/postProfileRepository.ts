import mongoose, { ObjectId } from "mongoose";
import { FreelancerModel } from "../model/freelancer";
import { FreelancerEntity } from "../../../../domain/entities/freelancerEntity";
import { ExperienceModel } from "../model/experienceModel";
import { EducationModel } from "../model/educationModel";
import { AddressModel } from "../model/addressModel";
import { SkillModel } from "../model/skillModel";
import { CategoryModel } from "../model/categoryModel";
import { languageModel } from "../model/languages";
import { skillEntity } from "../../../../domain/entities/skillEntity";

// Assuming FreelancerEntity has _id, which is a string or mongoose.Types.ObjectId
export async function postProfileRepository(
  freelancer: FreelancerEntity
): Promise<FreelancerEntity> {
  if (!freelancer._id) {
    throw new Error("Freelancer ID is required");
  }

  try {
    // Process referenced documents
    if (freelancer.experience) {
      await Promise.all(
        freelancer.experience.map(async (exp: any) => {
          if (exp._id) {
            await ExperienceModel.findByIdAndUpdate(exp._id, exp, {
              new: true,
            }).exec();
          } else {
            await ExperienceModel.create(exp);
          }
        })
      );
    }

    if (freelancer.education) {
      await Promise.all(
        freelancer.education.map(async (edu: any) => {
          if (edu._id) {
            await EducationModel.findByIdAndUpdate(edu._id, edu, {
              new: true,
            }).exec();
          } else {
            await EducationModel.create(edu);
          }
        })
      );
    }

    if (freelancer.languages) {
      const languageIds = await Promise.all(
        freelancer.languages.map(async (lang: any) => {
          if (lang._id) {
            // Update existing language document
            const updatedLanguage = await languageModel
              .findByIdAndUpdate(lang._id, lang, { new: true })
              .exec();
            return updatedLanguage._id;
          } else {
            // Create new language document
            const newLanguage = await languageModel.create(lang);
            return newLanguage._id;
          }
        })
      );

      // Replace the languages array with the array of ObjectIds
      freelancer.languages = languageIds;
    }

    if (freelancer.address) {
      await Promise.all(
        freelancer.address.map(async (addr: any) => {
          if (addr._id) {
            await AddressModel.findByIdAndUpdate(addr._id, addr, {
              new: true,
            }).exec();
          } else {
            await AddressModel.create(addr);
          }
        })
      );
    }

    if (freelancer.skill) {
      await Promise.all(
        freelancer.skill.map(async (skill: any) => {
          if (skill._id) {
            await SkillModel.findByIdAndUpdate(skill._id, skill, {
              new: true,
            }).exec();
          } else {
            await SkillModel.create(skill);
          }
        })
      );
    }

    if (freelancer.category) {
      await Promise.all(
        freelancer.category.map(async (cat: any) => {
          if (cat._id) {
            await CategoryModel.findByIdAndUpdate(cat._id, cat, {
              new: true,
            }).exec();
          } else {
            await CategoryModel.create(cat);
          }
        })
      );
    }

    // Update the main freelancer document
    const updatedFreelancer = await FreelancerModel.findByIdAndUpdate(
      freelancer._id,
      { ...freelancer, isProfileCompleted: true },
      { new: true }
    ).exec();

    if (!updatedFreelancer) {
      console.warn(`Freelancer with ID ${freelancer._id} not found`);
      throw new Error("Freelancer not found");
    }

    console.info("Freelancer updated successfully:", updatedFreelancer);
    return updatedFreelancer;
  } catch (error: any) {
    console.error("Error updating freelancer data:", error);
    throw new Error(`Error updating freelancer data: ${error.message}`);
  }
}
