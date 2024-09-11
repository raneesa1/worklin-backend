import { AdminModel } from "../model/adminModel";
import { ClientModel } from "../model/client"; // Adjust path accordingly
import { FreelancerModel } from "../model/freelancer"; // Adjust path accordingly

export async function saveUserToDb(userData: any): Promise<void> {
  try {
    console.log(userData,'consoling the user data from the repo of user serviceeeeeeeeeeeeeeeeeeee>>>>>>>>>>>>>>')
    // Assuming userData has the necessary fields to create a user
     if (userData.accountType === "client") {
       await ClientModel.create(userData);
       console.log("Client data saved to database:", userData);
     } else if (userData.accountType === "freelancer") {
       await FreelancerModel.create(userData);
       console.log("Freelancer data saved to database:", userData);
     } else if (userData.accountType === "admin") {
       await AdminModel.create(userData);
       console.log("Freelancer data saved to database:", userData);
     }
  } catch (error) {
    console.error("Error saving user data to database:", error);
    throw error;
  }
}
