'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const History = () => {
  const [companyHistory, setCompanyHistory] = useState([]);
  const [displayedHistory, setDisplayedHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("/api/users/history_fetch");
        const historyData = response.data;
        const companyHistoryArray = historyData[0]?.companyHistory || [];

        const latestCompanyEntries = Object.values(
          companyHistoryArray.reduce((acc, entry) => {
            const { companyName, timestamp } = entry;
            if (
              !acc[companyName] ||
              new Date(acc[companyName].timestamp).getTime() < new Date(timestamp).getTime()
            ) {
              acc[companyName] = entry;
            }
            return acc;
          }, {})
        );

        const sortedHistory = latestCompanyEntries.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setCompanyHistory(sortedHistory);
        setDisplayedHistory(sortedHistory.slice(0, itemsToShow));
      } catch (error) {
        console.error("Error retrieving history:", error);
        setError("Failed to load history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [itemsToShow]);

  const loadMore = () => {
    const newItemsToShow = itemsToShow + 3;
    setItemsToShow(newItemsToShow);
    setDisplayedHistory(companyHistory.slice(0, newItemsToShow));
  };

  const handleCompanyClick = (companyName) => {
    console.log("Company Name clicked: ", companyName);
    router.push(`/Backtrack_to_History/${companyName}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
          <p className="text-gray-500 ml-2">Loading history...</p>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : displayedHistory.length > 0 ? (
        <div className="flex flex-col gap-4">
          {displayedHistory.map((entry) => (
            <div
              key={entry._id}
              className="border border-gray-200 bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
              onMouseEnter={() => {}}
            >
              <p className="text-md font-semibold">
                <strong>Company Name:</strong>{" "}
                <button
                  className="text-blue-600 underline hover:text-blue-800"
                  onClick={() => handleCompanyClick(entry.companyName)}
                >
                  {entry.companyName}
                </button>
              </p>
              <p className="text-gray-600">
                <strong>Timestamp:</strong>{" "}
                {new Date(entry.timestamp).toLocaleString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZoneName: "short",
                })}
              </p>
            </div>
          ))}
          
          {itemsToShow < companyHistory.length && (
            <div className="flex justify-center mt-4 col-span-1 md:col-span-2 lg:col-span-3">
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                onClick={loadMore}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No history found.</p>
      )}
    </div>
  );
};

export default History;

