import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import cors from "./cors";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/error", request.url));
    }
    // return cors((req, res) => res.next())(req, res);
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/layout/home",
    "/layout/explore",
    "/layout/search",
    "/layout/vietsub",
    "/test",
    "/error",
    "/admin/manage-user",
    "/admin/manage-user",
    "/layout/movie/:path*",
    "/layout/favorite",
    "/layout/watched",
  ],
};
