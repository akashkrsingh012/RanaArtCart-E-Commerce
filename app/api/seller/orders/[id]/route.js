import { NextResponse } from "next/server"
import { headers, cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/mongodb"
import Order from "@/models/Order"
import Product from "@/models/Product"

// Helper to authenticate seller
async function getSeller(request) {
    const headerStore = await headers()
    const authHeader = headerStore.get("authorization") || headerStore.get("Authorization")
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : 
                       authHeader?.startsWith("bearer ") ? authHeader.split(" ")[1] : null
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("sellerAccessToken")?.value || bearerToken
    const refreshToken = cookieStore.get("sellerRefreshToken")?.value

    let sellerId = null
    let tokenVerified = false

    if (accessToken) {
        try {
            const payload = jwt.verify(accessToken, process.env.JWT_SECRET)
            sellerId = payload.sub
            tokenVerified = true
        } catch (e) {
            console.log("Seller Orders API: Access Token invalid.")
        }
    }

    if (!tokenVerified && refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            sellerId = payload.sub
            tokenVerified = true
        } catch (e) {
            console.log("Seller Orders API: Refresh Token invalid.")
        }
    }

    if (!tokenVerified || !sellerId) {
        return null
    }

    return sellerId
}

// PATCH - Update order status (only for seller's items)
export async function PATCH(request, { params }) {
    try {
        const sellerId = await getSeller(request)
        if (!sellerId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const { status } = body

        if (!status || !["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 })
        }

        await connectToDatabase()

        // Verify seller owns products in this order
        const order = await Order.findById(id)
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 })
        }

        // Get seller's product IDs
        const sellerProducts = await Product.find({ sellerId }).select("_id")
        const productIds = sellerProducts.map(p => p._id.toString())
        
        // Check if order contains seller's products
        const hasSellerProducts = order.items.some(item => 
            productIds.includes(item.productId)
        )

        if (!hasSellerProducts) {
            return NextResponse.json({ error: "Order does not contain your products" }, { status: 403 })
        }

        // Update order status
        order.status = status
        await order.save()

        return NextResponse.json({ order }, { status: 200 })
    } catch (error) {
        console.error("Error updating order status:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}


