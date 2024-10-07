import History from "../../../../models/HistoryModel.js"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
connect();

export async function GET() {
  try {
    // Retrieve token from cookies and log it
    // console.log("HIIIIIIIIIIIIII")
    const token = cookies().get("token")?.value;
    console.log("JWT Token:", token);

    if (!token) {
      return new Response(JSON.stringify({ error: "Token not found" }), {
        status: 401,
      });
    }
    console.log("token found ",token);
    // Verify token and retrieve email
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const email = decoded.email;
    console.log("Decoded Email:", email);

    // Find user by email
    const user = await User.findOne({ email:email });
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
    console.log("Error at history route.js", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while fetching history",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
