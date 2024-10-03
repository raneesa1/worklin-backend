import { ClientModel } from "../model/client";
import { FreelancerModel } from "../model/freelancer";
import { HireModel } from "../model/hireModel";

export async function updateClientInRepository(
  clientId: string,
  freelancerId: string,
  jobDetails: any
) {
  // Step 1: Find the client by their ID
  const client = await ClientModel.findById(clientId);
  if (!client) {
    throw new Error("Client not found");
  }

  // Step 2: Find the freelancer by their ID
  const freelancer = await FreelancerModel.findById(freelancerId);
  if (!freelancer) {
    throw new Error("Freelancer not found");
  }

  // Step 3: Create a new Hire document with freelancer's details and jobDetails
  const hire = new HireModel({
    client: clientId,
    freelancer: freelancerId,
    jobDetails,
    freelancerName: freelancer.firstName, // You can customize the structure of this object
    hireDate: new Date(),
  });

  // Step 4: Save the Hire document
  await hire.save();

  client.hires.push(hire._id);

  await client.save();

  return {
    message: "Hire successfully created and added to client",
    hire,
  };
}
