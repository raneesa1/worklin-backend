import { UserEntity } from "../../../../domain/entities";
import { User } from "../models/loginCredential";

async function findByEmail(email: string): Promise<UserEntity | null> {
    try {
        console.log(email,'consoling email from find by email')
        const user = await User.findOne({ email });
        console.log(user,'consoling the user from find by email')
        return user;
    } catch (error) {
        throw error;
    }
}

export { findByEmail };
