import { IInviteFreelancer } from "../interface/IInviteFreelancer";

export interface IInviteFreelancerUseCase {
  execute(invitationData: IInviteFreelancer): Promise<IInviteFreelancer | null>;
}
