import { BioData } from "../interface/IBioData";
import { IExperience } from "./Iexperience";

export interface ISetBioData {
  execute(data: BioData): Promise<{ success: boolean }>;
}
