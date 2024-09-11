import { BioData } from "../../../../domain/interface/IBioData";
import { FreelancerModel } from "../model/freelancer";
import { languageModel } from "../model/languages";

export async function setRateBioLanguageRepository(
  data: BioData
): Promise<{ success: boolean }> {
  try {
    // Step 1: Create or update language documents and collect their IDs
    const languageIds = await Promise.all(
      data.languages.map(async (lang) => {
        // Find existing language or create a new one
        let language = await languageModel
          .findOne({
            userId: data.userId,
            language: lang.language,
            proficiency: lang.proficiency,
          })
          .exec();

        if (!language) {
          language = new languageModel({
            userId: data.userId,
            language: lang.language,
            proficiency: lang.proficiency,
          });
          await language.save();
        }

        return language._id;
      })
    );

    // Step 2: Update the freelancer's data
    const updateResult = await FreelancerModel.findByIdAndUpdate(
      data.userId,
      {
        $set: {
          bio: data.bio,
          hourlyRate: data.hourlyRate,
          serviceRate: data.serviceRate,
        },
        $addToSet: {
          // Ensure languages are added without duplicates
          languages: { $each: languageIds },
        },
      },
      { new: true } // Return the updated document
    ).exec();

    // Check if the update was successful
    if (updateResult) {
      return { success: true }; // Return success object
    } else {
      console.warn("No freelancer found with the provided ID.");
      return { success: false };
    }
  } catch (error) {
    console.error("Error saving bio data to database:", error);
    throw error;
  }
}
