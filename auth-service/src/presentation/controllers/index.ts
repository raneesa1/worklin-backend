import { IDependencies } from "../../application/interfaces/IDependencies";
import { emailExistsController } from "./emailExistsController";
import { loginController } from "./login";
import { verifyGoogleToken } from "./loginWithGoogle";
import { refreshTokenController } from "./refreshToken";
import { resendOtp } from "./resendOtp";

import { signupController } from "./signup";
import { googleSignupController } from "./signupWithGoogle";

export const controllers = (dependencies: IDependencies) => {
  return {
    signup: signupController(dependencies),
    login: loginController(dependencies),
    emailExists: emailExistsController(dependencies),
    googleSignin: verifyGoogleToken(dependencies),
    googleSignup: googleSignupController(dependencies),
    resendOtp: resendOtp(dependencies),
    refreshToken: refreshTokenController(),
  };
};
