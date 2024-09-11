import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const saveRoleController = (dependencies: IDependencies) => {
  const {
    useCases: { saveRoleUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
     

      const { role, freelancerId } = req.body;
      console.log(role, "Consoling the rate data");

      // Execute the use case with the provided bioData
      const result = await saveRoleUseCase(dependencies).execute(
        role,
        freelancerId
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
