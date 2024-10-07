import mongoose from "mongoose";

// Define the Company schema with correct data types based on your DataFrame
const companySchema = new mongoose.Schema({
  SL_No: { type: Number }, // Optional field
  Company: { type: String, unique: true, required: true }, // Required field
  Country: { type: String, required: true }, // Required field
  Country_Code: { type: String }, // Optional field
  Market_Cap: { type: String, sparse: true }, // Optional field
  Diversity: { type: Number }, // Optional field
  Stock_Price_2015: { type: String }, // Optional field
  Stock_Price_2016: { type: String }, // Optional field
  Stock_Price_2017: { type: String }, // Optional field
  Stock_Price_2018: { type: String }, // Optional field
  Stock_Price_2019: { type: String }, // Optional field
  Stock_Price_2020: { type: String }, // Optional field
  Stock_Price_2021: { type: String }, // Optional field
  Stock_Price_2022: { type: String }, // Optional field
  Stock_Price_2023: { type: String }, // Optional field
  Stock_Price_2024: { type: String }, // Optional field
  Stock_Price_2025: { type: String }, // Optional field
  Stock_Price_2026: { type: String }, // Optional field
  Expense_2015: { type: String }, // Optional field
  Expense_2016: { type: String }, // Optional field
  Expense_2017: { type: String }, // Optional field
  Expense_2018: { type: String }, // Optional field
  Expense_2019: { type: String }, // Optional field
  Expense_2020: { type: String }, // Optional field
  Expense_2021: { type: String }, // Optional field
  Expense_2022: { type: String }, // Optional field
  Expense_2023: { type: String }, // Optional field
  Expense_2024: { type: String }, // Optional field
  Expense_2025: { type: String }, // Optional field
  Expense_2026: { type: String }, // Optional field
  Revenue_2015: { type: String }, // Optional field
  Revenue_2016: { type: String }, // Optional field
  Revenue_2017: { type: String }, // Optional field
  Revenue_2018: { type: String }, // Optional field
  Revenue_2019: { type: String }, // Optional field
  Revenue_2020: { type: String }, // Optional field
  Revenue_2021: { type: String }, // Optional field
  Revenue_2022: { type: String }, // Optional field
  Revenue_2023: { type: String }, // Optional field
  Revenue_2024: { type: String }, // Optional field
  Revenue_2025: { type: String }, // Optional field
  Revenue_2026: { type: String }, // Optional field
  Market_share_2015: { type: Number }, // Optional field
  Market_share_2016: { type: Number }, // Optional field
  Market_share_2017: { type: Number }, // Optional field
  Market_share_2018: { type: Number }, // Optional field
  Market_share_2019: { type: Number }, // Optional field
  Market_share_2020: { type: Number }, // Optional field
  Market_share_2021: { type: Number }, // Optional field
  Market_share_2022: { type: Number }, // Optional field
  Market_share_2023: { type: Number }, // Optional field
  Market_share_2024: { type: Number }, // Optional field
  Market_share_2025: { type: Number }, // Optional field
  Market_share_2026: { type: Number }, // Optional field
  Company_Count: { type: Number }, // Optional field
  Greater_Diversity_Count: { type: Number }, // Optional field
  Greater_Market_Share_Domestic: { type: Number }, // Optional field
  Greater_Market_Share_Global: { type: Number }, // Optional field
  Greater_Revenue_Domestic: { type: Number }, // Optional field
  Greater_Revenue_Global: { type: Number }, // Optional field
  Greater_Expense_Domestic: { type: Number }, // Optional field
  Greater_Expense_Global: { type: Number }, // Optional field
  Greater_Stock_Price_Domestic: { type: Number }, // Optional field
  Greater_Stock_Price_Global: { type: Number }, // Optional field
});

// Check if the model already exists to avoid re-compilation
const Company =
  mongoose.models.company_final ||
  mongoose.model("company_final", companySchema);

module.exports = Company;
