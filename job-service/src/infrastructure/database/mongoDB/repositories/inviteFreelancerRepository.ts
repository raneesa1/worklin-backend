// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts
import { skillEntity } from "../../../../domain/entities/skillEntity";
import { IInviteFreelancer } from "../../../../domain/interface/IInviteFreelancer";
import { JobPost } from "../../../../domain/interface/IJobPost";
import { sendInvitationToQueue } from "../../../rabbitMq/sendInvitationToQueue";
import { CategoryModel } from "../model/categoryModel";
import { InviteFreelancerModel } from "../model/invitedFreelancersModel";
import { JobPostModel } from "../model/job-post.model";

export const inviteFreelancerRepository = async (
  invitationData: IInviteFreelancer
): Promise<IInviteFreelancer | null> => {
  try {
    const { clientId, freelancerId, jobId, description, clientName } =
      invitationData;

    // Create a new instance of the InviteFreelancerModel with the destructured data
    const newInvitation = new InviteFreelancerModel({
      clientId,
      freelancerId,
      jobId,
      description,
      clientName
    });
    const savedInvitation = await newInvitation.save();

    if (!savedInvitation) {
      return null;
    }

    await JobPostModel.updateOne(
      { _id: invitationData.jobId },
      { $push: { invitedFreelancers: savedInvitation._id } }
    );
    await sendInvitationToQueue(savedInvitation);
    return savedInvitation;
  } catch (error) {
    console.error("Error fetching skills by category ID:", error);
    throw error;
  }
};
