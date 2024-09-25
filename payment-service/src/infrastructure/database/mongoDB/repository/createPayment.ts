import { IPayment } from "../../../../domain/interface/ITransaction";
import {  PaymentModel } from "../model/paymentModel";
import mongoose from "mongoose";

export const createPaymentRepository = async (
  paymentData: IPayment
): Promise<IPayment> => {
  try {
    const newPayment = new PaymentModel(paymentData);
    const savedPayment = await newPayment.save();
    return savedPayment.toObject();
  } catch (error) {
    console.error("Error in creating payment:", error);
    throw error;
  }
};