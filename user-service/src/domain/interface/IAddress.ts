import { Schema, Document } from "mongoose";

// Address interface
export interface IAddress {
  userId?: string;
  country: string;
  address: string;
  city: string;
  state?: string; // Optional
  phone: string;
  zip?: string; // Optional
  apt?: string; // Optional
  dob: Date;
  imageUrl?: string;
}

export interface AddressDocument extends IAddress, Document {}
