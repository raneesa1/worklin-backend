// src/domain/entities/experienceEntity.ts
import { Document, Types } from "mongoose";

// Base interface for experience properties
export interface IExperienceBase {
  userId: string;
  title: string;
  company: string;
  jobLocation: string;
  country: string;
  startMonth?: string;
  startYear?: string;
  startDate: string;
  endMonth?: string;
  endYear?: string;
  endDate?: string;
  description: string;
  isCurrentlyWorking?: boolean;
}

// Interface for Experience document with Mongoose properties
export interface IExperienceDocument extends Document, IExperienceBase {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Experience model
export interface IExperience extends IExperienceBase {
  _id?: string;
}
