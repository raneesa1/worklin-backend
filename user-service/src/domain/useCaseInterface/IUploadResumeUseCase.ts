import { IDependencies } from "../../application/interfaces/IDependencies";
import { IEducation } from "../interface/IEducation";

export interface IUploadResumeUseCase {
  execute(
    freelancerId: string,
    resumeUrl: string,
    publicId: string
  ): Promise<{
    success: boolean;
    url?: string;
    message?: string;
    publicId?: string;
  }>;
}
