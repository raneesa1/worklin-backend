import amqp from "amqplib";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { processPaymentUseCase } from "../../application/useCases";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://127.0.0.1:5672";
const EXCHANGE_NAME = "paymentManagementExchange";
const QUEUE_NAME = "paymentDataQueue";

export async function consumePaymentData(
  dependencies: IDependencies
): Promise<void> {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    const { queue } = await channel.assertQueue(QUEUE_NAME, { durable: true });

    await channel.bindQueue(queue, EXCHANGE_NAME, "payment_routing_key");

    console.log(`Waiting for messages in queue: ${QUEUE_NAME}`);

    const { execute } = processPaymentUseCase(dependencies);

    channel.consume(queue, async (msg) => {
      if (msg) {
        try {
          const message = JSON.parse(msg.content.toString());
          console.log("Received payment data:", message);

          await execute(message);
          console.log(`Payment processed: ${JSON.stringify(message)}`);

          channel.ack(msg);
        } catch (error) {
          console.error("Error processing payment:", error);
          channel.nack(msg, false, false);
        }
      }
    });
  } catch (error) {
    console.error("Error setting up payment consumer:", error);
    throw error;
  }
}
