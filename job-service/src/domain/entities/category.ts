// src/domain/entities/Category.ts
export interface Category {
  _id?: string;
  name: string;
  description: string;
  subcategories: string[];
  skills: string[];
}
