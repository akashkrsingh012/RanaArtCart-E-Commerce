export const dynamic = "force-dynamic"

import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"
import { createAccessToken, createRefreshToken, verifyPassword } from "@/lib/auth"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 })
    }

    await connectToDatabase()

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 })
    }

    const passwordValid = await verifyPassword(password, user.password)
    if (!passwordValid) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 })
    }

    const accessToken = createAccessToken(user)
    const refreshToken = createRefreshToken(user)

    const cookieStore = await cookies()
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    })

    return NextResponse.json({ accessToken })
  } catch (error) {
    console.error("Login failed", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Login failed." }, { status: 500 })
  }
}

