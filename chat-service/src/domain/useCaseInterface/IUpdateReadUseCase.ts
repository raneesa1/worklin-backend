import { IMessage } from "../entities/message.entity";


export interface IUpdateReadUseCase {
  execute(
    sender: string,
    receiver: string,
    status: string
  ): Promise<IMessage[] | null | boolean>;
}
