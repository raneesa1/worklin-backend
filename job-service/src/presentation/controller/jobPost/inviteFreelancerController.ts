import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { JobPost } from "../../../domain/interface/IJobPost";
import { validateJobPostInput } from "../../../utils/validations/validateJobPost";
import { IInviteFreelancer } from "../../../domain/interface/IInviteFreelancer";

export const inviteFreelancerController = (dependencies: IDependencies) => {
  const {
    useCases: { inviteFreelancerUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { freelancerId, clientId, jobId, description, clientName } =
        req.body;
      console.log(freelancerId, clientId, jobId, clientName, description);
      // Destructure the invitation data directly from req.body

      console.log(
        { freelancerId, clientId, jobId, description, clientName },
        "consoling the invitation data"
      );
      console.log("hi from controller post inviteFreelancerUseCase");

      // Reassemble the data into a single object
      const invitationData: IInviteFreelancer = {
        freelancerId,
        clientId,
        jobId,
        clientName,
        description,
      };

      // Call the use case with the reassembled object
      const jobPost = await inviteFreelancerUseCase(dependencies).execute(
        invitationData
      );

      console.log(jobPost, "consoling the job post");
      res.status(201).json({
        message: "Job post retrieved successfully!",
        jobPost: jobPost,
      });
    } catch (error) {
      console.error(
        "Error in sending freelancer request post controller:",
        error
      );
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
