"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DiversityComparisonChart from "@/components/graphs/diversity";
import ExpensesChart from "@/components/graphs/expense";
import RevenueChart from "@/components/graphs/revenue";
import WrappedStockPriceChart from "@/components/graphs/stock";
import StockPriceComparisonChart from "@/components/graphs/globalstock";
import MarketShareChart from "@/components/graphs/market";
import SearchableDropdown from "../../helpers/searchableDrop";
import { companyData } from "../../../csvjsona";
import History from "../../components/compo/history";

const GraphSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [error, setError] = useState("");
  const [showGraph, setShowGraph] = useState(false);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<string[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<string[]>([]);
  const [searchType, setSearchType] = useState("Company");
  const [curr, setCurr] = useState("Loading");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = companyData;
        const companyNames = response.map(
          (item: { Company: string }) => item.Company
        );
        setCompanies(companyNames);
      } catch (error) {
        console.error("Error fetching companies: ", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = companies.filter((company) =>
        company.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies([]);
    }
  }, [searchTerm, companies]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.post(`/api/users/search`, {
        companyName: searchTerm,
      });
      setLoading(true);
      setCompanyDetails(response.data);
      setError("");
    } catch (error: any) {
      setCompanyDetails(null);
      setError("Error fetching company details. Please try again.");
      console.error("Error fetching data: ", error);
    }
  };

  const handleAnalyzeClick = async () => {
    setLoading(true);
    setShowGraph(false);

    // Prepare data for history logging
// Replace with actual user ID from your state or context
    const pageUrl = window.location.href; // Get the current page URL
    const timestamp = new Date().toISOString(); // Current timestamp

    // Send history data to API
    try {
      setTimeout(() => {
        setShowGraph(true);
        setLoading(false);
      }, 5000);
      await axios.post("/api/users/history", {
        pageUrl,
        timestamp,
        searchTerm, // Pass the search term for the company name
      });


      console.log("Analyze data with graph", companyDetails);
    } catch (error) {
      console.error("Error recording history:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-b from-indigo-600 to-purple-700">
      <div className="bg-white shadow-2xl rounded-2xl p-4 md:p-6 flex flex-row flex-grow">
        {/* Left Tile: Company Details */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex flex-col md:w-1/4 flex-grow h-full">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Search Company
          </h1>
          <div className="mb-2">
            <label
              htmlFor="search"
              className="block text-gray-800 font-semibold mb-1 text-md"
            >
              Company Name
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Enter company name..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-300 text-gray-900"
            />
          </div>

          {/* Filtered Companies Dropdown */}
          {filteredCompanies.length > 0 && (
            <div className="mt-2 border border-gray-300 rounded-lg max-h-40 overflow-y-auto bg-white">
              <ul className="bg-indigo-100 rounded-lg">
                {filteredCompanies.map((company, index) => (
                  <li
                    key={index}
                    className="p-2 bg-indigo-50 hover:bg-indigo-200 text-gray-900 cursor-pointer transition-colors duration-300 rounded-lg"
                    onClick={() => {
                      setSearchTerm(company);
                      setFilteredCompanies([]);
                    }}
                  >
                    {company}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleSearchClick}
            disabled={!searchTerm}
            className={`w-full p-2 bg-indigo-700 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-indigo-800 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 ${
              !searchTerm ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Search
          </button>

          {/* Error Message */}
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}

          {/* Enhanced Company Overview */}
          {companyDetails && (
            <div className="mt-4 flex flex-col space-y-3">
              <h2 className="text-lg font-semibold text-indigo-700 mb-1">
                Company Overview:
              </h2>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-center bg-white rounded-md shadow-sm border border-gray-300 p-2">
                  <strong className="text-gray-800">Company:</strong>
                  <span className="text-gray-600">
                    {companyDetails.Company}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white rounded-md shadow-sm border border-gray-300 p-2">
                  <strong className="text-gray-800">Country:</strong>
                  <span className="text-gray-600">
                    {companyDetails.Country}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white rounded-md shadow-sm border border-gray-300 p-2">
                  <strong className="text-gray-800">Market Cap:</strong>
                  <span className="text-gray-600">
                    {companyDetails.Market_Cap}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white rounded-md shadow-sm border border-gray-300 p-2">
                  <strong className="text-gray-800">Diversity Score:</strong>
                  <span className="text-gray-600">
                    {companyDetails.Diversity}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Tile: Graph and Analyze Button */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex flex-col md:w-3/4 flex-grow h-full">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
            Graph
          </h2>

          {/* Responsive Graphs Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow p-4">
            {loading ? (
              <div className="flex-grow flex items-center justify-center bg-gray-200 rounded-md border border-gray-400 h-full">
                <p className="text-gray-600">Loading...</p>
              </div>
            ) : (
              <>
                {showGraph && companyDetails && (
                  <>
                    <div className="flex flex-col items-center">
                      <MarketShareChart data={companyDetails} />
                    </div>
                    <div className="flex flex-col items-center">
                      <WrappedStockPriceChart data={companyDetails} />
                    </div>
                    <div className="flex flex-col items-center">
                      <RevenueChart data={companyDetails} />
                    </div>
                    <div className="flex flex-col items-center">
                      <ExpensesChart data={companyDetails} />
                    </div>
                    {/* Add more graphs here */}
                  </>
                )}
              </>
            )}
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyzeClick}
            disabled={!companyDetails}
            className={`w-full p-2 bg-green-600 text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 ${
              !companyDetails ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
};

export default GraphSearch;
