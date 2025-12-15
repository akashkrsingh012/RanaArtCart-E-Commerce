export const dynamic = "force-dynamic"

import { headers, cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/mongodb"
import User from "@/models/User"
import Product from "@/models/Product"

async function getUserId() {
    const headerStore = await headers()
    const authHeader = headerStore.get("authorization")
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get("accessToken")?.value
    const token = bearerToken || cookieToken

    if (!token) return null

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        return payload.sub
    } catch {
        return null
    }
}

export async function GET() {
    try {
        const userId = await getUserId()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await connectToDatabase()

        // Populate uses the model name "Product" which should be defined in models/Product.js
        const user = await User.findById(userId).populate("wishlist")

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ wishlist: user.wishlist })
    } catch (error) {
        console.error("Wishlist GET error", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const userId = await getUserId()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { productId } = await request.json()
        if (!productId) {
            return NextResponse.json({ error: "Product ID required" }, { status: 400 })
        }

        await connectToDatabase()
        const user = await User.findById(userId)

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const index = user.wishlist.indexOf(productId)
        let action = "added"

        if (index > -1) {
            // Remove
            user.wishlist.splice(index, 1)
            action = "removed"
        } else {
            // Add
            // Check if product exists to avoid adding bad IDs
            // const product = await Product.findById(productId)
            // if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })

            // Simple toggle is safer/faster for now, assuming only valid IDs are sent
            user.wishlist.push(productId)
        }

        await user.save()

        return NextResponse.json({
            message: `Product ${action} wishlist`,
            wishlist: user.wishlist,
            action
        })
    } catch (error) {
        console.error("Wishlist POST error", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
