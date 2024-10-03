import mongoose, { ObjectId } from "mongoose";

export interface ITransaction {
  offerId:  ObjectId;
  contractTitle: string;
  sender: {
    type: string;
    accountType: string;
    senderId: string;
  };
  receiver: {
    type: string;
    accountType: string;
    receiverId: string;
  };
  status: "issued" | "due" | "overdue" | "paid";
  totalAmount: number;
  dueDate?: Date;
}

// src/domain/entities/payment.ts

export interface IPayment {
  _id?: string;
  offerId: ObjectId;
  contractTitle: string;
  sender: {
    accountType: string;
    senderId: string;
  };
  receiver: {
    accountType: string;
    receiverId: string;
  };
  status: "issued" | "due" | "overdue" | "paid";
  totalAmount: number;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
  
}

export interface IMileStone {
  _id?: string;
  contractTitle: string;
  title: string;
  description: string;
  amount: number;
  dueDate: Date;
  
}
