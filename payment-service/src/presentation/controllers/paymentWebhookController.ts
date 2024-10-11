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
     const stripeSignature = req.headers["stripe-signature"];
     if (stripeSignature == null) {
       throw new Error("No stripe signature found!");
     }
     let event: Stripe.Event;

     try {
       event = stripe.webhooks.constructEvent(
         req.body,
         stripeSignature?.toString(),
         STRIPE_WEBHOOK_SECRET
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
           const updatedPayment = await handleSuccessfulPayment(
             session,
             updatePaymentStatusUseCase
           );
           if (updatedPayment && updatedPayment.offerId) {
             const offerIdString = updatedPayment.offerId.toString();
             console.log("sending to payment confirmation ");
             await sendPaymentConfirmation(offerIdString);
           } else {
             console.log(
               "Payment not found or offerId missing, skipping confirmation"
             );
           }
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
): Promise<IPayment | null> {
  const paymentId = session.metadata?.paymentId;
  if (paymentId) {
    const handleSuccessPaymentReturn = await updatePaymentStatusUseCase(
      dependencies
    ).execute(paymentId, "paid");
    console.log(
      handleSuccessPaymentReturn,
      "consoling the handleSuccessPaymentReturn ======>>>>"
    );
    return handleSuccessPaymentReturn;
  }
  return null;
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
