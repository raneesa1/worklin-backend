import { IJobInvites } from "../../../../domain/entities/IJobInvites";
import { FreelancerModel } from "../model/freelancer";
import { JobInvitesModel } from "../model/jobInvitesModel";

export async function jobInvitesRepository(
  inviteData: IJobInvites
): Promise<IJobInvites | null> {
  try {
    const newInvite = new JobInvitesModel(inviteData);
    const savedInvite = await newInvite.save();
    if (savedInvite && inviteData.freelancerId) {
      await FreelancerModel.findByIdAndUpdate(
        inviteData.freelancerId,
        { $push: { jobInvites: savedInvite._id } },
        { new: true, useFindAndModify: false }
      ).exec();
    }

    return savedInvite;
  } catch (error) {
    console.error("Error saving invite and updating freelancer:", error);
    throw error;
  }
}
