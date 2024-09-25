import { IJobOffer } from "../entities/jobOffer";
import { JobPost } from "../interface/IJobPost";

export interface IUpdateStatusJobOfferUseCase {
  execute(jobOfferId:string,status:string): Promise<IJobOffer>;
}
