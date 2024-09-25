import { clientEntity, FreelancerEntity } from "../entities";

export interface IGetClientByIdUseCase {
  execute(clientId: String): Promise<clientEntity | null>;
}
