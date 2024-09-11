// src/domain/useCaseInterface/IGetAllCategoriesUseCase.ts
import { Category } from "../entities/category";

export interface IGetAllCategoriesUseCase {
  execute(
    page: number,
    limit: number,
    search: string
  ): Promise<{
    categories: Category[];
    totalCount: number;
  }>;
}
