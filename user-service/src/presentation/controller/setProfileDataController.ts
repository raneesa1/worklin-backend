import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const setProfileDataController = (dependencies: IDependencies) => {
  const {
    useCases: { setProfileDataUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Extract the data from the request body

      const profileData= req.body;
      console.log(profileData, "Consoling the rate data");

      // Execute the use case with the provided bioData
      const result = await setProfileDataUseCase(dependencies).execute(
        profileData
      );

      // Send a successful response
      res.status(201).json(result);
    } catch (error) {
      // Log and handle errors
      console.error("Error setting the bio data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
