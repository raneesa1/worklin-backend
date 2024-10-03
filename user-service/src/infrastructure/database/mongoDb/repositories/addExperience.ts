// src/infrastructure/database/mongoDb/repositories/addExperience.ts
import { Types } from "mongoose";
import { ExperienceModel } from "../model/experienceModel";
import { FreelancerModel } from "../model/freelancer";
import { IExperience } from "../../../../domain/entities";

export const addExperience = async (
  experience: IExperience,
  userId: string
): Promise<IExperience> => {
  try {
    const freelancer = await FreelancerModel.findById(userId);

    if (!freelancer) {
      throw new Error("Freelancer not found");
    }

    // Create new experience document
    const newExperience = new ExperienceModel(experience);
    const savedExperience = await newExperience.save();

    // Update freelancer's experience array
    freelancer.experience.push(savedExperience._id);
    await freelancer.save();

    // Type-safe conversion of the document to a plain object
    const experienceObject = savedExperience.toObject();

    // Ensure type safety when converting ObjectId to string
    const returnExperience: IExperience = {
      _id: experienceObject._id.toString(),
      userId: experienceObject.userId,
      title: experienceObject.title,
      company: experienceObject.company,
      jobLocation: experienceObject.jobLocation,
      country: experienceObject.country,
      startDate: experienceObject.startDate,
      endDate: experienceObject.endDate,
      description: experienceObject.description,
      startMonth: experienceObject.startMonth,
      startYear: experienceObject.startYear,
      endMonth: experienceObject.endMonth,
      endYear: experienceObject.endYear,
      isCurrentlyWorking: experienceObject.isCurrentlyWorking,
    };

    return returnExperience;
  } catch (error) {
    console.error("Error saving experience or updating freelancer:", error);
    throw new Error("Error saving experience or updating freelancer");
  }
};
