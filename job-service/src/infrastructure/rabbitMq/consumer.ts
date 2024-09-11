import { IDependencies } from "../../application/interfaces/IDependencies";
import { processJobApplicationUseCase } from "../../application/useCases";
import { IApplication } from "../../domain/interface/IApplication";
import { getChannel } from "./rabbit.config";

export async function consumeJobApplications(
  jobApplicationQueue: string,
  dependencies: IDependencies
): Promise<void> {
  try {
    const channel = getChannel();
    if (!channel) {
      throw new Error("RabbitMQ channel not available");
    }

    // Setup for receiving job applications
    await channel.assertQueue(jobApplicationQueue, { durable: true });
    await channel.assertExchange("jobServiceExchange", "direct", {
      durable: true,
    });
    await channel.bindQueue(jobApplicationQueue, "jobServiceExchange", "");

    // Setup for sending messages back to user service
    const userServiceExchange = "userServiceExchange";
    const userServiceQueue = "userServiceQueue";
    await channel.assertExchange(userServiceExchange, "direct", {
      durable: true,
    });
    await channel.assertQueue(userServiceQueue, { durable: true });
    await channel.bindQueue(userServiceQueue, userServiceExchange, "");

    const { execute } = processJobApplicationUseCase(dependencies);

    channel.consume(jobApplicationQueue, async (msg: any) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        console.log("Received job application message:", message);

        try {
          const result = await execute(message);

          // Send the result back to the user service
          channel.publish(
            userServiceExchange,
            "",
            Buffer.from(
              JSON.stringify({
                userId: message.freelancerId, // Assuming this is how we identify the user
                success: result.success,
                message: result.message,
              })
            )
          );
          console.log(
            `Result sent to user service: ${
              result.success ? "Success" : "Failure"
            } - ${result.message}`
          );

          channel.ack(msg); // Acknowledge the original message
        } catch (error) {
          console.error("Error processing job application:", error);

          // Send error message back to the user service
          channel.publish(
            userServiceExchange,
            "",
            Buffer.from(
              JSON.stringify({
                userId: message.freelancerId,
                success: false,
                message:
                  "An unexpected error occurred while processing your application.",
              })
            )
          );

          channel.ack(msg); // Acknowledge the message even in case of error
        }
      }
    });

    console.log(`Waiting for messages in queue: ${jobApplicationQueue}`);
  } catch (error) {
    console.error("Error setting up job application consumer:", error);
    throw error;
  }
}
