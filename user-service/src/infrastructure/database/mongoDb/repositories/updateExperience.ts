import { IExperience } from "../../../../domain/entities";
import { ExperienceModel } from "../model/experienceModel";

export async function updateExperience(
  id: string,
  data: Partial<IExperience>
): Promise<{ success: boolean }> {
  try {
    const experience = await ExperienceModel.findById(id);
    console.log(experience, "consoling the experience after finding with id");
    console.log(id, data);
    const updatedExperience = await ExperienceModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    ).exec();
    return { success: true };
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
}
