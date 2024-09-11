import { JobPost } from "../interface/IJobPost";

export interface IJobPostUseCase {
  execute(jobPost: JobPost): Promise<JobPost>;
}
