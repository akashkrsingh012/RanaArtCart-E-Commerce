export const dynamic = "force-dynamic"

import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { connectToDatabase } from "@/lib/mongodb"
import Seller from "@/models/Seller"
import { createAccessToken, createRefreshToken, verifyPassword } from "@/lib/auth"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
    }

    await connectToDatabase()

    const seller = await Seller.findOne({ email: email.toLowerCase() })
    if (!seller) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 })
    }

    if (!seller.isApproved) {
      return NextResponse.json({ error: "Account pending approval. Please wait for an administrator to verify your account." }, { status: 403 })
    }

    const passwordValid = await verifyPassword(password, seller.password)
    if (!passwordValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 })
    }

    const accessToken = createAccessToken(seller)
    const refreshToken = createRefreshToken(seller)

    const cookieStore = await cookies()
    cookieStore.set("sellerRefreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    cookieStore.set("sellerAccessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    })

    return NextResponse.json({ accessToken })
  } catch (error) {
    console.error("Seller login failed", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Login failed." }, { status: 500 })
  }
}














