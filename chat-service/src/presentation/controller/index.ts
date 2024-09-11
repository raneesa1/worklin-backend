import { IDependencies } from "../../application/interfaces/IDependencies";
import { createRoomController } from "./createRoomController";
import { getMessageController } from "./getMessageController";
import { getRoomController } from "./getRoomController";
import { listAllMessageController } from "./listAllMessageController";
import { sendMessageController } from "./sendMessageController";

export const controllers = (dependencies: IDependencies) => {
  return {
    sendMessage: sendMessageController(dependencies),
    getMessage: getMessageController(dependencies),
    listAllMessage: listAllMessageController(dependencies),
    getRoom: getRoomController(dependencies),
    createRoom: createRoomController(dependencies),
  };
};
