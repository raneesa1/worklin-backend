import { Types } from "mongoose";
import {
  clientEntity,
  FreelancerEntity,
  IExperience,
} from "../../../../domain/entities";
import { FreelancerModel } from "../model/freelancer";
import { ClientModel } from "../model/client";

export async function getClientByIdRepository(
  clientId: string
): Promise<clientEntity | null> {
  try {
    console.log(clientId, "consoling the freelancer id ");

    const client: clientEntity = await ClientModel.findById(clientId).exec();

    console.log(client, "consoling the freelancer");
    if (!client) {
      throw new Error("no user found with this id");
    }
    return client;
  } catch (error) {
    console.error("Error fetching clientEntity by userId:", error);
    throw new Error("Error fetching clientEntity"); 
  }
}
