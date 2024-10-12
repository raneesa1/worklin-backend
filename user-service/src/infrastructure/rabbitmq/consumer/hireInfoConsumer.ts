import { Channel, ConsumeMessage } from "amqplib";
import { updateClientWithNewHire } from "../../../application/useCases/updateClientWithNewHire";
import { getChannel } from "../rabbit.config";

export async function setupHireInfoConsumer() {
  const channel = getChannel();
  if (!channel) {
    console.error("RabbitMQ channel not available");
    return;
  }

  await channel.assertExchange("jobServiceExchange", "direct", {
    durable: true,
  });
  await channel.assertQueue("user_service_hire_info", { durable: true });
  await channel.bindQueue(
    "user_service_hire_info",
    "jobServiceExchange",
    "hire.info"
  );

  channel.consume(
    "user_service_hire_info",
    async (msg: ConsumeMessage | null) => {
      if (msg) {
        const hireInfo = JSON.parse(msg.content.toString());
        console.log("Received hire info:", hireInfo);

        try {
          await updateClientWithNewHire(hireInfo);
          console.log(
            hireInfo,
            "consoling the hire info from user service------------------>>>>>>"
          );
          console.log(
            `Client updated with new hire from job service to user ßervice now in user service: ${JSON.stringify(
              hireInfo
            )}`
          );
          channel.ack(msg);
        } catch (error) {
          console.error("Error updating client with new hire:", error);
          // Decide whether to ack, nack, or requeue based on your error handling strategy
        }
      }
    }
  );
}
