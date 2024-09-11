import { v2 as cloudinaryV2 } from "cloudinary";
import streamifier from "streamifier";

cloudinaryV2.config({
  cloud_name: "dmrb0zb2v",
  api_key: "441637814644333",
  api_secret: "cxn7W6OStatH7KfbZ3mCjiIORwQ",
});

export const uploadToCloudinary = (buffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinaryV2.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};
