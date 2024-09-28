
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession , signOut} from "next-auth/react";
connect();
export default async function UserProfile({ params }: any) {

const user = await User.findOne({ _id: params.id });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-6">
      <div className="bg-white/60 backdrop-blur-md shadow-2xl rounded-lg p-10 max-w-md w-full text-center transition-all duration-300 transform hover:scale-105 hover:bg-white/70">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          User Profile
        </h1>
        <hr className="mb-6 border-gray-300" />

        <p className="text-xl text-gray-800">
          Welcome to your profile,{" "}
          <span className="ml-2 p-2 bg-orange-500 text-white rounded-full shadow-lg inline-block">
            {user.username}
            {/* yha id ki jgh username ho ek bar ye bhi dekh le bss */}
            {/* jitne me fir aata hu  */}
          </span>
        </p>
        <div className="relative mt-4">
          <input
            type="text"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for companies..."
            className="border rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-black" // Added text-black class
          />
          {/* Loading indicator placeholder */}
          {/* {loading && <div className="absolute top-0 right-0 mt-2 mr-2">Loading...</div>} */}
          {/* Dropdown for search results */}
          <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg">
            {/* Example of how the dropdown would look */}
            {/* {results.length > 0 && (
              results.map((company) => (
                <div key={company._id} className="p-2 hover:bg-gray-100 cursor-pointer">
                  <strong>{company.name}</strong> - {company.location}
                </div>
              ))
            )} */}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            // onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
