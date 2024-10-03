import { updateClientInRepository } from "../../infrastructure/database/mongoDb/repositories/updateClientWithNewHireRepository";

export async function updateClientWithNewHire(hireInfo: any) {
  try {
    await updateClientInRepository(
      hireInfo.clientId,
      hireInfo.freelancerId,
      hireInfo.jobDetails
    );
    console.log(`Client updated with new hire: ${JSON.stringify(hireInfo)}`);
    // Optionally, send a confirmation message
  } catch (error) {
    console.error("Error updating client with new hire:", error);
    // Handle the error
  }
}
