import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { JobPost } from "../../../domain/interface/IJobPost";
import { validateJobPostInput } from "../../../utils/validations/validateJobPost";

export const createJobPostController = (dependencies: IDependencies) => {
  const {
    useCases: { JobPostUseCase },
  } = dependencies;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log(req.body, "consoling the req.body");

      // Validate the input
      const { error, value } = validateJobPostInput(req.body);

      if (error) {
        res.status(400).json({
          message: "Validation failed",
          errors: error.details.map((detail) => detail.message),
        });
        return;
      }
      const {
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

      const jobPost: JobPost = {
        title,
        skills,
        rate,
        priceTo,
        priceFrom,
        experience,
        duration,
        description,
        clientId,
      };

      console.log(jobPost, "consoling the job post");
      const createdJobPost = await JobPostUseCase(dependencies).execute(
        jobPost
      );

      console.log(createdJobPost, "consoling the created job post");
      res.status(201).json({
        message: "Job post created successfully!",
        jobPost: createdJobPost,
      });
    } catch (error) {
      console.error("Error in creating job post controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
