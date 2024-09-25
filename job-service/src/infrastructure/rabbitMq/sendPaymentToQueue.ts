import amqp from "amqplib";
import { ITransaction } from "../../application/useCases";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://127.0.0.1:5672";
const EXCHANGE_NAME = "paymentManagementExchange"; 
export const sendPaymentToQueue = async (paymentData: any) => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

    channel.publish(
      EXCHANGE_NAME,
      "payment_routing_key",
      Buffer.from(JSON.stringify(paymentData))
    );

    console.log("Payment data sent to exchange:", paymentData);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error sending payment data to exchange:", error);
    throw error;
  }
};

const sendTransactionToPaymentService = async (transaction: ITransaction) => {
  try {
    await sendPaymentToQueue(transaction);
    console.log(
      `Transaction sent to payment service for offerId: ${transaction.offerId}`
    );
  } catch (error) {
    console.error(`Error sending transaction to payment service: ${error}`);
    throw new Error("Failed to send transaction to payment service");
  }
};
