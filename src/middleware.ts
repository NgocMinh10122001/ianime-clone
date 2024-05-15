import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/error", request.url));
    }
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/layout/home", request.url));
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
    "/",
    "/layout",
    "/api/auth/login",
    "/layout/home",
    "/layout/explore",
    "/layout/search",
    "/layout/vietsub",
    "/layout/3D",
    "/layout/18",
    "/test",
    "/error",
    "/admin/manage-user",
    "/admin/manage-user",
    "/layout/movie",
    "/layout/favorite",
    "/layout/watched",
    "/layout/category",
    "/layout/genre",
    "/layout/release",
    "/layout/the-firm",
    "/layout/gacha",
  ],
};
