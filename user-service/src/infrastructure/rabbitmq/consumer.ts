import { getChannel } from "./rabbit.config";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { saveAuthDetails } from "../../application/useCases";

export async function consumeMessages(
  queue: string,
  dependencies: IDependencies
): Promise<void> {
  try {
    const channel = getChannel();
    if (!channel) {
      throw new Error("RabbitMQ channel not available");
    }

    await channel.assertQueue(queue, { durable: true });
    await channel.assertExchange("userManagementExchange", "direct", {
      durable: true,
    });
    await channel.bindQueue(queue, "userManagementExchange", "");

    const { execute } = saveAuthDetails(dependencies);

    channel.consume(queue, async (msg) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        console.log("Received message:", message);

        // Use the use case to process the message
        await execute(message);
        channel.ack(msg); // Acknowledge message
      }
    });

    console.log(`Waiting for messages in queue: ${queue}`);
  } catch (error) {
    console.error("Error consuming messages:", error);
    throw error;
  }
}
