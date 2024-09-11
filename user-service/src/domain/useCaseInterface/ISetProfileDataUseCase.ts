import { BioData } from "../interface/IBioData";
import { IProfileData } from "../interface/IProfileData";
import { IExperience } from "./Iexperience";

export interface ISetProfileDataUseCase {
  execute(profileData: IProfileData): Promise<{ success: boolean }>;
}
