import { User } from "../models/loginCredential";
import {
  UserEntity,
  UserGoogleSignupEntity,
} from "../../../../domain/entities";

export const googleSignup = async (
  data: UserGoogleSignupEntity
): Promise<UserGoogleSignupEntity | null> => {
  try {
    console.log(data, "console from google signup repository");

    const newUser = await User.create({
      email: data.email,
      accountType: data.accountType,
      picture: data.picture,
      firstName: data.name, // Assuming Google's name maps to firstName
    });
    console.log(newUser, "user created");

    console.log(
      newUser,
      "consoling the new user from the repository----------->>>>>>>>>>>>>>>"
    );
    if (!newUser) {
      throw new Error("User creation failed!");
    }
    return {
      _id: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      picture: newUser.picture,
      accountType: newUser.accountType,
    } as UserGoogleSignupEntity;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
