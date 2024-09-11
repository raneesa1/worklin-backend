// src/domain/repositories/ICategoryRepository.ts
import { Category } from "../entities/category";

export interface ICategoryRepository {
  save(category: Category): Promise<Category>;
  // Other repository methods like getCategory, updateCategory, deleteCategory, etc.
}
