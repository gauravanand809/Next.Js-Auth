// helpers/mailer.ts

import nodemailer from "nodemailer";
import User from '@/models/userModel'
import {connect} from '@/dbConfig/dbConfig'
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

connect();
// Generate a random 6-digit OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendEmail = async ({ email, userId }: any) => {
  try {
    const token = crypto.randomBytes(32).toString("hex"); // Generate a random token for verification link
    const otp = generateOTP(); // Generate OTP locally

    const user = await User.findOne({email:email});
    user.otp = otp;
    user.otpExpiry = Date.now()+3600000;
    await user.save();
    // Create the transporter for sending email via SMTP
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verification URL to send via email
    const verificationUrl = `http://${process.env.DOMAIN}/verify-otp?token=${token}`;

    const mailOptions = {
      from: "support@feedback360.xyz",
      to: email,
      subject: "Your OTP Code",
      html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Your OTP Code</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            background-color: #4CAF50;
                            color: white;
                            padding: 10px 0;
                            border-radius: 8px 8px 0 0;
                        }
                        .content {
                            margin: 20px;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 40px;
                            color: #888888;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Your OTP Code</h2>
                        </div>
                        <div class="content">
                            <p>Hello ${user.username},</p>
                            <p>Your OTP code is <strong>${otp}</strong>.</p>
                            <p>Please enter this code in the application to verify your identity.</p>
                            <p>You can also verify your OTP by clicking the link below:</p>
                            <div>
                                <a href="${verificationUrl}">Verify OTP</a>
                            </div>
                            <p>This OTP is valid for 5 minutes.</p>
                        </div>
                        <div class="footer">
                            <p>If you did not request this, please ignore this email.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Mail response:", mailResponse); // Log the mail response
    return mailResponse;
  } catch (error: any) {
    console.error("Error in sendEmail:", error);
    throw new Error(error.message);
  }
};
