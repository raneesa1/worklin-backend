import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const updateJobInvitesController = (dependencies: IDependencies) => {
  const { updateJobInvitesUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId, jobPostId, status } = req.body;
      console.log(userId, jobPostId, status, "=>>>>>>>>>");
      // Ensure both userId and jobPostId are provided
      if (!userId || !jobPostId || !status) {
        res
          .status(400)
          .json({ message: "User ID and Job Post ID are required" });
        return;
      }

      // Execute the use case
      const freelancer = await updateJobInvitesUseCase(dependencies).execute(
        userId,
        jobPostId,
        status
      );

      // Return the updated freelancer data
      res.status(200).json(freelancer);
    } catch (error) {
      console.error("Error getting experience of user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
