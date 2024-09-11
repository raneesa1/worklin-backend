import { IExperience } from "../../../../domain/entities";
import { ExperienceModel } from "../model/experienceModel";

export async function findExperienceByUserId(userId: string): Promise<any[]> {
  try {
    // Fetch experiences from the database by userId
    const experiences: any[] = await ExperienceModel.find({
      userId: userId,
    }).exec();
    
    console.log(experiences, "consoling the experience");
    return experiences;
  } catch (error) {
    console.error("Error fetching experiences by userId:", error);
    throw new Error("Error fetching experiences");
  }
}
