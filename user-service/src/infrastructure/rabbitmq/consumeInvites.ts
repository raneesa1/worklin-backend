import { getChannel } from "./rabbit.config";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { processInviteUseCase } from "../../application/useCases";

export async function consumeInvites(
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

    const { execute } = processInviteUseCase(dependencies);

    channel.consume(queue, async (msg) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        console.log("Received invite message:", message);

        // Use the use case to process the invite
        await execute(message);
        channel.ack(msg); // Acknowledge message
      }
    });

    console.log(`Waiting for messages in queue: ${queue}`);
  } catch (error) {
    console.error("Error consuming invite messages:", error);
    throw error;
  }
}
