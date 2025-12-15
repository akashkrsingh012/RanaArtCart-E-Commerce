import { NextResponse } from "next/server"
import { headers, cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/mongodb"
import Order from "@/models/Order"
import User from "@/models/User"

// Helper to authenticate user
async function getUser(request) {
    const headerStore = await headers()
    // Check both lowercase and uppercase authorization headers (browser normalization)
    const authHeader = headerStore.get("authorization") || headerStore.get("Authorization")
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] :
        authHeader?.startsWith("bearer ") ? authHeader.split(" ")[1] : null
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || bearerToken

    if (!accessToken) {
        console.log("No access token found in request")
        return null
    }

    try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET)
        return payload
    } catch (e) {
        console.log("Token verification failed:", e.message)
        return null
    }
}

export async function POST(request) {
    try {
        const user = await getUser(request)
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await connectToDatabase()

        // Validate user in DB (optional but good practice)
        const dbUser = await User.findById(user.sub)
        if (!dbUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const body = await request.json()
        const { items, shippingAddress, totalAmount } = body

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "No items in order" }, { status: 400 })
        }

        const newOrder = await Order.create({
            userId: user.sub,
            items,
            shippingAddress,
            totalAmount,
            status: "Pending", // Default
            sellerId: body.sellerId // Add sellerId from body
        })

        return NextResponse.json({ order: newOrder }, { status: 201 })
    } catch (error) {
        console.error("Create Order Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function GET(request) {
    try {
        const user = await getUser(request)
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await connectToDatabase()

        const orders = await Order.find({ userId: user.sub }).sort({ createdAt: -1 })

        // Check for admin/seller request later if needed (e.g. via role)
        // For now, this route is for the specific user's orders

        return NextResponse.json({ orders }, { status: 200 })
    } catch (error) {
        console.error("Fetch Orders Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
