import { IChat } from "../entities/IChat";

export interface IListAllMessageUseCase {
  execute(id: string): Promise<IChat[] | null | boolean>;
}
