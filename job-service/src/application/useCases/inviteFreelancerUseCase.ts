import { IInviteFreelancer } from "../../domain/interface/IInviteFreelancer";
import { IInviteFreelancerUseCase } from "../../domain/useCaseInterface/IInviteFreelancerUseCase";
import { IDependencies } from "../interfaces/IDependencies";

export const inviteFreelancerUseCase = (
  dependencies: IDependencies
): IInviteFreelancerUseCase => {
  const { repositories } = dependencies;
  const { inviteFreelancerRepository } = repositories;
  return {
    execute: async (
      invitationData: IInviteFreelancer
    ): Promise<IInviteFreelancer | null> => {
      const inviteFreelancer = await inviteFreelancerRepository(invitationData);
      return inviteFreelancer;
    },
  };
};
