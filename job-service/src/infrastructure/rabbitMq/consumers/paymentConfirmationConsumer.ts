import { Channel, ConsumeMessage } from "amqplib";
import { processJobOffer } from "../sendJobOfferDetails";
import { getChannel } from "../rabbit.config";

export async function setupPaymentConfirmationConsumer() {
  const channel = getChannel();
  if (!channel) {
    console.error("RabbitMQ channel not available");
    return;
  }
  await channel.assertExchange("paymentServiceExchange", "direct", {
    durable: true,
  });
  await channel.assertQueue("job_service_payment_confirmation", {
    durable: true,
  });
  await channel.bindQueue(
    "job_service_payment_confirmation",
    "paymentServiceExchange",
    "payment.confirmation"
  );

  channel.consume(
    "job_service_payment_confirmation",
    async (msg: ConsumeMessage | null) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        console.log("Received payment confirmation message:", content);

        // Process the payment confirmation
        await processJobOffer(content);

        channel.ack(msg);
      }
    }
  );
}
