import { JobPostModel } from "../model/job-post.model"; // Path to your JobPostModel
import { JobPost } from "../../../../domain/interface/IJobPost";
import { InviteFreelancerModel } from "../model/invitedFreelancersModel";
import { IJobOffer } from "../../../../domain/entities/jobOffer";
import { JobOfferModel } from "../model/jobOfferModel";
import { Types } from "mongoose";

export async function getJobOfferByClientIdRepository(
  clientId: string
): Promise<IJobOffer[] | null> {
  try {
    console.log(clientId, "consoling the clientId if from the repo");
    const jobOffers = await JobOfferModel.find({
      clientId: new Types.ObjectId(clientId),
    })
      .populate("mileStone")
      .exec();

    console.log(jobOffers, "consoling the job offer of clientId", clientId);

    return jobOffers as IJobOffer[];
  } catch (error) {
    console.error("Error fetching job invites for clientId:", error);
    throw error;
  }
}
