import { FreelancerEntity } from "../../../../domain/entities";
import { HireModel } from "../model/hireModel";

export async function getJobOfferHiresRepository(
  jobId: string
): Promise<Array<{ freelancer: FreelancerEntity }>> {
  try {
    const jobHires = await HireModel.find({ "jobDetails.jobOfferId": jobId })
      .populate("freelancer")
      .lean()
      .exec();

    if (!jobHires.length) {
      return [];
    }

    return jobHires.map((hire) => ({
      freelancer: hire.freelancer as FreelancerEntity,
    }));
  } catch (error) {
    console.error("Error fetching hired freelancers:", error);
    throw new Error("Error fetching hired freelancers");
  }
}
