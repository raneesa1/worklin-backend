
import { IChat } from "../../../../domain/entities/IChat";
import Chat from "../model/chatSchema";

export const getRoom = async (
  id: string
): Promise<IChat[] | null | boolean> => {
  try {
    if (!id) {
      return null;
    }
    const fetchRoom = await Chat.find({ participants: { $in: [id] } }).populate(
      "message"
    );
    if (!fetchRoom) return false;

    return fetchRoom;
  } catch (error: any) {
    console.error("Error getting room:", error);
    throw new Error("Failed to get room.");
  }
};
