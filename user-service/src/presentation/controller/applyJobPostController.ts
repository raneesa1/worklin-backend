import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const applyJobPostController = (dependencies: IDependencies) => {
  const { applyJobPostUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId, jobPostId } = req.body;
      console.log(userId, jobPostId, '=>>>>>>>>>');
      // Ensure both userId and jobPostId are provided
      if (!userId || !jobPostId) {
        res
          .status(400)
          .json({ message: "User ID and Job Post ID are required" });
        return;
      }

      // Execute the use case
      const freelancer = await applyJobPostUseCase(dependencies).execute(
        userId,
        jobPostId
      );

      // Return the updated freelancer data
      res.status(200).json(freelancer);
    } catch (error) {
      console.error("Error getting experience of user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
