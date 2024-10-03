import { connect } from "@/dbConfig/dbConfig";
import { Company } from "../../../../models/companyModel";

connect();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const companyName = searchParams.get("companyName");

    // Check if companyName is provided
    if (!companyName) {
      return new Response(
        JSON.stringify({ message: "Please provide a company name" }),
        { status: 400 },
      );
    }

    const companyDetail = await Company.findOne({ Company: companyName });

    if (!companyDetail) {
      return new Response(JSON.stringify({ message: "Company not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(companyDetail), { status: 200 });
  } catch (error) {
    console.log("Error at search route.ts");
    return new Response(
      JSON.stringify({
        error: "An error occurred while fetching company details",
        details: error.message,
      }),
      { status: 500 },
    );
  }
}
