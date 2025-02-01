import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        // Get all cookies from the request
        const cookies = request.headers.get("cookie")?.split("; ") || [];

        // Clear all cookies by setting them with an empty value and an expired date
        cookies.forEach(cookie => {
            const [name] = cookie.split("=");
            response.cookies.set(name, "", {
                httpOnly: true,
                expires: new Date(0),
                path: "/",
            });
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
