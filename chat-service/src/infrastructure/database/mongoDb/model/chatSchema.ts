import mongoose, { Schema } from "mongoose";
import { IChat } from "../../../../domain/entities/IChat";

const ChatSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  message: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  participants: [{ type: Schema.Types.ObjectId }],
  lastMessage: { type: Date, default: Date.now() },
});

const Chat = mongoose.model<IChat>("Chat", ChatSchema);

export default Chat;
