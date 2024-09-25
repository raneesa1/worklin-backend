import { clientEntity } from "../../../../domain/entities";
import { ClientModel } from "../model/client";

export async function getAllClientsRepository(): Promise<
  clientEntity[] | null
> {
  try {
    const clients: clientEntity[] = await ClientModel.find().exec();

    return clients;
  } catch (error) {
    console.error("Error fetching clients :", error);
    throw new Error("Error fetching experiences");
  }
}
