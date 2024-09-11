import { IEducation } from "../interface/IEducation";

export interface IAddEducationUseCase {
  execute(education: IEducation): Promise<IEducation | null>;
}
