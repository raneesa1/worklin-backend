import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { dependencies } from "../../config/dependencies";
import { sendPaymentConfirmation } from "../../infrastructure/rabbitMq/paymentConfirmationService";
import { IPayment } from "../../domain/interface/ITransaction";
import { getChannel } from "../../infrastructure/rabbitMq/rabbit.config";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export const paymentWebhookController = (dependencies: IDependencies) => {
  const {
    useCases: { updatePaymentStatusUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    const sig = req.headers["stripe-signature"];

    if (!sig) {
      console.log("No Stripe signature found");
      return res.status(400).json({ error: "No Stripe signature found" });
    }

    let event: Stripe.Event;

    try {
      // Verify the event with the raw body
      event = stripe.webhooks.constructEvent(
        req.body, // This should be the raw request body
        sig,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return res.status(400).json({
        error: `Webhook signature verification failed: ${
          (err as Error).message
        }`,
      });
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;
          console.log("Processing completed checkout session:", session.id);

          const updatedPayment = await handleSuccessfulPayment(
            session,
            updatePaymentStatusUseCase
          );

          if (updatedPayment?.offerId) {
            console.log(
              `Sending payment confirmation for offer: ${updatedPayment.offerId}`
            );
            await sendPaymentConfirmation(updatedPayment.offerId.toString());
          } else {
            console.log(
              "Payment processed but no offerId found for confirmation"
            );
          }
          break;
        }

        case "payment_intent.succeeded": {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          console.log(`Processing succeeded payment: ${paymentIntent.id}`);
          await handleSuccessfulPaymentIntent(
            paymentIntent,
            updatePaymentStatusUseCase
          );
          break;
        }

        case "payment_intent.payment_failed": {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          console.log(`Processing failed payment: ${paymentIntent.id}`);
          await handleFailedPayment(paymentIntent, updatePaymentStatusUseCase);
          break;
        }

        default:
          console.log(`Received unhandled event type: ${event.type}`);
      }

      return res.json({ received: true });
    } catch (error) {
      console.error("Error processing webhook event:", error);
      return res.status(500).json({
        error: "Internal server error while processing webhook",
      });
    }
  };
};

async function handleSuccessfulPayment(
  session: Stripe.Checkout.Session,
  updatePaymentStatusUseCase: any
): Promise<IPayment | null> {
  const paymentId = session.metadata?.paymentId;
  if (paymentId) {
    const handleSuccessPaymentReturn =
      await updatePaymentStatusUseCase().execute(paymentId, "paid");
    console.log(
      handleSuccessPaymentReturn,
      "consoling the handleSuccessPaymentReturn ======>>>>"
    );
    return handleSuccessPaymentReturn;
  }
  return null;
}

async function handleSuccessfulPaymentIntent(
  paymentIntent: Stripe.PaymentIntent,
  updatePaymentStatusUseCase: any
) {
  const paymentId = paymentIntent.metadata?.paymentId;
  if (paymentId) {
    await updatePaymentStatusUseCase().execute(paymentId, "paid");
  }
}

async function handleFailedPayment(
  paymentIntent: Stripe.PaymentIntent,
  updatePaymentStatusUseCase: any
) {
  const paymentId = paymentIntent.metadata?.paymentId;
  if (paymentId) {
    await updatePaymentStatusUseCase().execute(paymentId, "paymentFailed");
  }
}
async function sendToJobService(offerId: string) {
  const channel = await getChannel();
  if (!channel) {
    console.error("RabbitMQ channel not available after reconnect attempt");
    return;
  }

  const message = JSON.stringify({ offerId, status: "paid" });
  const routingKey = "payment.confirmation";
  const exchange = "paymentServiceExchange";

  channel.publish(exchange, routingKey, Buffer.from(message));
  console.log(`Payment confirmation message sent: ${message}`);
}
