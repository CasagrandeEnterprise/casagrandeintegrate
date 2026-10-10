import { NextResponse, type NextRequest } from "next/server";
import { decryptSession } from "@/lib/session-crypto";

// Optimistic check only. The dashboard reads the session again before showing data.
export async function proxy(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const session = await decryptSession(token);

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
