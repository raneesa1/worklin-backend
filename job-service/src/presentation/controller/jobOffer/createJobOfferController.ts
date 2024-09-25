import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { jobOfferValidator } from "../../../utils/validations/validateJobOffer";
import {
  IJobOffer,
  paymentOption,
  paymentType,
  offerStatus,
} from "../../../domain/entities/jobOffer";
import { Types } from "mongoose";

export const createJobOfferController = (dependencies: IDependencies) => {
  const {
    useCases: { createJobOfferUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log(
        req.body,
        "consoling the req body =========== ==  == = = = = = = == =============== = = = =  = == =  == =  == = = = == == == >>>>>>>>"
      );
      // Validate incoming request using Joi
      const { error, value } = jobOfferValidator.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        res.status(400).json({ errors: errorMessages });
        return;
      }

      const jobOfferData: IJobOffer = {
        clientId: value.clientId,
        freelancerId: value.freelancerId,
        hiringTeam: value.hiringTeam,
        relatedJobId: value.relatedJobId,
        title: value.title,
        paymentType: value.paymentType as paymentType,
        paymentOption: value.paymentOption as paymentOption,
        totalAmount: value.totalAmount,
        hourlyRate: value.hourlyRate,
        numberOfHours: value.numberOfHours,
        mileStone: value.mileStone,
        description: value.description,
        files: value.files,
        offerStatus: value.offerStatus as offerStatus,
        isActive: value.isAccepted,
        dueDate: value.dueDate ? new Date(value.dueDate) : new Date(),
      };

      console.log(
        `Creating job offer with title: ${jobOfferData.title}, for freelancer: ${jobOfferData.freelancerId}`
      );

      console.log(
        jobOfferData,
        "consoling the job offer data before sending to useCase"
      );
      // Execute the use case to create a job offer
      const jobOffer = await createJobOfferUseCase(dependencies).execute(
        jobOfferData
      );

      // Respond with the created job offer
      res.status(201).json({
        message: "Job offer created successfully!",
        data: jobOffer,
      });
    } catch (error: any) {
      console.error("Error in createJobOfferController:", error.message);
      res.status(500).json({
        message: "An error occurred while creating the job offer.",
        error: error.message || "Internal Server Error",
      });
    }
  };
};
