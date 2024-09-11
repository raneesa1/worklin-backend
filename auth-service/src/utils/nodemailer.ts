import nodemailer from "nodemailer";
import { Request, Response } from "express";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "raneesak83@gmail.com",
    pass: "rqaa wwlz wucg ovwy",
  },
});
export const sendVerificationEmail = async (to: string, otp: string) => {
  await transporter.sendMail({
    from: {
      name: "worklin",
      address: "worklin freelancing port",
    },
    to,
    subject: "Your OTP Code",
    html: `<p>Your OTP code is ${otp}. It will expire in 10 minutes.</p>`,
  });
};