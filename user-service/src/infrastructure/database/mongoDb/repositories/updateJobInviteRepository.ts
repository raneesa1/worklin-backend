import { FreelancerEntity } from "../../../../domain/entities";
import {
  IJobInvites,
  JobInvitesStatus,
} from "../../../../domain/entities/IJobInvites";
import { FreelancerModel } from "../model/freelancer";
import { JobInvitesModel } from "../model/jobInvitesModel";

export const updateJobInviteRepository = async (
  userId: string,
  jobPostId: string,
  status: JobInvitesStatus
): Promise<FreelancerEntity | null> => {
  try {
    const freelancer = await FreelancerModel.findById(userId).populate(
      "jobInvites"
    );
    if (!freelancer) {
      throw new Error("Freelancer not found");
    }

    const jobInvite = await JobInvitesModel.findOne({
      freelancerId: userId,
      jobId: jobPostId,
    });

    if (!jobInvite) {
      throw new Error("Job invite not found");
    }

    if (!Object.values(JobInvitesStatus).includes(status)) {
      throw new Error("Invalid status provided");
    }

    jobInvite.status = status;
    await jobInvite.save();

    if (status === JobInvitesStatus.accepted) {
      if (freelancer.token <= 0) {
        throw new Error("Insufficient tokens to apply for the job");
      }

      // Apply for the job
      if (!freelancer.appliedJobs.includes(jobPostId)) {
        freelancer.appliedJobs.push(jobPostId);
        freelancer.token -= 1;

        await FreelancerModel.findByIdAndUpdate(
          userId,
          {
            $inc: { token: -1 },
            $push: { appliedJobs: jobPostId },
          },
          { new: true }
        );
      }
    }

    // If rejected, we don't need to do anything additional

    await freelancer.save();

    return freelancer;
  } catch (error) {
    console.error("Error updating job invite or freelancer:", error);
    throw new Error("Error updating job invite or freelancer");
  }
};
