import { IChat } from "../entities/IChat";
import { IMessage } from "../entities/message.entity";

export interface IcreateRoomUseCase {
  execute(data: IMessage): Promise<IChat | null | boolean>;
}
