import { EducationModel } from "../model/educationModel";
import { ExperienceModel } from "../model/experienceModel";

export async function deleteEducationById(
  educationId: string
): Promise<{ success: boolean }> {
  try {
    // Fetch experiences from the database by userId
    const result = await EducationModel.findByIdAndDelete(educationId);
    if (!result) {
      throw new Error("education not found");
    }
    return { success: true };
  } catch (error) {
    console.error("Error fetching education by userId:", error);
    throw new Error("Error fetching education");
  }
}
