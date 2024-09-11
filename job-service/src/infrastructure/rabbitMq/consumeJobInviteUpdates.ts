import { IDependencies } from "../../application/interfaces/IDependencies";
import { processJobInviteUpdateUseCase } from "../../application/useCases/processJobInviteUpdateUseCase";
import { getChannel } from "./rabbit.config";

export async function consumeJobInviteUpdates(
  jobInviteUpdateQueue: string,
  dependencies: IDependencies
): Promise<void> {
  try {
    const channel = getChannel();
    if (!channel) {
      throw new Error("RabbitMQ channel not available");
    }

    await channel.assertQueue(jobInviteUpdateQueue, { durable: true });
    await channel.bindQueue(jobInviteUpdateQueue, "jobServiceExchange", "");

    const { execute } = processJobInviteUpdateUseCase(dependencies);

    channel.consume(jobInviteUpdateQueue, async (msg: any) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        console.log("Received job invite update message:", message);

        try {
          const result = await execute(message);

          console.log(
            `Job invite update processed: ${
              result.success ? "Success" : "Failure"
            } - ${result.message}`
          );

          channel.ack(msg);
        } catch (error) {
          console.error("Error processing job invite update:", error);
          channel.nack(msg, false, true); // Requeue the message
        }
      }
    });

    console.log(`Waiting for messages in queue: ${jobInviteUpdateQueue}`);
  } catch (error) {
    console.error("Error setting up job invite update consumer:", error);
    throw error;
  }
}
