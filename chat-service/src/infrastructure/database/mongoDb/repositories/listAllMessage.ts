import { IChat } from "../../../../domain/entities/IChat";
import Chat from "../model/chatSchema";

export const listAllMessage = async (
  id: string
): Promise<IChat[] | null | boolean> => {
  try {
    if (!id) {
      return null;
    }
    const message = await Chat.find({ participants: { $in: [id] } }).populate(
      "message"
    );
    if (!message) {
      return false;
    }
    return message;
  } catch (error: any) {
    console.error("Error listing message:", error);
    throw new Error("Failed to listing message.");
  }
};
