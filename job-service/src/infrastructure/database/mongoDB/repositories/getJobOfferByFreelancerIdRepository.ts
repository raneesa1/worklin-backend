import { JobPostModel } from "../model/job-post.model"; // Path to your JobPostModel
import { JobPost } from "../../../../domain/interface/IJobPost";
import { InviteFreelancerModel } from "../model/invitedFreelancersModel";
import { IJobOffer } from "../../../../domain/entities/jobOffer";
import { JobOfferModel } from "../model/jobOfferModel";

export async function getJobOfferByFreelancerIdRepository(
  freelancerId: string
): Promise<IJobOffer[] | null> {
  try {
    console.log(freelancerId,'consoling the freelancer if from the repo')
   const jobOffers = await JobOfferModel.find({ freelancerId: freelancerId })
     .populate("mileStone")
     .exec();

    console.log(
      jobOffers,
      "consoling the job offer of freelancer",
      freelancerId
    );

    return jobOffers as IJobOffer[];
  } catch (error) {
    console.error("Error fetching job invites for freelancer:", error);
    throw error;
  }
}
