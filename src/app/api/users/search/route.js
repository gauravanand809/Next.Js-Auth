import { connect } from "@/dbConfig/dbConfig";
import Company from "@/models/companyModel";
connect();

export async function POST(req) {
  try {
    const { companyName } = await req.json();
    console.log("Incoming request body:", companyName);
    if (!companyName) {
      return new Response(
        JSON.stringify({ message: "Please provide a company name" }),
        { status: 400 }
      );
    }
    console.log(companyName);
    const companyDetail = await Company.findOne({
      Company: { $regex: new RegExp(`^${companyName}$`, "i") }, // Case-insensitive regex
    });

    if (!companyDetail) {
      return new Response(JSON.stringify({ message: "Company not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(companyDetail), { status: 200 });
  } catch (error) {
    console.log("Error at search route.js", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while fetching company details",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
