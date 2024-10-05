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

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Error Boundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong while rendering the chart.</h1>;
    }

    return this.props.children;
  }
}

// Function to convert stock price strings into numbers
const parseStockPrice = (priceString) => {
  if (typeof priceString !== "string") return 0; // Fallback to 0 if input is not a string

  // Clean the string to extract the numeric part
  const cleanString = priceString.replace(/[^\d.MB]/g, "");

  // Determine the multiplier based on the suffix
  let multiplier = 1;
  if (cleanString.endsWith("M")) {
    multiplier = 1e6; // Million
  } else if (cleanString.endsWith("B")) {
    multiplier = 1e9; // Billion
  }

  // Extract the number and parse it
  const numericValue = parseFloat(cleanString.slice(0, -1)); // Remove the last character (M or B) and parse

  return (numericValue || 0) * multiplier; // Fallback to 0 if parsing fails
};

// Function to format stock price for display
const formatStockPrice = (value) => {
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`; // Format as billion
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`; // Format as million
  }
  return `$${value}`; // Format as is
};

const StockPriceChart = ({ data }) => {
  // Check if data is valid
  if (!data || typeof data !== "object") {
    return <p>No data available for stock prices.</p>; // Return a fallback message if data is null or invalid
  }

  // Prepare stock price data
  const stockData = Object.keys(data)
    .filter((key) => key.startsWith("Stock_Price_")) // Filter only the stock price columns
    .map((key) => ({
      year: key.split("_")[2], // Extract the year from the column name (e.g., "2015" from "Stock_Price_2015")
      stock_price: parseStockPrice(data[key]), // Use the parse function to get a number
    }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={stockData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis tickFormatter={formatStockPrice} /> {/* Use the format function here */}
        <Tooltip formatter={(value) => formatStockPrice(value)} /> {/* Format tooltip values */}
        <Legend />
        <Line
          type="monotone"
          dataKey="stock_price"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Wrapping the StockPriceChart with ErrorBoundary
const WrappedStockPriceChart = (props) => (
  <ErrorBoundary>
    <StockPriceChart {...props} />
  </ErrorBoundary>
);

export default WrappedStockPriceChart;
