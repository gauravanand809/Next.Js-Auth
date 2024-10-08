const { notDeepEqual } = require("assert");

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
   
  return result;
}

const pt = generateRandomString(10);
console.log(pt);

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

// h9i