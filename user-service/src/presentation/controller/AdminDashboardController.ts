import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const AdminDashboardController = (dependencies: IDependencies) => {
  const { getAdminDashboardUseCase } = dependencies.useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { timeRange } = req.params;
      if (!timeRange) {
        res.status(404).json({ message: "time rage is required" });
        return;
      }
      const data = await getAdminDashboardUseCase(dependencies).execute(
        timeRange
      );

      if (!data) {
        res.status(404).json({ message: "No data fetched" });
        return;
      }

      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting experience of user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
