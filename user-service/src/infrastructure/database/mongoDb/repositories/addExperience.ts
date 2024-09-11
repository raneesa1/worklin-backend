import { IExperience } from "../../../../domain/entities";
import { ExperienceModel } from "../model/experienceModel";
import { FreelancerModel } from "../model/freelancer";

export const addExperience = async (
  experience: IExperience,
  userId: string // Pass the userId to update the freelancer's experience array
): Promise<IExperience | null> => {
  try {
    const freelancer = await FreelancerModel.findById(userId);

    if (!freelancer) {
      throw new Error("Freelancer not found");
    }
    // Save the new experience
    const newExperience = new ExperienceModel(experience);
    await newExperience.save();
    freelancer.experience.push(newExperience._id);
    await freelancer.save();

    return newExperience.toObject() as IExperience;
  } catch (error) {
    console.error("Error saving experience or updating freelancer:", error);
    throw new Error("Error saving experience or updating freelancer");
  }
};
