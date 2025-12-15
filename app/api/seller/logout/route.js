export const dynamic = "force-dynamic"

import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.set("sellerRefreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Seller logout failed", error)
    return NextResponse.json({ error: "Logout failed." }, { status: 500 })
  }
}














