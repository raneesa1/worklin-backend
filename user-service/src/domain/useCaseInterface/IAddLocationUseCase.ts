import { FreelancerEntity } from "../entities";
import { IAddress } from "../interface/IAddress";

export interface IAddLocationUseCase {
  execute(
    freelancerId: string,
    location: IAddress,
    imageUrl: string
  ): Promise<FreelancerEntity | null>;
}
