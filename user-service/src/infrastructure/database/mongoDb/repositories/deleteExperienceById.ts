import { IExperience } from "../../../../domain/entities";
import { ExperienceModel } from "../model/experienceModel";

export async function deleteExperienceById(
  experienceId: string
): Promise<{ success: boolean }> {
  try {
    // Fetch experiences from the database by userId
    const result = await ExperienceModel.findByIdAndDelete(experienceId);
    if (!result) {
      throw new Error("Experience not found");
    }
    return { success: true };
  } catch (error) {
    console.error("Error fetching experiences by userId:", error);
    throw new Error("Error fetching experiences");
  }
}
