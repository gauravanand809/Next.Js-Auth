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

const StockPriceComparisonChart = ({
  companyData,
  domesticCompanies,
  globalCompanies,
}) => {
  const data = [
    { name: companyData.name, stock_price: companyData.stock_price },
    ...domesticCompanies.map((company) => ({
      name: `${company.name} (Domestic)`,
      stock_price: company.stock_price,
    })),
    ...globalCompanies.map((company) => ({
      name: `${company.name} (Global)`,
      stock_price: company.stock_price,
    })),
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="stock_price" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StockPriceComparisonChart;
