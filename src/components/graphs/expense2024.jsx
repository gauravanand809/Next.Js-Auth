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

const ExpensesChart2024 = ({ data }) => {
  // Check if data is valid; if not, return a fallback message
  if (!data || typeof data !== "object") {
    return <p>No data available</p>; // Return a fallback message if data is null or invalid
  }

  // Map over the data to extract expense information
  const expenseData = Object.keys(data)
    .filter(
      (key) => key.startsWith("Expense_") && parseInt(key.split("_")[1]) >= 2024
    ) // Filter only expense columns from 2024 onward
    .map((key) => ({
      year: key.split("_")[1], // Extract the year from the column name (e.g., "2024" from "Expense_2024")
      expense: parseFloat(data[key].replace(/[^\d.-]/g, "")) || 0, // Remove currency symbols and handle NaN
    }));

  // Find the minimum and maximum expense to define a better Y-axis domain
  const expenseValues = expenseData.map((entry) => entry.expense);
  const minExpense = Math.min(...expenseValues);
  const maxExpense = Math.max(...expenseValues);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={expenseData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
          domain={[minExpense * 0.99, maxExpense * 1.01]} // Create padding around the min and max values
          tickCount={10} // Increase the number of ticks for more granular steps
          tickFormatter={(value) => `$${value.toFixed(2)}M`} // Format Y-axis values with 2 decimal places
        />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}M`} /> {/* Format tooltip values similarly */}
        <Legend />
        <Bar dataKey="expense" fill="#8884d8" barSize={30} /> {/* Use purple color for bars */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpensesChart2024;
