import { IChat } from "../entities/IChat";


export interface IGetMessageUseCase {
  execute(id: string): Promise<IChat | null | boolean>;
}
