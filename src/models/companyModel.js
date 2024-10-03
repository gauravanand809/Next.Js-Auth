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
  Country: String,
  Country_Code: String,
  Market_Cap: mongoose.Schema.Types.Mixed,
  Diversity: mongoose.Schema.Types.Mixed,
  Stock_Price: {
    2015: mongoose.Schema.Types.Mixed,
    2016: mongoose.Schema.Types.Mixed,
    2017: mongoose.Schema.Types.Mixed,
    2018: mongoose.Schema.Types.Mixed,
    2019: mongoose.Schema.Types.Mixed,
    2020: mongoose.Schema.Types.Mixed,
    2021: mongoose.Schema.Types.Mixed,
    2022: mongoose.Schema.Types.Mixed,
    2023: mongoose.Schema.Types.Mixed,
    2024: mongoose.Schema.Types.Mixed,
  },
  Expense: {
    2015: mongoose.Schema.Types.Mixed,
    2016: mongoose.Schema.Types.Mixed,
    2017: mongoose.Schema.Types.Mixed,
    2018: mongoose.Schema.Types.Mixed,
    2019: mongoose.Schema.Types.Mixed,
    2020: mongoose.Schema.Types.Mixed,
    2021: mongoose.Schema.Types.Mixed,
    2022: mongoose.Schema.Types.Mixed,
    2023: mongoose.Schema.Types.Mixed,
    2024: mongoose.Schema.Types.Mixed,
  },
  Revenue: {
    2015: mongoose.Schema.Types.Mixed,
    2016: mongoose.Schema.Types.Mixed,
    2017: mongoose.Schema.Types.Mixed,
    2018: mongoose.Schema.Types.Mixed,
    2019: mongoose.Schema.Types.Mixed,
    2020: mongoose.Schema.Types.Mixed,
    2021: mongoose.Schema.Types.Mixed,
    2022: mongoose.Schema.Types.Mixed,
    2023: mongoose.Schema.Types.Mixed,
    2024: mongoose.Schema.Types.Mixed,
  },
  Market_Share: {
    2015: mongoose.Schema.Types.Mixed,
    2016: mongoose.Schema.Types.Mixed,
    2017: mongoose.Schema.Types.Mixed,
    2018: mongoose.Schema.Types.Mixed,
    2019: mongoose.Schema.Types.Mixed,
    2020: mongoose.Schema.Types.Mixed,
    2021: mongoose.Schema.Types.Mixed,
    2022: mongoose.Schema.Types.Mixed,
    2023: mongoose.Schema.Types.Mixed,
    2024: mongoose.Schema.Types.Mixed,
  },
});

// Check if the model already exists to avoid re-compilation
const Company =
  mongoose.models.Company ||
  mongoose.model("Company", companySchema, "Company Data");

export default Company;
module.exports = Company;
