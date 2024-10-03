import { getJobOfferById } from "../database/mongoDB/repositories/getJobOfferByIdRepository";
import { getChannel } from "./rabbit.config";

export async function processJobOffer(content: any) {
  const jobOffer = await getJobOfferById(content.offerId);

  if (jobOffer) {
    const hireInfo = {
      clientId: jobOffer.clientId,
      freelancerId: jobOffer.freelancerId,
      jobDetails: {
        title: jobOffer.title,
        description: jobOffer.description,
        totalAmount: jobOffer.totalAmount,
      },
    };
    console.log(
      hireInfo,
      "consoling the hire info from job service to the user service"
    );

    const channel = getChannel();
    if (channel) {
      channel.publish(
        "jobServiceExchange",
        "hire.info",
        Buffer.from(JSON.stringify(hireInfo))
      );
      console.log(
        `Hire info sent to user service: ${JSON.stringify(hireInfo)}`
      );
    }
  }
}
