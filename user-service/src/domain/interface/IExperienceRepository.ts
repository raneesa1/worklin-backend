import { Document, ObjectId } from "mongoose";
import { IExperience } from "../useCaseInterface/Iexperience";

export interface IExperienceRepository {
  // Create a new experience entry
  execute(experience: IExperience): Promise<IExperience>;
}
