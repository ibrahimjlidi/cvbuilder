import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const protectedRoutes = [
    "/dashboard",
    "/cv-builder",
    "/job-tracker",
    "/interview-prep",
    "/settings",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check for session cookie
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;

  if (isProtectedRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/cv-builder/:path*",
    "/job-tracker/:path*",
    "/interview-prep/:path*",
    "/settings/:path*",
  ],
};
