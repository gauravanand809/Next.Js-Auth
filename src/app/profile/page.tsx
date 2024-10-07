"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import User from "@/models/userModel";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession(); // Get the session data
  const [data, setData] = useState("nothing");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("Not Available");

  // Logout function
  const logout = async () => {
    try {
      signOut({ callbackUrl: "/login" });
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // Fetch user details
  const getUserDetails = async () => {
    setLoading(true); // Set loading state
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
      setUsername(res.data.username);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 py-10 px-4">
      <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Welcome, One step more to our Interactive Dashboard
        </h1>
        <hr className="mb-6 border-gray-300" />

        {/* Display user ID or message */}
       

        <div className="mt-6 space-y-4">
          {/* Get User Details Button */}
          <button
            onClick={getUserDetails}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Get User Details"}
          </button>

          {/* Search Companies Button */}
          <button
            onClick={() => router.push("/search")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out"
          >
            Search Companies
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
