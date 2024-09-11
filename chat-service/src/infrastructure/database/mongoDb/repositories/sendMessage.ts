import { IMessage } from "../../../../domain/entities/message.entity";
import Chat from "../model/chatSchema";
import Message from "../model/messageSchema";

export const sendMessage = async (
  data: IMessage
): Promise<IMessage | null | boolean> => {
  try {
    if (
      !data ||
      !data.sender ||
      !data.receiver ||
      !data.content ||
      !data.type ||
      !data.chatId
    ) {
      return null;
    }

    const messageData = {
      sender: data.sender,
      receiver: data.receiver,
      content: data.content,
      type: data.type,
      chatId: data.chatId,
    };

    const newMessage = await Message.create(messageData);
    if (!newMessage) return false;

    const updateChat = await Chat.findByIdAndUpdate(
      data.chatId,
      {
        $push: { message: newMessage._id },
        $set: { lastMessage: new Date() },
      },
      { new: true }
    );

    if (!updateChat) return false;

    return newMessage;
  } catch (error: any) {
    console.error("Error adding message:", error);
    throw new Error("Failed to add message.");
  }
};
