import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pageUrl: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  CompanyName:{
    type:String,
    required:true
  }
});

export default mongoose.models.History ||
  mongoose.model("History", historySchema);
