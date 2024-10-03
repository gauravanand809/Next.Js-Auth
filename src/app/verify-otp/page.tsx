"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function OTPVerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(""); // Extract the email from query params
  const [loading, setLoading] = useState(false);

  const handleOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/users/verify-otp", { email, otp });

      if (response.data.success) {
        toast.success("OTP verified! Redirecting to profile...");
        router.push("/profile");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification error", error);
      toast.error("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          {loading ? "Verifying..." : "Enter OTP"}
        </h1>
        <hr className="mb-6" />

        <form onSubmit={handleOTPVerify}>
          <label htmlFor="otp" className="block text-gray-700 font-semibold mb-2">
            OTP
          </label>
          <input
            className="p-3 w-full border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-gray-800"
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter the OTP sent to your email"
            required
          />

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
