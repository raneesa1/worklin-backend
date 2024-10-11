import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import { IDependencies } from "../../application/interfaces/IDependencies";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY as string;;
const FRONTEND_URL = process.env.FRONTEND_URL ;
console.log(STRIPE_SECRET, "consoling the stripe secret=========>>>");
const stripe = new Stripe(STRIPE_SECRET as string, {
  apiVersion: "2024-06-20",
});

export const createPaymentSessionController = (dependencies: IDependencies) => {
  const {
    useCases: { getPaymentDetailsUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: "paymentId is required" });
    }

    try {
      const paymentDetails = await getPaymentDetailsUseCase(
        dependencies
      ).execute(paymentId);

      if (!paymentDetails) {
        return res.status(404).json({ error: "Payment details not found" });
      }

      const lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: paymentDetails.contractTitle,
            },
            unit_amount: Math.round(paymentDetails.totalAmount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment", // Changed from "subscription" to "payment"
        success_url: `${FRONTEND_URL}/payment-success?amount=${paymentDetails.totalAmount}&receiver=${paymentDetails.receiver.receiverId}`,
        cancel_url: `${FRONTEND_URL}/payment-fail?amount=${paymentDetails.totalAmount}&receiver=${paymentDetails.receiver.receiverId}`,
        metadata: {
          paymentId: paymentId.toString(),
          senderId: paymentDetails.sender.senderId.toString(),
          receiverId: paymentDetails.receiver.receiverId.toString(),
          amount: paymentDetails.totalAmount.toString(),
        },
      });
      res.status(200).json({
        success: true,
        id: session.id,
        message: "payment session created",
      });
    } catch (error) {
      next(error);
    }
  };
};
