import amqp from "amqplib";
import { IInviteFreelancer } from "../../domain/interface/IInviteFreelancer";

export async function sendInvitationToQueue(
  invitationData: IInviteFreelancer
): Promise<void> {
  try {
    const rabbitMqUrl = process.env.RABBITMQ_URL;
    if (!rabbitMqUrl) {
      throw new Error("RABBITMQ_URL environment variable is not set.");
    }

    const connection = await amqp.connect(rabbitMqUrl);
    const channel = await connection.createChannel();
    const exchange = "userManagementExchange";

    await channel.assertExchange(exchange, "direct", { durable: true });

    channel.publish(exchange, "", Buffer.from(JSON.stringify(invitationData)));
    console.log("Invitation sent to queue:", invitationData);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Failed to send invitation to queue:", error);
  }
}
