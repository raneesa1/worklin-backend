import { FreelancerEntity } from "../entities";
import { IJobInvites } from "../entities/IJobInvites";

export interface IProcessInviteUseCase {
  execute(inviteData: IJobInvites): Promise<{
    success: boolean;
    message: string;
  }>;
}
