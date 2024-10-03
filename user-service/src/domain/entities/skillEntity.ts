// src/domain/entities/skillEntity.ts
import mongoose, { Document, Types } from "mongoose";

// Base interface for skill properties
export interface ISkillBase {
  name: string;
  description?: string;
}

// Document interface (for Mongoose)
export interface ISkillDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
}

// Plain object interface (for API/general use)
export interface ISkill extends ISkillBase {
  _id?: string;
}

// Main skill entity interface (use this when working with Mongoose documents)
export interface skillEntity extends ISkillDocument {
  _id: Types.ObjectId;
  name: string;
  description?: string;
}
