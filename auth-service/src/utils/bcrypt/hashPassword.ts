import { hash, genSalt } from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    // Generate a salt
    const salt = await genSalt(10);
    // Hash the password using the salt
    const hashedPassword = await hash(password, salt);

    // Ensure the hashing was successful
    if (!hashedPassword) {
      throw new Error("Password hashing error!");
    }

    return hashedPassword;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
