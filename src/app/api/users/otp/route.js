import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dotenv from "dotenv";
import { use } from "react";
import { sendEmail } from "../../../../helpers/otp_mail";

dotenv.config();
connect();

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
   
  return result;
}

export default async function GET(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        message: "Token not found",
        success: false,
      },
      { status: 401 }
    );
  }

  try {
    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
      throw new Error("TOKEN_SECRET is not defined");
    }

    const tokenData = jwt.verify(token, tokenSecret);
    const username = tokenData.username;
    const email = tokenData.email;

    // Generate random string for some use case
    const randomString = generateRandomString(10);
    const user = await User.findOne({username:username});
    user.otp = randomString;
    const id = user._id;
    await sendEmail({ email, userId: id });

    return NextResponse.json({
      message: "Token successfully decoded",
      success: true,
      username,
      email,
      randomString,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Invalid token: " + error.message,
        success: false,
      },
      { status: 401 }
    );
  }
}
