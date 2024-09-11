import { JobPost } from "../interface/IJobPost";

export interface IGetJobInvitesUseCase {
  execute(freelancerId: string): Promise<JobPost[] | null>;
}
