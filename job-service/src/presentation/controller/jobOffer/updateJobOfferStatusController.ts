// src/interfaces/controllers/CategoryController.ts
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const updateJobOfferStatusController = (dependencies: IDependencies) => {
  const {
    useCases: { acceptJobOfferUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { jobOfferId, status } = req.body;
      console.log(
        jobOfferId,
        status,
        "consoling the jobOfferId , status from controller"
      );
      const jobOffer = await acceptJobOfferUseCase(dependencies).execute(
        jobOfferId,
        status
      );

      res.status(200).json({
        message: `job offer ${status} successfully!`,
        jobOffer,
      });
    } catch (error: any) {
      console.error("Error in updateStatusJobOffer controller:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
