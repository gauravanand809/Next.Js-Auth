"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const GraphSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

const handleSearchClick = async () => {
  // console.log(searchTerm);
  try {
    const response = await axios.post(`/api/users/search`, {
      companyName: searchTerm, // Ensure companyName is sent as a JSON key
    },{
  headers: {
    'Content-Type': 'application/json', // This ensures the server understands the request format
  }});

    // Update the companyDetails state with the response data
    setCompanyDetails(response.data);
    setError("");
    
    
    // Clear error state if the request is successful
  } catch (error: any) {
    setCompanyDetails(null); // Clear previous company details if there's an error
    setError("Error fetching company details. Please try again.");
    console.error("Error fetching data: ", error);
  }
};



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Search Company
        </h1>
        <hr className="mb-8 border-gray-300" />

        {/* Search Bar */}
        <div className="mb-8">
          <label
            htmlFor="search"
            className="block text-gray-800 font-semibold mb-2 text-lg"
          >
            Company Name
          </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter company name..."
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 text-gray-900"
          />
        </div>

        <button
          onClick={handleSearchClick}
          disabled={!searchTerm}
          className={`w-full p-4 bg-indigo-600 text-white rounded-xl transition duration-300 ease-in-out transform hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 ${
            !searchTerm ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          Search
        </button>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {/* Company Details */}
        {companyDetails && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Company Details:</h2>
            <pre className="bg-gray-100 p-4 rounded-md">
              {JSON.stringify(companyDetails, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphSearch;
