import { IEducation } from "../../../../domain/interface/IEducation";
import { EducationModel } from "../model/educationModel";
import { FreelancerModel } from "../model/freelancer";

export const addEducation = async (
  education: IEducation,
  userId: string // Pass the userId to update the freelancer's education array
): Promise<IEducation | null> => {
  try {
    const freelancer = await FreelancerModel.findById(userId);

    if (!freelancer) {
      throw new Error("Freelancer not found");
    }
    // Save the new education
    const newEducation = new EducationModel(education);
    await newEducation.save();
    freelancer.education.push(newEducation._id);
    await freelancer.save();

    console.log(freelancer.education);
    return newEducation.toObject() as IEducation;
  } catch (error) {
    console.error("Error saving education or updating freelancer:", error);
    throw new Error("Error saving education or updating freelancer");
  }
};
