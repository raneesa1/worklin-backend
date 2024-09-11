import { skillEntity } from "../entities/skillEntity";
import { JobPost } from "../interface/IJobPost";

export interface IGetJobPostUseCase {
  execute(): Promise<JobPost[]>;
}
