"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MarketShareChart from "@/components/graphs/market";
import WrappedStockPriceChart from "@/components/graphs/stock";
import RevenueChart from "@/components/graphs/revenue";
import ExpensesChart from "@/components/graphs/expense";
import { companyData } from "../../../csvjsona";
import History from "../../components/compo/history"; // Import your History component here
import MarketShareChart2024 from "@/components/graphs/market2024";
import RevenueChart2024 from "@/components/graphs/revenue2024";
import ExpensesChart2024 from "@/components/graphs/expense2024";
import WrappedStockPriceChart2024 from "@/components/graphs/stock2024";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";


const GraphSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [error, setError] = useState("");
  const [showGraph, setShowGraph] = useState(false);
  const [showGraph2024, setShowGraph2024] = useState(false); // New state for 2024 graphs
  const [loading, setLoading] = useState(true);
  const [Predicting, setPredict]= useState(false);
  const [companies, setCompanies] = useState<string[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<string[]>([]);


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
    setShowGraph(true); // Show non-2024 graphs
    setShowGraph2024(false); // Ensure 2024 graphs are hidden
    setLoading(false);
    // Send history data to API
    try {
      const pageUrl = window.location.href; // Get the current page URL
      const timestamp = new Date().toISOString(); // Current timestamp
      await axios.post("/api/users/history", {
        pageUrl,
        timestamp,
        searchTerm, // Pass the search term for the company name
      });

      console.log("History recorded successfully.");
    } catch (error) {
      console.error("Error recording history:", error);
    }
  };

  const handlePredictClick = async () => {
    setLoading(true);
    setShowGraph2024(false); // Ensure 2024 graphs are hidden initially
    setShowGraph(false); 
    setPredict(true);
    
    // Show non-2024 graphs

    setTimeout(() => {
      setShowGraph(false); // Hide non-2024 graphs
      setShowGraph2024(true); // Show 2024 graphs
      setLoading(false);
      setPredict(false);
    }, 30000); // 5-second delay for showing 2024 graphs

    // Send history data to API
    try {
      const pageUrl = window.location.href; // Get the current page URL
      const timestamp = new Date().toISOString(); // Current timestamp
      await axios.post("/api/users/history", {
        pageUrl,
        timestamp,
        searchTerm, // Pass the search term for the company name
      });

      console.log("History recorded successfully.");
    } catch (error) {
      console.error("Error recording history:", error);
    }
  };

  const handleCompanyClick = (companyName: string) => {
    setSearchTerm(companyName);
    handleSearchClick(); // Trigger the search
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gradient-to-b from-pink-600 to-blue-500">
      <div className="bg-white/30 shadow-lg rounded-2xl p-6 md:p-8 flex-grow flex glass-effect">
        {/* Left Tile: Company Details & History */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 flex flex-col w-1/4 min-h-0 overflow-y-auto">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Search Company
          </h1>

          {/* Search Input */}
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
                    {companyDetails.Diversity}
                  </span>
                </div>
              </div>

              {/* Buttons at the bottom */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleAnalyzeClick}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
                >
                  Analyze
                </button>
                <button
                  onClick={handlePredictClick}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Predict
                </button>
              </div>
            </div>
          )}<div>
        </div>
        <div className="p-3">
          <h4><b> History </b> </h4>
          <History ></History>
        </div>
</div>
         {/* Right Tile: Graphs and Animation */}
        <div className="flex flex-col flex-grow ml-6 bg-white/70  rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Graphs Visualization
          </h2>

          {Predicting && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
            <p className="text-black text-lg mt-4">
              Predicting, please wait...
            </p>
          </div>
        )}

          {(!showGraph && !showGraph2024 && !Predicting) && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
              <p className="text-black text-lg mt-4">
                Waiting for data to generate cool insights...
              </p>
            </div>
          )}

          

          <div className="grid grid-cols-2 gap-4">
            {/* Show the first set of graphs */}
            {showGraph && (
              <>
                <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Market Share
                  </h3>
                  <MarketShareChart data={companyDetails} />
                </div>
                <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Stock Price
                  </h3>
                  <WrappedStockPriceChart data={companyDetails} />
                </div>
                <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Revenue
                  </h3>
                  <RevenueChart data={companyDetails} />
                </div>
                <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Expenses
                  </h3>
                  <ExpensesChart data={companyDetails} />
                </div>
                

                <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">Company Metrics Overview</h3>
                  <table className="min-w-full mt-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Metric</th>
                        <th className="border px-4 py-2">Domestic</th>
                        <th className="border px-4 py-2">Global</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">Greater Market Share</td>
                        <td className="border px-4 py-2">{companyDetails.Greater_Market_Share_Domestic}</td>
                        <td className="border px-4 py-2">{companyDetails.Greater_Market_Share_Global}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Greater Revenue</td>
                        <td className="border px-4 py-2">{companyDetails.Greater_Revenue_Domestic}</td>
                        <td className="border px-4 py-2">{companyDetails.Greater_Revenue_Global}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Greater Expenses</td>
                        <td className="border px-4 py-2">{companyDetails.Greater_Expense_Domestic}</td>
                        <td className="border px-4 py-2">{companyDetails.Greater_Expense_Global}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">Greater Stock Price</td>
                        <td className="border px-4 py-2">{companyDetails.Greater_Stock_Price_Domestic}</td>
                        <td className="border px-4 py-2">{companyDetails.Greater_Stock_Price_Global}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm">
  <h3 className="text-lg font-semibold text-gray-800">Other Insights</h3>
  <table className="min-w-full mt-4">
    <tbody>
      <tr>
        <td className="border px-4 py-2">Total Companies in Same Country:</td>
        <td className="border px-4 py-2">{companyDetails.Company_Count}</td>
      </tr>
      <tr>
        <td className="border px-4 py-2">Companies with Higher Diversity Score:</td>
        <td className="border px-4 py-2">{companyDetails.Greater_Diversity_Count}</td>
      </tr>
    </tbody>
  </table>
</div>



              </>
            )}

            {/* Show the second set of graphs for 2024 */}
            {showGraph2024 && (
              <>
                <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Revenue 2024
                  </h3>
                  <RevenueChart2024 data={companyDetails} />
                </div>
                <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Expenses 2024
                  </h3>
                  <ExpensesChart2024 data={companyDetails} />
                </div>
                <div className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Stock Price 2024
                  </h3>
                  <WrappedStockPriceChart2024 data={companyDetails} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphSearch;
