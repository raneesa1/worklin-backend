// src/domain/useCaseInterface/IGetAllCategoriesUseCase.ts
import { Category } from "../entities/category";
import { skillEntity } from "../entities/skillEntity";

export interface IGetSkillByCategoryIdUseCase {
  execute(categoryId:string): Promise<skillEntity[] | null>;
}
