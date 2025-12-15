import { NextResponse } from "next/server"
import { headers, cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { connectToDatabase } from "@/lib/mongodb"
import Product from "@/models/Product"
import Order from "@/models/Order"

export async function GET(request, { params }) {
    try {
        const { id } = await params

        await connectToDatabase()

        const product = await Product.findById(id)

        if (!product || product.isDeleted) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        return NextResponse.json({ product }, { status: 200 })
    } catch (error) {
        console.error("Error fetching product:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params
        console.log("Deleting product:", id)

        const headerStore = await headers()
        const authHeader = headerStore.get("authorization")
        const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null

        const cookieStore = await cookies()
        const accessTokenCookie = cookieStore.get("sellerAccessToken")
        const accessToken = accessTokenCookie?.value || bearerToken

        console.log("Delete Product Auth Debug:", {
            hasAuthHeader: !!authHeader,
            bearerToken: bearerToken ? "present" : "missing",
            hasCookie: !!accessTokenCookie,
            cookieName: "sellerAccessToken",
            cookieValue: accessTokenCookie?.value ? "present" : "missing",
            finalToken: accessToken ? "present" : "missing"
        });

        if (!accessToken) {
            console.log("Unauthorized: No access token found");
            return NextResponse.json({ error: "Unauthorized: Please log in again" }, { status: 401 })
        }

        let sellerId = null
        try {
            const payload = jwt.verify(accessToken, process.env.JWT_SECRET)
            sellerId = payload.sub
        } catch (e) {
            console.log("Token verification failed:", e.message)
            return NextResponse.json({ error: "Invalid token: " + e.message }, { status: 401 })
        }

        await connectToDatabase()

        // Find product and verify ownership
        const product = await Product.findOne({ _id: id, sellerId: sellerId })
        if (!product) {
            console.log(`Product delete failed: Product ${id} not found for seller ${sellerId}`)
            return NextResponse.json({ error: "Product not found or access denied" }, { status: 404 })
        }

        // Soft Delete Product
        product.isDeleted = true
        await product.save()
        console.log("Product soft deleted.")

        // Update related Orders (Pending/Processing)
        try {
            const result = await Order.updateMany(
                {
                    "items.productId": id,
                    status: { $in: ["Pending", "Processing"] }
                },
                {
                    $set: { "items.$[elem].status": "cancelled" }
                },
                {
                    arrayFilters: [{ "elem.productId": id }]
                }
            )
            console.log("Updated orders:", result)
        } catch (dbError) {
            console.error("Failed to update related orders:", dbError)
            // We don't fail the deletion if order update fails, but we log it.
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting product:", error)
        return NextResponse.json({ error: "Server Error: " + error.message }, { status: 500 })
    }
}
