import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const RevenueChart2024 = ({ data }) => {
  // Check if data is valid; if not, return a fallback message
  if (!data || typeof data !== "object") {
    return <p>No data available</p>; // Return a fallback message if data is null or invalid
  }

  // Map over the data to extract revenue information
  const revenueData = Object.keys(data)
    .filter(
      (key) => key.startsWith("Revenue_") && parseInt(key.split("_")[1]) >= 2024
    ) // Filter only revenue columns up to the year 2024
    .map((key) => ({
      year: key.split("_")[1], // Extract the year from the column name
      revenue: parseFloat(data[key].replace(/[^\d.-]/g, "")) || 0, // Clean the revenue values, keeping the number
    }));

  // Find the minimum and maximum revenue to define a better Y-axis domain
  const revenueValues = revenueData.map((entry) => entry.revenue);
  const minRevenue = Math.min(...revenueValues);
  const maxRevenue = Math.max(...revenueValues);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={revenueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
          domain={[minRevenue * 0.99, maxRevenue * 1.01]} // Create padding around the min and max values
          tickCount={10} // Increase the number of ticks for more granular steps
          tickFormatter={(value) => `$${value.toFixed(2)}M`} // Format with 2 decimal places
        />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}M`} />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#82ca9d"
          dot={{ r: 5 }} // Add markers with size 5
        >
          {/* Display values at the top of the points */}
          <LabelList dataKey="revenue" position="top" formatter={(value) => `$${value.toFixed(2)}M`} />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart2024;
