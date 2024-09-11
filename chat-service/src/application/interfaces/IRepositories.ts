import { ObjectId } from "mongoose";
import { IMessage } from "../../domain/entities/message.entity";
import { IChat } from "../../domain/entities/IChat";

export interface IRepositories {
  sendMessage: (data: IMessage) => Promise<IMessage | null | boolean>;
  getMessages: (id: string) => Promise<IChat | null | boolean>;
  listAllMessage: (id: string) => Promise<IChat[] | null | boolean>;
  addRoom: (data: any) => Promise<IChat | null | boolean>;
  getRoom: (id: string) => Promise<IChat[] | null | boolean>;
  updateReadStatus: (
    sender: string,
    receiver: string,
    status: string
  ) => Promise<IMessage[] | null | boolean>;
}
