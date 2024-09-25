import { Router } from "express";
import { controllers } from "../../presentation/controllers";
import { IDependencies } from "../../application/interfaces/IDependencies";
import express from "express"; // Add this import
import { paymentWebhookController } from "../../presentation/controllers/paymentWebhookController";

export const paymentRoutes = (dependencies: IDependencies) => {
  const { getTransactions, createPaymentSession } = controllers(dependencies);

  const router = Router();
  router.route("/getTransaction/:userId").get(getTransactions);
  router.route("/createPaymentSession").post(createPaymentSession);

  router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    paymentWebhookController(dependencies)
  );

  return router;
};
