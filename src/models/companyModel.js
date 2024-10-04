const mongoose = require("mongoose");

// Connect to your MongoDB cluster
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

const companySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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

// Example query to find a company
const details = Company.findOne({ Company: "Zooxo" });
details
  .then((data) => {
    console.log(data.Country_Code);
  })
  .catch((err) => {
    console.error("Error fetching details:", err);
  });

export default Company;
module.exports = Company;
