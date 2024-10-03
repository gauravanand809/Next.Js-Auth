import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
connect();

interface User {
  email: string;
  otp?: string;
  otpExpiry?: Date;
  isVerifiedOTP?: boolean;
  save: () => Promise<void>;
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    await connect(); // Connect to your DB (MongoDB, etc.)
    
    // Find user by email
    const user: User | null = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if OTP is valid
    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Check if OTP has expired (assuming you set an expiration date)
    const otpExpirationTime = new Date(user.otpExpiry || "");
    if (otpExpirationTime < new Date()) {
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // If OTP is valid and not expired, mark the user as verified
    user.isVerifiedOTP = true;
    user.otp = undefined; // Clear the OTP from the database
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully, email verified!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}