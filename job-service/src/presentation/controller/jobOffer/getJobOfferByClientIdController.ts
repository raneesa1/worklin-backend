// src/interfaces/controllers/CategoryController.ts
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getJobOfferByClientIdController = (dependencies: IDependencies) => {
  const {
    useCases: { getJobOfferByClientIdUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { clientId } = req.params;
      console.log(clientId, "consoling the freelancer id from controller");
      const jobOffer = await getJobOfferByClientIdUseCase(dependencies).execute(
        clientId
      );

      res.status(200).json({
        message: "job offer retrieved successfully!",
        jobOffer,
      });
    } catch (error: any) {
      console.error(
        "Error in getJobOfferByClientIdController controller:",
        error
      );
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
