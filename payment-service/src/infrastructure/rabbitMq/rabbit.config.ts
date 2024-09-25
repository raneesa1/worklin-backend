import amqp from "amqplib";

let channel: amqp.Channel | null = null;

export async function connectRabbitMQ(): Promise<void> {
  try {
    const connection = await amqp.connect("amqp://127.0.0.1:5672");
    channel = await connection.createChannel();
    console.log("RabbitMQ connection and channel established.");

    if (channel) {
      await channel.assertExchange("paymentServiceExchange", "direct", {
        durable: true,
      });
      console.log("Exchange 'paymentServiceExchange' declared.");

      await channel.assertExchange("jobManagementExchange", "direct", {
        durable: true,
      });
      console.log("Exchange 'jobManagementExchange' declared.");
    }
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
}

export function getChannel(): amqp.Channel | null {
  return channel;
}
