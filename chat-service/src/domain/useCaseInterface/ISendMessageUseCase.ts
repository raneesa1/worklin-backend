import { IMessage } from "../entities/message.entity";

export interface ISendMessageUseCase {
  execute(data: IMessage): Promise<IMessage | null | boolean>;
}
