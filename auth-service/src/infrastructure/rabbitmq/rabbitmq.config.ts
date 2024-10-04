import amqp from "amqplib";

let channel: amqp.Channel | null = null;
let isConnecting = false;

export async function connectRabbitMQ(
  retries = 5,
  delay = 5000
): Promise<void> {
  try {
    const rabbitMqUrl = process.env.RABBITMQ_URL;
    if (!rabbitMqUrl) {
      throw new Error("RABBITMQ_URL environment variable is not set.");
    }
    const connection = await amqp.connect(rabbitMqUrl, {
      heartbeat: 60, // Set heartbeat to 60 seconds
    });
    channel = await connection.createChannel();
    console.log("RabbitMQ connection and channel established.");

    // Declare the exchange
    if (channel) {
      await channel.assertExchange("userManagementExchange", "direct", {
        durable: true,
      });
      console.log("Exchange 'userManagementExchange' declared.");
    }
    isConnecting = false;
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    isConnecting = false;
    if (retries > 0) {
      console.log(
        `Retrying connection to RabbitMQ... attempts left: ${retries}`
      );
      await new Promise((res) => setTimeout(res, delay));
      return connectRabbitMQ(retries - 1, delay);
    } else {
      throw error;
    }
  }
}

export async function getChannel(): Promise<amqp.Channel | null> {
  if (!channel) {
    console.log("Channel is not available, attempting to reconnect...");
    await connectRabbitMQ();
  }
  return channel;
}
