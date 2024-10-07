import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Dot,
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
    .filter(
      (key) =>
        key.startsWith("Stock_Price_") && parseInt(key.split("_")[2]) >= 2024 // Filter for stock prices from 2024 onwards
    )
    .map((key) => ({
      year: key.split("_")[2], // Extract the year from the column name (e.g., "2024" from "Stock_Price_2024")
      stock_price: parseStockPrice(data[key]), // Use the parse function to get a number
    }));

  // Find min and max stock price to customize Y-axis range
  const stockPrices = stockData.map((entry) => entry.stock_price);
  const minPrice = Math.min(...stockPrices);
  const maxPrice = Math.max(...stockPrices);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={stockData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis
          domain={[minPrice * 0.95, maxPrice * 1.08]} // Add buffer to min and max prices
          tickCount={10} // Increase the number of ticks for better granularity
          tickFormatter={formatStockPrice} // Format Y-axis ticks
        />
        <Tooltip formatter={(value) => formatStockPrice(value)} />
        {/* Format tooltip values */}
        <Legend />
        <Area
          type="monotone"
          dataKey="stock_price"
          stroke="#8884d8"
          fill="#8884d8"
          activeDot={{ r: 8 }} // Highlight active dots
          dot={{ r: 5, stroke: "#8884d8", strokeWidth: 2, fill: "white" }} // Add markers (dots)
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Wrapping the StockPriceChart with ErrorBoundary
const WrappedStockPriceChart2024 = (props) => (
  <ErrorBoundary>
    <StockPriceChart {...props} />
  </ErrorBoundary>
);

export default WrappedStockPriceChart2024;
