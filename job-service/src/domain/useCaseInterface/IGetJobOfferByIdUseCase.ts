import { IJobOffer } from "../entities/jobOffer";
import { JobPost } from "../interface/IJobPost";

export interface IGetJobOfferByIdUseCase {
  execute(id: string): Promise<IJobOffer[] | null>;
}
