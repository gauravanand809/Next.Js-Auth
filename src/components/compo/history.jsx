import React from "react";



const History = ({ history }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {history.length === 0 ? (
        <p className="text-gray-500">No history found.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((entry, index) => (
            <li key={index} className="border-b border-gray-200 pb-2">
              <p>
                <strong>Search Term:</strong> {entry.searchTerm}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(entry.timestamp).toLocaleString()}
              </p>
              <p>
                <strong>Page URL:</strong>{" "}
                <a href={entry.pageUrl}>{entry.pageUrl}</a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
