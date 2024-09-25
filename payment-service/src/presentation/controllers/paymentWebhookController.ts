import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { dependencies } from "../../config/dependencies";

// Make sure this is your actual secret key
const STRIPE_SECRET_KEY =
  (process.env.STRIPE_SECRET_KEY as string) ||
  "sk_test_51PyTWU06QK8ZKcxNMntPf025XOBtVL8QQPcwQhEBcSxhxCPv924zCndsSLnxfh9fBu3P9kSs8BvhblVFxvXaB5Sv00PrwpKiOa";
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

const STRIPE_ENDPOINT_SECRET =
  "whsec_2633ce1bdcd212f059fba110efd5291bd24f72031ed3f556cb6ad4ab4d43417e";

export const paymentWebhookController = (dependencies: IDependencies) => {
  const {
    useCases: { updatePaymentStatusUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    const stripeSignature = req.headers["stripe-signature"];
    if (!stripeSignature) {
      console.log("no stripe signature");
      return res.status(400).send("No Stripe signature found");
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        stripeSignature.toString(),
        STRIPE_ENDPOINT_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          console.log("inside the checkout session completed event");
          const session = event.data.object as Stripe.Checkout.Session;
          console.log(session, "consoling the session of completed event");
          console.log("Session metadata:", session.metadata);
          await handleSuccessfulPayment(session, updatePaymentStatusUseCase);
          break;
        }
        case "payment_intent.payment_failed": {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          await handleFailedPayment(paymentIntent, updatePaymentStatusUseCase);
          break;
        }
        default:
          console.log(`Unhandled event type ${event.type}`); // Add this line
      }

      res.json({ received: true });
    } catch (error) {
      console.error("Error processing webhook:", error);
      res.status(500).send("Error processing webhook");
    }
  };
};

async function handleSuccessfulPayment(
  session: Stripe.Checkout.Session,
  updatePaymentStatusUseCase: any
) {
  const paymentId = session.metadata?.paymentId;
  if (paymentId) {
    await updatePaymentStatusUseCase(dependencies).execute(paymentId, "paid");
  }
}

async function handleFailedPayment(
  paymentIntent: Stripe.PaymentIntent,
  updatePaymentStatusUseCase: any
) {
  const paymentId = paymentIntent.metadata?.paymentId;
  if (paymentId) {
    await updatePaymentStatusUseCase(dependencies).execute(
      paymentId,
      "paymentFailed"
    );
  }
}
