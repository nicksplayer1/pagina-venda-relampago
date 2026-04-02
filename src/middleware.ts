import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get("admin_token")?.value;
  const expectedToken = process.env.ADMIN_TOKEN;

  if (!expectedToken) {
    return NextResponse.redirect(new URL("/admin-login?error=config", request.url));
  }

  if (adminToken !== expectedToken) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
