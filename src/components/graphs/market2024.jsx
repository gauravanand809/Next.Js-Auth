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

const MarketShareChart2024 = ({ data }) => {
  // Extract market share data from the provided data prop
  if (!data || typeof data !== "object") {
    return <p>No data available</p>; // Return a fallback message if data is null or invalid
  }

const marketShareData = Object.keys(data)
  .filter(
    (key) =>
      key.startsWith("Market_share_") && parseInt(key.split("_")[2]) >= 2024
  ) // Filter only market share columns up to the year 2024
  .map((key) => ({
    year: key.split("_")[2], // Extract the year from the column name
    market_share: data[key], // Get the market share value
  }));


  // Custom formatter for YAxis to add percentage symbol
  const formatPercent = (value) => `${value}%`;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={marketShareData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          angle={-45} // Rotate the X-axis labels by -45 degrees
          textAnchor="end" // Align the text to the end of the rotated tick
          interval={0} // Show all ticks
        />
        {/* YAxis with custom tick formatter for percentages */}
        <YAxis tickFormatter={formatPercent} />
        {/* Tooltip with percentage display */}
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey="market_share" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MarketShareChart2024;
