import { IExperience } from "../../../../domain/entities";
import { IEducation } from "../../../../domain/interface/IEducation";
import { EducationModel } from "../model/educationModel";

export async function getEducation(userId: string): Promise<any[] | null> {
  try {
    // Fetch experiences from the database by userId
    const education: any[] = await EducationModel.find({
      userId,
    }).exec();
    return education ;
  } catch (error) {
    console.error("Error fetching experiences by userId:", error);
    throw new Error("Error fetching experiences");
  }
}
