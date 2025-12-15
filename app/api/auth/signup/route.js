export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"

import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"
import { hashPassword } from "@/lib/auth"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 })
    }

    await connectToDatabase()

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: "Email already in use." }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: passwordHash,
    })

    await user.save() // first insert auto-creates DB/collection in Atlas

    return NextResponse.json({ message: "User created" }, { status: 201 })
  } catch (error) {
    console.error("Signup failed", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Signup failed." }, { status: 500 })
  }
}

