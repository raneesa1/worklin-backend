import { Category } from "../entities/category";
import { IJobOffer } from "../entities/jobOffer";

export interface ICreateJobOfferUseCase {
  execute(jobOffer: IJobOffer): Promise<IJobOffer>;
}
