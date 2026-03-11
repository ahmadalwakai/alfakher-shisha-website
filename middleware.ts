import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_token";

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function validateToken(token: string, adminPassword: string): Promise<boolean> {
  const expectedToken = await hashPassword(adminPassword);
  return token === expectedToken;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is an admin route (but not the login page or login API)
  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  const isLoginPage = pathname === "/admin";
  const isLoginApi = pathname === "/api/admin/login";

  // Skip middleware for non-admin routes
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // Allow access to login page and login API without authentication
  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  // Get admin token from cookies
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Check if authenticated
  if (!token || !adminPassword || !(await validateToken(token, adminPassword))) {
    // For API routes, return 401
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // For pages, redirect to login
    const loginUrl = new URL("/admin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
