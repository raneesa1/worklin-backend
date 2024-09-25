import { clientEntity } from "../entities";

export interface IGetAllClientsUseCase {
  execute(): Promise<clientEntity[] | null>;
}
