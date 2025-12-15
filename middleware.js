import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Exclude API routes from middleware checks (they handle their own auth)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  const isUserProtected = pathname.startsWith("/private")
  const isSellerProtected =
    pathname.startsWith("/seller") &&
    !pathname.startsWith("/seller/login") &&
    !pathname.startsWith("/seller/register")

  if (!isUserProtected && !isSellerProtected) {
    return NextResponse.next()
  }

  const refreshCookieName = isSellerProtected ? "sellerRefreshToken" : "refreshToken"
  const redirectUrl = isSellerProtected ? "/seller/login" : "/login"
  const jwtSecretStr = isSellerProtected ? process.env.JWT_SECRET : process.env.JWT_SECRET
  const jwtRefreshSecretStr = isSellerProtected ? process.env.JWT_REFRESH_SECRET : process.env.JWT_REFRESH_SECRET

  const jwtSecret = new TextEncoder().encode(jwtSecretStr)
  const jwtRefreshSecret = new TextEncoder().encode(jwtRefreshSecretStr)

  // Check for refreshToken cookie first
  const refreshToken = request.cookies.get(refreshCookieName)?.value

  // If refreshToken exists, verify it
  if (refreshToken) {
    try {
      const { payload } = await jwtVerify(refreshToken, jwtRefreshSecret)
      const response = NextResponse.next()
      // Refresh the cookie
      response.cookies.set(refreshCookieName, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
      response.headers.set("x-user-id", payload.sub || "")
      return response
    } catch (error) {
      console.error("Middleware refreshToken verification failed", error)
      // Fall through to check accessToken
    }
  }

  // If no refreshToken or invalid, check for accessToken in Authorization header
  const authHeader = request.headers.get("authorization")
  const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null

  if (bearerToken) {
    try {
      const { payload } = await jwtVerify(bearerToken, jwtSecret)
      const response = NextResponse.next()
      response.headers.set("x-user-id", payload.sub || "")
      return response
    } catch (error) {
      console.error("Middleware accessToken verification failed", error)
      // Fall through to redirect
    }
  }

  // No valid token found, redirect to login
  return NextResponse.redirect(new URL(redirectUrl, request.url))
}

export const config = {
  matcher: ["/private/:path*", "/seller/:path*"],
}



