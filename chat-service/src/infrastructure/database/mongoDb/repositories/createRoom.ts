
import { IChat } from "../../../../domain/entities/IChat";
import { IMessage } from "../../../../domain/entities/message.entity";
import Chat from "../model/chatSchema";

export const addRoom = async (
  data: IMessage
): Promise<IChat | null | boolean> => {
  try {
    if (!data || !data.sender || !data.receiver) {
      return null;
    }
    const alreadyExist = await Chat.findOne({
      participants: { $all: [data.sender, data.receiver] },
    });
    if (alreadyExist) return true;

    const newRoom = await Chat.create({
      Message: [],
      participants: [data.sender, data.receiver],
      lastMessage: new Date(),
    });
    if (newRoom) {
      return newRoom;
    }
    return null;
  } catch (error: any) {
    console.error("Error adding chat:", error);
    throw new Error("Failed to add chat..");
  }
};
