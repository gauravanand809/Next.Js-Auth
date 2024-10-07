import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ data }) => {
  // Check if data is valid; if not, return a fallback message
  if (!data || typeof data !== "object") {
    return <p>No data available</p>; // Return a fallback message if data is null or invalid
  }

  // Map over the data to extract revenue information
const revenueData = Object.keys(data)
  .filter(
    (key) => key.startsWith("Revenue_") && parseInt(key.split("_")[1]) <= 2024
  ) // Filter only the revenue columns for 2024 and earlier
  .map((key) => ({
    year: key.split("_")[1], // Extract the year from the column name (e.g., "2024" from "Revenue_2024")
    revenue: parseFloat(data[key].replace(/[^\d.-]/g, "")) || 0, // Clean the revenue values, keeping the number
  }));


  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
          tickFormatter={(value) => `$${value}M`} // Add "$" in front and "M" at the end
        />
        <Tooltip formatter={(value) => `$${value}M`} /> {/* Format tooltip values similarly */}
        <Legend />
        <Bar dataKey="revenue" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
