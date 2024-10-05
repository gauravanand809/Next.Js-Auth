// pages/history.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("/api/users/history");
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-b from-indigo-600 to-purple-700">
      <div className="bg-white shadow-lg rounded-lg p-2 flex flex-col flex-grow">
        <h1 className="text-xl font-bold text-center text-white mb-2 bg-indigo-700 p-1 rounded">
          Search History
        </h1>
        {history.length > 0 ? (
          <ul className="space-y-0.5">
            {history.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-1 border-b border-gray-300 text-xs"
              >
                <span className="font-semibold">{item.searchTerm}</span>
                <span className="text-gray-600">
                  {new Date(item.date).toLocaleString()}
                </span>
                {item.companyName && item.companyLink && (
                  <a
                    href={item.companyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-xs"
                  >
                    {item.companyName}
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600 text-xs">
            No search history found.
          </p>
        )}
      </div>
    </div>
  );
};

export default History;
