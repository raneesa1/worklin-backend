import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { JobPost } from "../../../domain/interface/IJobPost";
import { validateJobPostInput } from "../../../utils/validations/validateJobPost";

export const editJobPostController = (dependencies: IDependencies) => {
  const {
    useCases: { editJobPostUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log(req.body, "Request body");

      // Validate the incoming request body
      const { error, value } = validateJobPostInput(req.body);

      if (error) {
        res.status(400).json({
          message: "Validation failed",
          errors: error.details.map((detail) => detail.message),
        });
        return;
      }
      // Check if `id` is provided in the request body
      if (!req.body._id) {
        res.status(400).json({
          message: "Job post ID is required for updating a job post.",
        });
        return;
      }

      const {
        _id,
        title,
        skills,
        rate,
        priceTo,
        priceFrom,
        experience,
        duration,
        description,
        clientId,
      }: JobPost = req.body;

      // Create a JobPost object
      const jobPost: JobPost = {
        _id, // Ensure _id is included for update operations
        title,
        skills,
        rate,
        priceFrom,
        priceTo,
        experience,
        duration,
        description,
        clientId,
      };

      console.log(jobPost, "Job post");

      // Call the use case to handle the job post update
      const updatedJobPost = await editJobPostUseCase(dependencies).execute(
        jobPost
      );

      console.log(updatedJobPost, "Updated job post");
      res.status(200).json({
        message: "Job post updated successfully!",
        jobPost: updatedJobPost,
      });
    } catch (error) {
      console.error("Error in edit job post controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
