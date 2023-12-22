// import { JWT } from 'next-auth/jwt';

// export { default } from "../../../../node_modules/next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // console.log("check token", request.nextauth.token);
    // console.log("check pathnam", request.nextUrl.pathname);

    // console.log("check req", request.nextUrl.pathname);
    // console.log("check req", request.nextauth.token);
    // if (request.nextUrl.pathname !== "/layout/home") {
    //   return NextResponse.rewrite(new URL("/error", request.url));
    // }
    if (
      request.nextUrl.pathname.startsWith("/admin/dashboard") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/error", request.url));
    }
    //  if (request.nextUrl.pathname.startsWith("/explore") && request.nextauth.token?.role !== "admin") {
    //     return NextResponse.redirect(new URL("/search", request.url))
    // }
    // if (request.nextUrl.pathname.startsWith("/") && request.nextauth.token?.role !== "admin") {
    //     return NextResponse.redirect(new URL("/search", request.url))
    // }
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
    "/error",
    "/admin/dashboard",
  ],
};
