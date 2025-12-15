export const dynamic = "force-dynamic"

import { headers, cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  try {
    const headerStore = await headers()
    const authHeader = headerStore.get("authorization")
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get("accessToken")?.value
    const token = bearerToken || cookieToken

    if (!token) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET)

    await connectToDatabase()
    const user = await User.findById(payload.sub).select("name email wishlist")

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 })
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        wishlist: user.wishlist || [],
      },
    })
  } catch (error) {
    console.error("Session check failed", error)
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }
}

