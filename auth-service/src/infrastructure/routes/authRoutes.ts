import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers/index";
// import { verifyOtpController } from "../../presentation/controllers/otp";

export const authRoutes = (dependencies: IDependencies) => {
  const {
    signup,
    login,
    emailExists,
    googleSignin,
    refreshToken,
    googleSignup,
    resendOtp,
  } = controllers(dependencies);

  const router = Router();

  router.route("/signup").post(signup);
  router.route("/resend-otp").post(resendOtp);
  router.route("/login").post(login);
  router.route("/check-email").get(emailExists);
  router.route("/google-signin").post(googleSignin);
  router.route("/google-signup").post(googleSignup);
  router.route("/refresh-token").post(refreshToken);

  return router;
};
