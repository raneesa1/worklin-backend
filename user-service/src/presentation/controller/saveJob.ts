// src/controllers/jobController.ts
import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { validateJobData } from "../../utils/validation/saveJobValidation";

export const saveJobController = (dependencies: IDependencies) => {
  const {
    useCases: { saveJobUseCase, removeSavedJobUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jobData, action } = req.body;

      // Validate jobData using the validation function from jobValidation.ts
      const { error } = validateJobData(jobData);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      let result;

      if (action === "save") {
        result = await saveJobUseCase(dependencies).execute(jobData);
        return res
          .status(201)
          .json({ message: "Job saved successfully", data: result });
      } else if (action === "unsave") {
        result = await removeSavedJobUseCase(dependencies).execute(
          jobData.jobId,
          jobData.freelancerId
        );
        return res
          .status(200)
          .json({ message: "Job unsaved successfully", data: result });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid action. Must be 'save' or 'unsave'." });
      }
    } catch (error) {
      console.error("Error saving/unsaving the job:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
