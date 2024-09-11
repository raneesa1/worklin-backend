import { skillEntity } from "../entities/skillEntity";
import { JobPost } from "../interface/IJobPost";

export interface IGetJobPostById {
  execute(jobPostId: string): Promise<JobPost | null>;
}
