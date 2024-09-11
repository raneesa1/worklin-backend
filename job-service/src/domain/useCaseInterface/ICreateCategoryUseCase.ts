import { Category } from "../entities/category";

export interface ICreateCategoryUseCase {
  execute(categoryData: Category): Promise<Category>;
}
