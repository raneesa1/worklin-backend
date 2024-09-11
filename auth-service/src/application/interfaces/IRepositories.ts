import { ObjectId } from "mongoose";
import {
  UserEntity,
  UserGoogleSignupEntity,
  UserLoginEntity,
} from "../../domain/entities";

export interface IRepositories {
  signup: (data: UserEntity) => Promise<UserEntity | null>;
  login: (data: UserLoginEntity) => Promise<UserEntity | null>;
  findByEmail: (email: string) => Promise<UserEntity | null>;
  googleSignup: (
    data: UserGoogleSignupEntity
  ) => Promise<UserGoogleSignupEntity | null>;
  saveOtp: (email: string, otp: string) => Promise<void>; // This method should match the implementation
  verifyOtp: (email: string, otp: string) => Promise<boolean | null>;
}
