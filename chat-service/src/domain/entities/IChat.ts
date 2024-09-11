import { Document, ObjectId } from "mongoose";

export interface IChat extends Document {
  _id: ObjectId;
  createdAt: Date;
  message: ObjectId[];
  participants: ObjectId[]; // participants include senderId and receiverId
  lastMessage: Date;
  timestamp: Date;
}
