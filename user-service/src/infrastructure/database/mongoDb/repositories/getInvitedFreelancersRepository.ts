import { FreelancerEntity, IExperience } from "../../../../domain/entities";
import { FreelancerModel } from "../model/freelancer";
import { JobInvitesModel } from "../model/jobInvitesModel";

export async function getInvitedFreelancersRepository(
  jobId: string
): Promise<Array<{ freelancer: FreelancerEntity; status: string }> | null> {
  try {
    const jobInvites = await JobInvitesModel.find({ jobId }).exec();
    if (!jobInvites.length) {
      return []; // No invites found for this job
    }

    // Step 2: Get the list of freelancerIds from the job invites
    const freelancerIds = jobInvites.map((invite) => invite.freelancerId);

    // Step 3: Fetch freelancer details based on freelancerIds
    const freelancers = await FreelancerModel.find({
      _id: { $in: freelancerIds },
    })
      .populate("category skill experience education languages address") // Populate any necessary fields
      .exec();

    // Step 4: Map freelancers and invitation statuses together
    const invitedFreelancers = freelancers.map((freelancer) => {
      const invite = jobInvites.find(
        (inv) => inv.freelancerId.toString() === freelancer._id.toString()
      );
      return {
        freelancer,
        status: invite?.status ?? "Unknown", // Add status from the invite, default to "Unknown"
      };
    });

    return invitedFreelancers;
  } catch (error) {
    console.error("Error fetching invited freelancers:", error);
    throw new Error("Error fetching invited freelancers");
  }
}
