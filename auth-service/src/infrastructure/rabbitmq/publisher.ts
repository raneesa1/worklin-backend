import { Channel } from "amqplib";
import { getChannel } from "./rabbitmq.config";

export async function publishToQueue(
  queue: string,
  message: any
): Promise<void> {
  const channel: Channel | null = await getChannel(); // Await the channel
  
  if (!channel) {
    throw new Error("RabbitMQ channel not available");
  }

  try {
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue("userQueue", "userManagementExchange", "");

    const messageBuffer = Buffer.from(JSON.stringify(message));
    channel.sendToQueue(queue, messageBuffer);
    console.log(`Message sent to queue: ${queue}`, { message });
    console.log(`Message sent to queue: ${queue}`, { message });
  } catch (error) {
    console.error("Error sending message to queue:", error);
  }
}
