export const dynamic = "force-dynamic"

import { headers, cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

import { connectToDatabase } from "@/lib/mongodb"
import Seller from "@/models/Seller"

export async function GET() {
  try {
    const headerStore = await headers()
    const authHeader = headerStore.get("authorization")
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("sellerAccessToken")?.value || bearerToken
    const refreshToken = cookieStore.get("sellerRefreshToken")?.value

    let sellerId = null;
    let tokenVerified = false;

    // Try Access Token
    if (accessToken) {
      try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET)
        sellerId = payload.sub
        tokenVerified = true;
        console.log("Seller/Me: Access Token verified.");
      } catch (e) {
        console.log("Seller/Me: Access Token invalid/expired.");
      }
    }

    // Try Refresh Token if Access Token failed
    if (!tokenVerified && refreshToken) {
      try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        sellerId = payload.sub
        tokenVerified = true;
        console.log("Seller/Me: Refresh Token verified.");
      } catch (e) {
        console.log("Seller/Me: Refresh Token invalid.");
      }
    }

    if (!tokenVerified || !sellerId) {
      // Detailed logging for debugging
      console.log("Seller/Me: Auth failed. Cookies present:", cookieStore.getAll().map(c => c.name));
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    }

    await connectToDatabase()
    const seller = await Seller.findById(sellerId).select("name email phone businessName businessDescription category")

    if (!seller) {
      return NextResponse.json({ error: "Seller not found." }, { status: 404 })
    }

    return NextResponse.json({
      seller: {
        id: seller._id.toString(),
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        businessName: seller.businessName,
        businessDescription: seller.businessDescription,
        category: seller.category,
      },
    })
  } catch (error) {
    console.error("Seller session check failed", error)
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
  }
}














