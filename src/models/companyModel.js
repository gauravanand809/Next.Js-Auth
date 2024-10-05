const mongoose = require("mongoose");

// Connect to your MongoDB cluster
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

// Define the Company schema with mixed data types
const companySchema = new mongoose.Schema({
  SL_No: mongoose.Schema.Types.Mixed,
  Company: { type: String, unique: true, required: true },
  Country: mongoose.Schema.Types.Mixed,
  Country_Code: mongoose.Schema.Types.Mixed,
  Market_Cap: mongoose.Schema.Types.Mixed,
  Diversity: mongoose.Schema.Types.Mixed,
  Stock_Price_2015: mongoose.Schema.Types.Mixed,
  Stock_Price_2016: mongoose.Schema.Types.Mixed,
  Stock_Price_2017: mongoose.Schema.Types.Mixed,
  Stock_Price_2018: mongoose.Schema.Types.Mixed,
  Stock_Price_2019: mongoose.Schema.Types.Mixed,
  Stock_Price_2020: mongoose.Schema.Types.Mixed,
  Stock_Price_2021: mongoose.Schema.Types.Mixed,
  Stock_Price_2022: mongoose.Schema.Types.Mixed,
  Stock_Price_2023: mongoose.Schema.Types.Mixed,
  Stock_Price_2024: mongoose.Schema.Types.Mixed,
  Expense_2015: mongoose.Schema.Types.Mixed,
  Expense_2016: mongoose.Schema.Types.Mixed,
  Expense_2017: mongoose.Schema.Types.Mixed,
  Expense_2018: mongoose.Schema.Types.Mixed,
  Expense_2019: mongoose.Schema.Types.Mixed,
  Expense_2020: mongoose.Schema.Types.Mixed,
  Expense_2021: mongoose.Schema.Types.Mixed,
  Expense_2022: mongoose.Schema.Types.Mixed,
  Expense_2023: mongoose.Schema.Types.Mixed,
  Expense_2024: mongoose.Schema.Types.Mixed,
  Revenue_2015: mongoose.Schema.Types.Mixed,
  Revenue_2016: mongoose.Schema.Types.Mixed,
  Revenue_2017: mongoose.Schema.Types.Mixed,
  Revenue_2018: mongoose.Schema.Types.Mixed,
  Revenue_2019: mongoose.Schema.Types.Mixed,
  Revenue_2020: mongoose.Schema.Types.Mixed,
  Revenue_2021: mongoose.Schema.Types.Mixed,
  Revenue_2022: mongoose.Schema.Types.Mixed,
  Revenue_2023: mongoose.Schema.Types.Mixed,
  Revenue_2024: mongoose.Schema.Types.Mixed,
  Market_Share_2015: mongoose.Schema.Types.Mixed,
  Market_Share_2016: mongoose.Schema.Types.Mixed,
  Market_Share_2017: mongoose.Schema.Types.Mixed,
  Market_Share_2018: mongoose.Schema.Types.Mixed,
  Market_Share_2019: mongoose.Schema.Types.Mixed,
  Market_Share_2020: mongoose.Schema.Types.Mixed,
  Market_Share_2021: mongoose.Schema.Types.Mixed,
  Market_Share_2022: mongoose.Schema.Types.Mixed,
  Market_Share_2023: mongoose.Schema.Types.Mixed,
  Market_Share_2024: mongoose.Schema.Types.Mixed,
});

// Check if the model already exists to avoid re-compilation
const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);

// Function to create and save a new company instance
const addNewCompany = async (companyData) => {
  try {
    const newCompany = new Company(companyData);
    await newCompany.save();
    console.log("Company saved successfully");
  } catch (error) {
    console.error("Error saving company:", error);
  }
};

// Function to query a company by name
const findCompany = async (companyName) => {
  try {
    const companyDetails = await Company.findOne({ Company: companyName });
    if (companyDetails) {
      console.log(companyDetails.Country_Code);
    } else {
      console.log("No company found");
    }
  } catch (error) {
    console.error("Error fetching details:", error);
  }
};

// Example usage
const exampleCompanyData = {
  SL_No: 1,
  Company: "Zooxo",
  Country: "Ukraine",
  Country_Code: "UAH",
  Market_Cap: "$2.34B",
  Diversity: 43.5,
  Stock_Price_2015: "$636.19M",
  Stock_Price_2016: "$36.17B",
  Stock_Price_2017: "n/a",
  Stock_Price_2018: "$1.06B",
  Stock_Price_2019: "$308.22M",
  Stock_Price_2020: "$514.13M",
  Stock_Price_2021: "$21.66M",
  Stock_Price_2022: "$555.7M",
  Stock_Price_2023: "$355.28M",
  Stock_Price_2024: "n/a",
  Expense_2015: "$20101562.63",
  Expense_2016: "$51007842.36",
  Expense_2017: "$62056576.98",
  Expense_2018: "$79478124.95",
  Expense_2019: "$52885481.03",
  Expense_2020: "$71228506.48",
  Expense_2021: "$17224689.73",
  Expense_2022: "$96688655.13",
  Expense_2023: "$67582493.42",
  Expense_2024: "$81035180.73",
  Revenue_2015: "$11889859.91",
  Revenue_2016: "$12926239.97",
  Revenue_2017: "$26106119.10",
  Revenue_2018: "$86658338.25",
  Revenue_2019: "$21961920.16",
  Revenue_2020: "$93825082.89",
  Revenue_2021: "$50393952.13",
  Revenue_2022: "$78632245.86",
  Revenue_2023: "$95627554.77",
  Revenue_2024: "$39485065.72",
  Market_share_2015: 28.24,
  Market_share_2016: 42.01,
  Market_share_2017: 73.14,
  Market_share_2018: 90.64,
  Market_share_2019: 56.8,
  Market_share_2020: 48.79,
  Market_share_2021: 35.4,
  Market_share_2022: 65.88,
  Market_share_2023: 38.85,
  Market_share_2024: 77.69,
};

// Save a new company to the database
addNewCompany(exampleCompanyData);

// Find and display a company by name
findCompany("Zooxo");

module.exports = Company;
