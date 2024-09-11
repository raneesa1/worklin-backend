import { skillEntity } from "../entities/skillEntity";
import { JobPost } from "../interface/IJobPost";

export interface IGetJobPostByClientId {
  execute(clientId: string): Promise<JobPost[] | null>;
}
