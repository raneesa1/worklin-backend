// services/userService.ts
import { UserEntity } from "../../../../domain/entities";
import { User } from "../models/loginCredential";
import { Otp } from "../models/otp";



export const signup = async (data: UserEntity): Promise<UserEntity | null> => {
  try {
    const newUser = await User.create(data);
    console.log("new user created");

    if (!newUser) {
      throw new Error("user creation failed");
    }

    return newUser as UserEntity;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};