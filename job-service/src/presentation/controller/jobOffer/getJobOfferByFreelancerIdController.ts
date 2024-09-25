// src/interfaces/controllers/CategoryController.ts
import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";

export const getJobOfferByFreelancerIdController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { getJobOfferByFreelancerIdUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { freelancerId } = req.params;
      console.log(freelancerId,'consoling the freelancer id from controller')
       const jobOffer = await getJobOfferByFreelancerIdUseCase(
        dependencies
      ).execute(freelancerId);

      res.status(200).json({
        message: "job offer retrieved successfully!",
        jobOffer,
      });
    } catch (error: any) {
      console.error(
        "Error in getJobOfferByFreelancerIdController controller:",
        error
      );
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  };
};
