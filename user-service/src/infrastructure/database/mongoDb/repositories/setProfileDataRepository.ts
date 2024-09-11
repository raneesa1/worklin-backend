import { BioData } from "../../../../domain/interface/IBioData";
import { IProfileData } from "../../../../domain/interface/IProfileData";
import { FreelancerModel } from "../model/freelancer";
import { languageModel } from "../model/languages";

export async function setProfileDataRepository(
  profileData: IProfileData
): Promise<{ success: boolean }> {
  try {
    const { goal, userId, experience } = profileData;

    const freelancer = await FreelancerModel.findById(userId);
    if (!freelancer) {
      return { success: false };
    }

    // Update the freelancer's goal and experience
    freelancer.freelancingGoal = goal;
    freelancer.freelancedBefore = experience; // Assuming experience is an array of ObjectId

    // Save the updated freelancer document
    await freelancer.save();

    return { success: true };
  } catch (error) {
    console.error("Error saving bio data to database:", error);
    throw error;
  }
}
