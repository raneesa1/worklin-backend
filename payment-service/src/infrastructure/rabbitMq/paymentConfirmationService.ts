import { getChannel } from "./rabbit.config";

export async function sendPaymentConfirmation(offerId: string) {
  try {
    const channel = await getChannel(); // Await the async channel getter
    if (channel) {
      const message = JSON.stringify({ offerId, status: "paid" });
      console.log(message, "consoling the message from payment service");

      const exchange = "paymentServiceExchange";
      const routingKey = "payment.confirmation";

      channel.publish(exchange, routingKey, Buffer.from(message));
      console.log(`Payment confirmation sent to job service: ${message}`);
    } else {
      console.error("RabbitMQ channel not available after reconnect attempt");
    }
  } catch (error) {
    console.error("Error sending payment confirmation:", error);
  }
}
