// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Replace with your actual authentication/session logic
  const isLoggedIn = request.cookies.has("your-auth-cookie"); // Example

  if (!isLoggedIn) {
    // Redirect unauthenticated users to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all routes inside the (protected) group
    "/(protected)/:path*",
  ],
};
