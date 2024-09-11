import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { locationValidation } from "../../utils/validation/locationValidation";

export const locationController = (dependencies: IDependencies) => {
  const {
    useCases: { addLocationUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { freelancerId, locationData, imageUrl } = req.body;
      console.log(imageUrl, "consoling the image url");

      if (!imageUrl) {
        res.status(400).json({
          message: "image url is required.",
        });
        return;
      }
      // Validate incoming data
      const { error } = locationValidation.validate(locationData, {
        abortEarly: false,
      });

      if (error) {
        const message = error.details
          .map((detail) => detail.message)
          .join(", ");
        res.status(400).json({ message });
        return;
      }

      const updatedFreelancer = await addLocationUseCase(dependencies).execute(
        freelancerId,
        locationData,
        imageUrl
      );

      if (!updatedFreelancer) {
        res.status(404).json({
          message: "Freelancer not found or address could not be saved.",
        });
        return;
      }

      res.status(201).json({
        message: "Location and image updated successfully.",
        freelancer: updatedFreelancer,
      });
    } catch (error) {
      console.error("Error adding location and image:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
