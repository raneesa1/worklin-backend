import { BioData } from "../interface/IBioData";
import { IExperience } from "../entities/Iexperience";

export interface ISetBioData {
  execute(data: BioData): Promise<{ success: boolean }>;
}
