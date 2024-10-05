import User from "../../../../models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";
import HistoryModel from "../../../../models/HistoryModel"; // Create this model for history
import { cookies } from "next/headers"; // Use next/headers for cookies
import jwt from "jsonwebtoken"; // Import jwt for decoding tokens

connect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { pageUrl, timestamp, searchTerm } = req.body;

      // Access cookies using next/headers
      const cookieStore = cookies();
      const token = cookieStore.get("token"); // Get the token cookie

      if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token found" });
      }

      // Decode the token to extract the user ID
      const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET); // Use jwt.verify to decode and verify the token

      // Extract user ID from the decoded token
      const email = decodedToken.email;
       // Assuming `sub` contains user ID in the token
      const user =await User.findOne({email:email});
      const userId = user._id;
      // Save history to the database
      const historyEntry = new HistoryModel({
        userId,
        pageUrl,
        timestamp,
        searchTerm: searchTerm,
      });

      await historyEntry.save();

      res.status(200).json({ message: "History recorded successfully" });
    } catch (error) {
      console.error("Error saving history:", error); // Log error for debugging
      res.status(500).json({ error: "Failed to save history" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
