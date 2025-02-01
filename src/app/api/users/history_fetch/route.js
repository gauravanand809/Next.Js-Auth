export const dynamic = "force-dynamic"; // Ensure this route is always dynamic

export async function GET() {
  try {
    const token = cookies().get("token")?.value;
    const emailSession = cookies().get("user_email")?.value;
    let email = "";

    console.log("JWT Token:", token);
    console.log("Session Email:", emailSession);

    if (emailSession) {
      console.log("Email from session found:", emailSession);
      email = emailSession;
    } else if (token) {
      console.log("Token found, verifying...");
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      email = decoded.email;
      console.log("Decoded Email from token:", email);
    }

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Unauthorized access: No email or token found" }),
        { status: 401 }
      );
    }

    console.log("Looking up user by email:", email);
    const user = await User.findOne({ email: email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    console.log("User found:", user);
    const Hispage = await History.find({ userId: user._id });
    console.log("User History:", Hispage);

    return new Response(JSON.stringify(Hispage), { status: 200 });
  } catch (error) {
    console.log("Error at history route.js:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while fetching history",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
