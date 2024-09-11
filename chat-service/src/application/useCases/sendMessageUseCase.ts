import { IMessage } from "../../domain/entities/message.entity";
import { IDependencies } from "../interfaces/IDependencies";

export const sendMessageUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { sendMessage },
  } = dependencies;
  return {
    execute: async (data: IMessage) => {
      try {
        return await sendMessage(data);
      } catch (error: any) {
        throw new Error(error);
      }
    },
  };
};
