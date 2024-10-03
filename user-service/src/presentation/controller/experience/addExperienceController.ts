import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { IExperience } from "../../../domain/entities/Iexperience";
import { experienceSchema } from "../../../utils/validation/experienceValidation";

export const addExperienceController = (dependencies: IDependencies) => {
  const {
    useCases: { addExperienceUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const experienceData = req.body;

      const { error } = experienceSchema.validate(experienceData, {
        abortEarly: false,
      });
      if (error) {
        const message = error.details
          .map((detail) => detail.message)
          .join(", ");
        res.status(400).json({ message: `${message}` });
        return; // Explicitly return to end the function here
      }
      console.log(experienceData, "consoling the experience data");
      const result = await addExperienceUseCase(dependencies).execute(
        experienceData
      );

      res.status(201).json(result);
    } catch (error) {
      console.error("Error adding experience:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
