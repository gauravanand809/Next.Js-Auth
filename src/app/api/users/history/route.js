import User from "../../../../models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";
import History from "../../../../models/HistoryModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Connect to the database
connect();

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

    // Access cookies and retrieve the token and email from session
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const emailSession = cookieStore.get("user_email")?.value || null;

    console.log("user_email from session:", emailSession);

    // Return unauthorized if no token or session is found
    if (!token && !emailSession) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: No token or session found" }),
        { status: 401 }
      );
    }

    let email = emailSession || ""; // Initialize email from session, if available

    // Decode JWT token if session email is not available
    if (!email && token) {
      try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        email = decodedToken.email;
        console.log("Decoded email from token:", email);
      } catch (err) {
        return new Response(JSON.stringify({ error: "Invalid token" }), {
          status: 401,
        });
      }
    }

    // Ensure email is available
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Email not found" }),
        { status: 401 }
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

        // Push the new company history to the array
        $push: {
          companyHistory: {
            companyName: searchTerm,
            timestamp: currentTime,
          },
        },
      },
      { new: true, upsert: true } // Create a new document if it doesn't exist
    );

    // Optionally cache the company name, date, and time in the browser (for client-side use)
    if (typeof window !== "undefined") {
      const cacheData = {
        companyName: searchTerm,
        date: new Date(currentTime).toLocaleDateString(),
        time: new Date(currentTime).toLocaleTimeString(),
      };
      localStorage.setItem("companyCache", JSON.stringify(cacheData));
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: "History recorded successfully", result }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving history:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to save history",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
