import User from "../../../../models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";
import History from "../../../../models/HistoryModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Connect to the database
connect();

// Named export for the POST method
export async function POST(req) {
  try {
    // Parse request body
    const { pageUrl, timestamp, searchTerm } = await req.json();

    // Check if searchTerm is provided
    if (!searchTerm) {
      return new Response(JSON.stringify({ error: "Missing search term" }), {
        status: 400,
      });
    }

    // Access cookies and retrieve the token
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const emailSession = cookieStore.get("user_email");

    // Return unauthorized if no token or session is found
    if (!token && !emailSession) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: No token or session found" }),
        { status: 401 }
      );
    }

    let email = ""; // Initialize email variable

    // Decode token to get the user's email
    if (token) {
      const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET);
      email = decodedToken.email;
    }

    // If email session exists, use it
    if (emailSession) {
      email = emailSession.value;
    }

    // Ensure email is available
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Email not found" }),
        {
          status: 401,
        }
      );
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const userId = user._id;
    const currentTime = timestamp || Date.now(); // Use provided timestamp or current time

    // Update the user's history or insert a new one
    const result = await History.findOneAndUpdate(
      { userId },
      {
        $setOnInsert: { userId }, // Insert userId if it doesn't exist
        $set: { pageUrl }, // Update pageUrl in every operation
        $push: {
          companyHistory: {
            companyName: searchTerm,
            timestamp: currentTime,
          },
        },
      },
      { new: true, upsert: true } // Create a new document if it doesn't exist
    );

    // Return success response
    return new Response(
      JSON.stringify({ message: "History recorded successfully", result }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving history:", error);
    return new Response(JSON.stringify({ error: "Failed to save history" }), {
      status: 500,
    });
  }
}
