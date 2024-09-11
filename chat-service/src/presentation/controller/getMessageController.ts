import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

/**
 * getMessageController - Handles fetching messages for a given room ID.
 *
 * This controller:
 * 1. Retrieves the room ID from the request query parameters.
 * 2. Validates if the room ID is provided.
 * 3. Executes the getMessageUseCase to fetch messages associated with the provided room ID.
 * 4. Returns an error response if the room ID is missing or if fetching messages fails.
 * 5. Returns a success response with the fetched messages if successful.
 * 6. Passes any caught errors to the error handler middleware.
 */

export const getMessageController = (dependencies: IDependencies) => {
  const {
    useCases: { getMessageUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.query.id;

      if (!data) {
        return console.log("no data");
        // return next(ErrorResponse.badRequest("data is required."));
      }

      const messages = await getMessageUseCase(dependencies).execute(
        String(data)
      );
      if (!messages) {
        return res.status(200).send({
          message: "No message found",
        });
        // next(ErrorResponse.badRequest("data is required"));
      }
      console.log(
        messages,
        "consoling the messages from the get message controller"
      );

      return res.status(200).send({
        success: true,
        user: messages,
        message: "fetched message successfully",
      });
    } catch (error: any) {
      console.log("consoling the error from get message controller");
      //   next(ErrorResponse.badRequest(error.message));
    }
  };
};
