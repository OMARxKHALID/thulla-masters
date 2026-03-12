import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "thulla-masters-secret-key-123";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function proxy(request) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      console.log("No token found, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (e) {
      console.log("Token verification failed:", e.message);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
