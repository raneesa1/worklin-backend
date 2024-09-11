import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

/**
 * getRoomController - Retrieves details of a chat room by its ID.
 *
 * This controller:
 * 1. Retrieves the room ID from the request query parameters.
 * 2. Validates if the room ID is provided.
 * 3. Executes the getRoomUseCase to fetch details of the room with the provided ID.
 * 4. Returns an error response if the room ID is missing or if fetching room details fails.
 * 5. Returns a success response with the fetched room details if successful.
 * 6. Passes any caught errors to the error handler middleware.
 */

export const getRoomController = (dependencies: IDependencies) => {
  const {
    useCases: { getRoomUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query;

      if (!id) {
        return console.log("no data");
        // return next(ErrorResponse.badRequest("data is required"));
      }

      const rooms = await getRoomUseCase(dependencies).execute(String(id));
      if (!rooms) {
        return console.log("no room");
        // return next(ErrorResponse.badRequest("data is required"));
      }

      return res.status(200).send({
        success: true,
        user: rooms,
        message: "fetched Room successfully",
      });
    } catch (error: any) {
      return console.log("error", error);
      //   next(ErrorResponse.badRequest(error.message));
    }
  };
};
