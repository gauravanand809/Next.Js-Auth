"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RevenueChart2024 from "@/components/graphs/revenue2024";
import ExpensesChart2024 from "@/components/graphs/expense2024";
import WrappedStockPriceChart2024 from "@/components/graphs/stock2024";
import RevenueChart from "@/components/graphs/revenue";
import ExpensesChart from "@/components/graphs/expense";
import MarketShareChart from "@/components/graphs/market";
import WrappedStockPriceChart from "@/components/graphs/stock";
import History from "../../../components/compo/history";

const BacktrackToHistory = ({ params }) => {
  const router = useRouter();
  const { companyName } = params;
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // For pagination

  const graphsPerPage = 4; // Define how many graphs you want per page

  useEffect(() => {
    if (companyName) {
      handleSearchClick();
    }
  }, [companyName]);

  const handleSearchClick = async () => {
    setLoading(true);
    setError(""); // Clear any previous errors
    try {
      const response = await axios.post(`/api/users/search`, { companyName });
      setCompanyDetails(response.data);
    } catch (error) {
      setCompanyDetails(null);
      setError("Error fetching company details. Please try again.");
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  // Determine which graphs to show on the current page
  const getCurrentGraphs = () => {
    const allGraphs = [
      <MarketShareChart data={companyDetails} />,
      <RevenueChart data={companyDetails} />,
      <ExpensesChart data={companyDetails} />,
      <WrappedStockPriceChart data={companyDetails} />,
      <RevenueChart2024 data={companyDetails} />,
      <ExpensesChart2024 data={companyDetails} />,
      <WrappedStockPriceChart2024 data={companyDetails} />,
    ];

    const startIndex = (currentPage - 1) * graphsPerPage;
    return allGraphs.slice(startIndex, startIndex + graphsPerPage);
  };

  // Show spinner while loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader"></div> {/* Loading spinner */}
      </div>
    );
  }

  // Show error message if exists
  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Left Section - History Tab */}
      <div className="lg:w-1/3 w-full p-4 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          History: {companyName}
        </h1>
        <History />
      </div>

      {/* Right Section - Graphs */}
      <div className="lg:w-2/3 w-full p-6 bg-white rounded-lg shadow-md">
        {companyDetails && (
          <>
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
              Company Analysis
            </h2>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Analysis & Predictions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Render graphs dynamically with pagination */}
                {getCurrentGraphs()}
              </div>
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-gray-300 rounded ${
                  currentPage === 1 ? "opacity-50" : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage >= Math.ceil(7 / graphsPerPage)} // Adjust based on total graph count
                className={`px-4 py-2 bg-gray-300 rounded ${
                  currentPage >= Math.ceil(7 / graphsPerPage)
                    ? "opacity-50"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BacktrackToHistory;
