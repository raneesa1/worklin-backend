import {
  IInviteFreelancer,
  invitedFreelancerStatus,
} from "../../../../domain/interface/IInviteFreelancer";
import { InviteFreelancerModel } from "../model/invitedFreelancersModel";
export const updateJobInviteRepository = async (
  jobPostId: string,
  freelancerId: string,
  status: invitedFreelancerStatus
):Promise<IInviteFreelancer> => {
  try {
    console.log("Params:", { jobPostId, freelancerId, status });

    const updatedJobInvite = await InviteFreelancerModel.findOneAndUpdate(
      { jobId: jobPostId, freelancerId: freelancerId },
      { status: status },
      { new: true }
    );

    console.log("Updated job invite:", updatedJobInvite);

    if (!updatedJobInvite) {
      console.log("Job invite not found");
      throw new Error("Job invite not found");
    }

    return updatedJobInvite;
  } catch (error) {
    console.error("Error updating job invite:", error);
    throw error;
  }
};