// src/infrastructure/database/mongoDB/repositories/categoryRepository.ts
import {
  IJobOffer,
  paymentOption,
  paymentType,
} from "../../../../domain/entities/jobOffer";
import { MileStoneModel } from "../model/mileStoneModel";
import { JobOfferModel } from "../model/jobOfferModel";
export const createJobOfferRepository = async (
  jobOfferData: IJobOffer
): Promise<IJobOffer> => {
  try {
    if (jobOfferData.paymentOption === paymentOption.mileStone) {
      if (Array.isArray(jobOfferData.mileStone)) {
        const mileStones = await Promise.all(
          jobOfferData.mileStone.map((ms) => new MileStoneModel(ms).save())
        );
        console.log(mileStones, "consoling the mile stones");

        // Store all milestone IDs instead of just the first one
        jobOfferData.mileStone = mileStones.map((ms) => ms._id);
      } else {
        throw new Error(
          "Milestone data should be an array for milestone-based payments"
        );
      }
    }

    if (jobOfferData.paymentType === paymentType.hourly) {
      // Ensure hourlyRate and numberOfHours are set

      if (!jobOfferData.hourlyRate || !jobOfferData.numberOfHours) {
        throw new Error(
          "Hourly rate and number of hours are required for hourly payment type"
        );
      }
      // Calculate total amount
      jobOfferData.totalAmount =
        jobOfferData.hourlyRate * jobOfferData.numberOfHours;
    } else if (jobOfferData.paymentType === paymentType.fixed) {
      // Ensure totalAmount is set

      if (!jobOfferData.totalAmount) {
        throw new Error("Total amount is required for fixed payment type");
      }
    }

    const newJobOffer = new JobOfferModel(jobOfferData);
    console.log(newJobOffer, "consoling the new job offer");
    const savedJobOffer = await newJobOffer.save();
    console.log(savedJobOffer, "consoling the saved job offer");
    return savedJobOffer.toObject();
  } catch (error) {
    console.error("Error in creating job offer:", error);
    throw error;
  }
};
