import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { educationValidation } from "../../../utils/validation/educationValidation";

export const addEducationController = (dependencies: IDependencies) => {
  const {
    useCases: { addEducationUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const educationData = req.body;

      const { error } = educationValidation.validate(educationData, {
        abortEarly: false,
      });
      if (error) {
        const message = error.details
          .map((detail) => detail.message)
          .join(", ");
        res.status(400).json({ message: `${message}` });
        return; // Explicitly return to end the function here
      }
      console.log(educationData, "consoling the educationData data");
      const result = await addEducationUseCase(dependencies).execute(
        educationData
      );

      res.status(201).json(result);
    } catch (error) {
      console.error("Error adding education:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
