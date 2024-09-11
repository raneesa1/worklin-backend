import { IChat } from "../../../../domain/entities/IChat";
import Chat from "../model/chatSchema";

export const getMessages = async (
  id: string
): Promise<IChat | null | boolean> => {
  try {
    if (!id) {
      return null;
    }

    const message = await Chat.findOne({ _id: id }).populate("message");

    if (!message) {
      return false;
    }
    return message;
  } catch (error: any) {
    console.error("Error getting message:", error);
    throw new Error("Failed to getting message.");
  }
};
