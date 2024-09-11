import { Document, ObjectId } from "mongoose";

export interface IMessage extends Document {
  _id: ObjectId;
  sender: ObjectId;
  receiver: ObjectId;
  content: String;
  type: String;
  createdAt: String;
  chatId: string;
  status: String;
}
