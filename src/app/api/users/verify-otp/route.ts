import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

interface User {
  email: string;
  otp?: string;
  otpExpiry?: Date;
  isVerifiedOTP?: boolean;
  save: () => Promise<void>;
}

// Named export for POST method
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }
    console.log(email,otp);
    
    const user: User | null = await User.findOne({ email:email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log(user.email,user.otp,user.otpExpiry);
    // Check if OTP is valid
    if (user.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }
    
    // Check if OTP has expired
    const otpExpirationTime = new Date(user.otpExpiry || "");
    console.log("Stored OTP:", user.otp);
    console.log("Current time:", new Date());
    console.log("OTP Expiry time:", otpExpirationTime);
    if (otpExpirationTime < new Date()) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    // If OTP is valid and not expired, mark the user as verified
    user.isVerifiedOTP = true;
    user.otp = undefined; // Clear the OTP from the database
    user.otpExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: 'OTP verified successfully, email verified!',
      success:true,
     }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
