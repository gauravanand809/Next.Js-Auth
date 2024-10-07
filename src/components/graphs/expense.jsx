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
} from "recharts";

const ExpensesChart = ({ data }) => {
  // Check if data is valid; if not, return a fallback message
  if (!data || typeof data !== "object") {
    return <p>No data available</p>; // Return a fallback message if data is null or invalid
  }

  // Map over the data to extract expense information
const expenseData = Object.keys(data)
  .filter(
    (key) => key.startsWith("Expense_") && parseInt(key.split("_")[1]) <= 2024
  ) // Filter only the expense columns for 2024 and earlier
  .map((key) => ({
    year: key.split("_")[1], // Extract the year from the column name (e.g., "2024" from "Expense_2024")
    expense: parseFloat(data[key].replace(/[^\d.-]/g, "")) || 0, // Remove currency symbols and handle NaN
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={expenseData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          angle={-45} // Rotate the X-axis labels by -45 degrees
          textAnchor="end" // Align the text to the end of the rotated tick
          interval={0} // Show all ticks
        />
        <YAxis
          tickFormatter={(value) => `$${value}M`} // Format Y-axis with "$" in front and "M" at the end
        />
        <Tooltip formatter={(value) => `$${value}M`} /> {/* Format tooltip values similarly */}
        <Legend />
        <Line type="monotone" dataKey="expense" stroke="#ff7300" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpensesChart;
