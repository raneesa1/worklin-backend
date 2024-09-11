import { IApplication } from "../interface/IApplication";
import { JobPost } from "../interface/IJobPost";

export interface IProcessJobApplicationUseCase {
  execute(
    applicationData: IApplication
  ): Promise<{ success: boolean; message: string }>;
}
