import { Types } from "mongoose";

export interface Category {
  _id?: Types.ObjectId | string;
  name: string;
  description: string;
  subcategories: string[];
  skills: string[];
}

export interface Skill extends Document{
  _id: Types.ObjectId | string;
  name: string;
  description: string;
}

export interface SubCategory {
  name: string;
}
