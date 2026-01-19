import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const USER_ID_COOKIE_KEY = "fb_user_id";
const protectedRoutes = ["/dashboard", "/dashboard/*", "/onboarding"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userIdCookie = request.cookies.get(USER_ID_COOKIE_KEY);
  const hasAuthCookie = !!userIdCookie?.value;

  const isAuthRoute = pathname.startsWith("/auth");
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if (isAuthRoute && hasAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/portraits";
    return NextResponse.redirect(url);
  }

  if (isProtectedRoute && !hasAuthCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/sign-in";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)).*)",
  ],
};
