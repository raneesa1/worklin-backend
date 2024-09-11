import { IMessage } from "../../../../domain/entities/message.entity";
import Message from "../model/messageSchema";

export const updateReadStatus = async (
  sender: string,
  receiver: string,
  status: string
): Promise<IMessage[] | null | boolean> => {
  try {
    if (!sender || !receiver || !status) {
      return null;
    }

    const chats = Message.find({ sender: sender, receiver: receiver });
    if (!chats) {
      return false;
    }

    const newMessageUpdate = await Message.updateMany(
      { receiver: receiver, sender: sender },
      { $set: { status: status } }
    );
    if (newMessageUpdate.modifiedCount == 0) {
      return false;
    }

    const message = await Message.find();

    if (!message.length) {
      return false;
    }
    return message;
  } catch (error: any) {
    console.error("Error adding message:", error);
    throw new Error("Failed to add message.");
  }
};
