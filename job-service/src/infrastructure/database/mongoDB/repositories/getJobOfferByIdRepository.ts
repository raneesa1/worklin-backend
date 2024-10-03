import { IJobOffer } from "../../../../domain/entities/jobOffer";
import { JobOfferModel } from "../model/jobOfferModel";

export async function getJobOfferById(
  offerId: string
): Promise<IJobOffer | null> {
  try {
    const jobOffer = await JobOfferModel.findById(offerId).populate([
      { path: "mileStone", model: "MileStone" }, // Populate milestone data if needed
    ]);
    if (!jobOffer) {
      return null;
    }
    return jobOffer;
  } catch (error) {
    console.error(`Error fetching job offer with ID ${offerId}:`, error);
    return null;
  }
}
