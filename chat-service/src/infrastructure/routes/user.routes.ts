import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controller";

export const userRoutes = (dependencies: IDependencies) => {
  const { sendMessage, getMessage, listAllMessage, getRoom, createRoom } =
    controllers(dependencies);

  const router = Router();

  router.route("/sendMessage").post(sendMessage);
  router.route("/getMessage").get(getMessage);
  router.route("/listMessages").get(listAllMessage);
  router.route("/get-room").get(getRoom);
  router.route("/create-room").post(createRoom);
  return router;
};
