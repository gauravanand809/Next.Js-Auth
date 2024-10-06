import mongoose from "mongoose";

// Define the company history sub-document schema
const companyHistorySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true, // Name of the company searched
  },
  timestamp: {
    type: Date,
    default: Date.now, // Default to current time if not provided
  },
});

// Define the main history schema
const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  pageUrl: {
    type: String,
    required: true, // The page URL being visited/searched
  },
  companyHistory: {
    type: [companyHistorySchema], // Array of sub-documents (company search history)
    default: [], // Initialize as an empty array
  },
});

// Create and export the History model
const History =
  mongoose.models.History || mongoose.model("History", historySchema);

export default History;
