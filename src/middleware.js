import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import path from "path";

const privatePaths = ["/ntd", "/ung-vien"];
const authPaths = ["/dang-nhap/ung-vien"];

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // return NextResponse.redirect(new URL("/home", request.url));
  console.log("middleware", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;
  // const token = localStorage.getItem("accessToken");
  const token = request.cookies.get("accessToken");
  // console.log("accessToken", token);
  if (privatePaths.some((path) => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/dang-nhap/ung-vien", request.url));
  }
  if (authPaths.some((path) => pathname.startsWith(path)) && token) {
    return NextResponse.redirect(new URL("/ung-vien", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dang-nhap/ung-vien", "/ung-vien"],
};
