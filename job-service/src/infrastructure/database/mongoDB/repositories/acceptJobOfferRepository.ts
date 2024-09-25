// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts
import { error } from "console";
import { IJobOffer, offerStatus } from "../../../../domain/entities/jobOffer";
import { JobOfferModel } from "../model/jobOfferModel";

export const acceptJobOfferRepository = async (
  jobOfferId: string,
  status: offerStatus
): Promise<IJobOffer> => {
  try {
    const jobOffer = await JobOfferModel.findById(jobOfferId);

    if (!jobOffer) {
      throw new Error("no job offer found");
    }
    if (status === offerStatus.accepted) {
      jobOffer.offerStatus = offerStatus.accepted;
      jobOffer.expiresAt = new Date(
        +new Date() + 100 * 365 * 24 * 60 * 60 * 1000
      ); // 100 years in the future
      jobOffer.isActive = true; // Assuming an accepted job offer is considered active
    } else if (status === offerStatus.rejected) {
      jobOffer.offerStatus = offerStatus.rejected;
      jobOffer.expiresAt = new Date(
        +new Date() + 100 * 365 * 24 * 60 * 60 * 1000
      ); // 100 years in the future
    }

    await jobOffer.save(); // Save the updated job offer

    return jobOffer;
  } catch (error) {
    console.error("Error updating job post with application:", error);
    throw error;
  }
};
