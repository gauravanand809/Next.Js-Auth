import History from "../../../../models/HistoryModel.js";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";

connect();

export async function GET() {
  try {
    // Retrieve token and email from cookies
    const token = cookies().get("token")?.value;
    const emailSession = cookies().get("user_email")?.value;
    let email = "";

    console.log("JWT Token:", token);
    console.log("Session Email:", emailSession);

    // First, check if session email exists (for NextAuth)
    if (emailSession) {
      console.log("Email from session found:", emailSession);
      email = emailSession;
    } else if (token) {
      // If no session email, check for JWT token and verify it
      console.log("Token found, verifying...");
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      email = decoded.email;
      console.log("Decoded Email from token:", email);
    }

    // If neither session email nor token is present
    if (!email) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized access: No email or token found",
        }),
        {
          status: 401,
        }
      );
    }

    // Find user by email
    console.log("Looking up user by email:", email);
    const user = await User.findOne({ email: email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    console.log("User found:", user);

    // Find history for the user
    const Hispage = await History.find({ userId: user._id });
    console.log("User History:", Hispage);

    return new Response(JSON.stringify(Hispage), { status: 200 });
  } catch (error) {
    console.log("Error at history route.js:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while fetching history",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
