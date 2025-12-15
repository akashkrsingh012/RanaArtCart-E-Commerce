import { NextResponse } from "next/server"
import { headers, cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/mongodb"
import Order from "@/models/Order"

async function getUser(request) {
    const headerStore = await headers()
    const authHeader = headerStore.get("authorization") || headerStore.get("Authorization")
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : 
                       authHeader?.startsWith("bearer ") ? authHeader.split(" ")[1] : null
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value || bearerToken

    if (!accessToken) return null

    try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET)
        return payload
    } catch (e) {
        return null
    }
}

// Cancel Order (User/Admin)
export async function DELETE(request, prop) {
    const params = await prop.params;
    try {
        const user = await getUser(request)
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = params
        await connectToDatabase()

        const order = await Order.findById(id)
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 })
        }

        // Check ownership (or admin role if implemented later)
        if (order.userId.toString() !== user.sub) {
            return NextResponse.json({ error: "Unauthorized: Not your order" }, { status: 403 })
        }

        // Cannot cancel if already shipped/delivered
        if (["Shipped", "Delivered"].includes(order.status)) {
            return NextResponse.json({ error: "Cannot cancel order that has been shipped or delivered" }, { status: 400 })
        }

        // Soft delete: Update status to "Cancelled"
        order.status = "Cancelled"
        await order.save()

        return NextResponse.json({ message: "Order cancelled successfully", order }, { status: 200 })
    } catch (error) {
        console.error("Cancel Order Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

// Update Order Status (Admin/Seller usually, but implemented for completeness)
// Use DELETE for user cancellation as per conventional mapping, or PUT with specific body. 
// For this task, we'll keep PUT generic for status updates.
export async function PUT(request, prop) {
    const params = await prop.params;
    try {
        const user = await getUser(request)
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        // In a real app, verify Admin/Seller role here. 
        // For now, let's assume this might be used to update status, but restrict to Admin/Seller logic later
        // or for user updating address logic if pending.

        // For now, we will just allow updating if it matches User ID (e.g. maybe user correcting address) 
        // OR if we had role based auth. 
        // Strict adherence: "User apne hi orders modify / delete kar sakta hai"
        // Let's implement updating STATUS to Cancelled via PUT as well if body says so

        const { id } = params
        const body = await request.json()
        await connectToDatabase()

        const order = await Order.findById(id)
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 })
        }

        if (order.userId.toString() !== user.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
        }

        if (body.status === "Cancelled") {
            if (["Shipped", "Delivered"].includes(order.status)) {
                return NextResponse.json({ error: "Cannot cancel order that has been shipped or delivered" }, { status: 400 })
            }
            order.status = "Cancelled"
        }

        // Allow other updates if needed? e.g. address update
        if (body.shippingAddress && order.status === "Pending") {
            order.shippingAddress = { ...order.shippingAddress, ...body.shippingAddress }
        }

        await order.save()
        return NextResponse.json({ order }, { status: 200 })

    } catch (error) {
        console.error("Update Order Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
