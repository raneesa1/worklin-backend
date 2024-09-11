import { JobPostModel } from "../model/job-post.model"; // Path to your JobPostModel
import { JobPost } from "../../../../domain/interface/IJobPost";
import { InviteFreelancerModel } from "../model/invitedFreelancersModel";

export async function getJobInvitesRepository(
  freelancerId: string
): Promise<JobPost[]> {
  try {
    const invites = await InviteFreelancerModel.find({ freelancerId });
    const jobIds = invites.map((invite) => invite.jobId);

    // Find the job posts that correspond to these invites
    const jobPosts = await JobPostModel.find({ _id: { $in: jobIds } })
      .populate("skills")
      .populate({
        path: "invitedFreelancers",
        match: { freelancerId: freelancerId }, // Filter invitedFreelancers by freelancerId
        select: "clientId jobId clientName description status requestedAt", // Fields you want to include
      })
      .exec();

    return jobPosts as JobPost[];
  } catch (error) {
    console.error("Error fetching job invites for freelancer:", error);
    throw error;
  }
}
