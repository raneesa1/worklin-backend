import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

import { IDependencies } from "../interfaces/IDependencies";
import { Readable } from "stream";
import { uploadToCloudinary } from "../../utils/cloudinary/uploadToCloudinary";

export const uploadResumeUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;

  return {
    execute: async (
      freelancerId: string,
      resumeUrl: string,
      publicId: string
    ): Promise<{
      success: boolean;
      url?: string;
      message?: string;
      publicId?: string;
    }> => {
      try {
        const saveResult = await repositories.uploadResumeRepository(
          freelancerId,
          resumeUrl,
          publicId
        );

        if (!saveResult.success) {
          throw new Error(saveResult.message);
        }

        return {
          success: true,
          url: saveResult.url,
          publicId: saveResult.publicId,
          message: saveResult.message,
        };
      } catch (error: any) {
        console.error("Error in uploadResumeUseCase:", error);
        return { success: false, message: error.message };
      }
    },
  };
};
