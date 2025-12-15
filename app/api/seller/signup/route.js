export const dynamic = "force-dynamic"

import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { connectToDatabase } from "@/lib/mongodb"
import Seller from "@/models/Seller"
import { hashPassword, createAccessToken, createRefreshToken } from "@/lib/auth"

export async function POST(request) {
  try {
    const { name, email, password, phone, businessName, businessDescription, category } = await request.json()

    if (!name || !email || !password || !phone || !businessName || !businessDescription || !category) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    await connectToDatabase()

    // Check if seller already exists
    const existing = await Seller.findOne({ email: email.toLowerCase() })
    if (existing) {
      return NextResponse.json({ error: "Email already in use." }, { status: 409 })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create seller in MongoDB
    const seller = new Seller({
      name,
      email: email.toLowerCase(),
      password: passwordHash,
      phone,
      businessName,
      businessDescription,
      category,
    })

    await seller.save()

    // Return success without login (Approval required)
    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Seller signup failed", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Signup failed." }, { status: 500 })
  }
}





