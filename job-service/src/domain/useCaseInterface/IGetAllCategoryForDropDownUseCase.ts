// src/domain/useCaseInterface/IGetAllCategoriesUseCase.ts
import { Category } from "../entities/category";

export interface IGetAllCategoryForDropDownUseCase {
  execute(): Promise<Category[]>;
}
