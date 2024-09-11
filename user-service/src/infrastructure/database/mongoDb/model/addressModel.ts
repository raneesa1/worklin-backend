import mongoose, { Schema, model } from "mongoose";
import { IAddress } from "../../../../domain/interface/IAddress";


const addressSchema = new Schema<IAddress>({
  userId: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  phone: { type: String, required: true },
  zip: { type: String },
  apt: { type: String },
  dob: { type: Date, required: true },
});

export const AddressModel = model<IAddress>("Address", addressSchema);

export { addressSchema };
