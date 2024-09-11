import { ObjectId } from "mongoose";

export interface UserGoogleLoginEntity {
  _id?: ObjectId;
  email: string;
  idToken: string;
}
