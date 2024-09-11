import { IChat } from "../entities/IChat";

export interface IGetRoomUseCase {
  execute(id: string): Promise<IChat[] | null | boolean>;
}
