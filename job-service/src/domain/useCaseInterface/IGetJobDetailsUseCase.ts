import { JobPost } from "../interface/IJobPost";

export interface IGetJobDetailsUseCase {
  execute(jobId: string[]): Promise<JobPost[]>;
}
