import { Request, Response, NextFunction, RequestHandler } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const resumeController = (
  dependencies: IDependencies
): RequestHandler => {
  const {
    useCases: { uploadResumeUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { url, freelancerId, publicId } = req.body;
      console.log(url, freelancerId, publicId, "======??????");

      const response = await uploadResumeUseCase(dependencies).execute(
        freelancerId,
        url,
        publicId
      );

      
      if (response.success) {
        return res.status(200).json({
          success: true,
          message: "Resume uploaded successfully",
          url: response.url,
          publicId: response.publicId,
        });
      } else {
        return res
          .status(500)
          .json({ success: false, message: response.message });
      }
    } catch (error) {
      console.error("Error in resumeController:", error);
      return res
        .status(500)
        .json({ success: false, message: "Failed to upload resume" });
    }
  };
};
