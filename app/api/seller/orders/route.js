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

    // Try Access Token
    if (accessToken) {
        try {
            const payload = jwt.verify(accessToken, process.env.JWT_SECRET)
            sellerId = payload.sub
            tokenVerified = true
        } catch (e) {
            console.log("Seller Orders API: Access Token invalid.")
        }
    }

    // Try Refresh Token
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

// GET - Fetch all orders for seller's products
export async function GET(request) {
    try {
        const sellerId = await getSeller(request)
        if (!sellerId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        await connectToDatabase()

        // Get all products for this seller
        const sellerProducts = await Product.find({ sellerId }).select("_id")
        const productIds = sellerProducts.map(p => p._id.toString())

        // Find all orders that contain any of seller's products
        const orders = await Order.find({
            "items.productId": { $in: productIds }
        })
        .populate("userId", "name email")
        .sort({ createdAt: -1 })

        // Filter and format orders to only include seller's products
        const sellerOrders = orders.map(order => {
            const sellerItems = order.items.filter(item => 
                productIds.includes(item.productId)
            )
            
            if (sellerItems.length === 0) return null

            // Calculate subtotal for seller's items
            const sellerSubtotal = sellerItems.reduce((sum, item) => 
                sum + (item.price * item.quantity), 0
            )

            return {
                _id: order._id,
                orderId: order._id.toString(),
                userId: order.userId._id || order.userId,
                userName: order.userId?.name || "Unknown",
                userEmail: order.userId?.email || "",
                items: sellerItems,
                sellerSubtotal,
                totalAmount: order.totalAmount,
                shippingAddress: order.shippingAddress,
                status: order.status,
                paymentMethod: order.paymentMethod,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
            }
        }).filter(order => order !== null)

        return NextResponse.json({ orders: sellerOrders }, { status: 200 })
    } catch (error) {
        console.error("Error fetching seller orders:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}


