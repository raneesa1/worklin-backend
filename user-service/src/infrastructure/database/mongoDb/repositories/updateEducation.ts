
import { IEducation } from "../../../../domain/interface/IEducation";
import { EducationModel } from "../model/educationModel";

export async function updateEducation(
  id: string,
  data: Partial<IEducation>
): Promise<IEducation | null> {
  try {
    const education = await EducationModel.findById(id)
    console.log(education,'consoling the education after finding with id')
    console.log(id,data)
    return await EducationModel.findByIdAndUpdate(id, data, { new: true }).exec();

  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
}
