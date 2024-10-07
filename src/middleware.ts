import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Your existing middleware logic
  const token = request.cookies.get("token")?.value || "";
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  // Redirect to profile if logged in and trying to access public pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  // Redirect to login if trying to access protected pages without a token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Allow the request to continue if none of the above conditions apply
  return NextResponse.next();
}

// Configuration for middleware matcher
export const config = {
  matcher: [
    // "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail",
    "/search",
    "/Backtrack_to_History",
    // Add other routes as necessary
  ],
};
