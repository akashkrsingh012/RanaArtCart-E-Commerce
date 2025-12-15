import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Seller from "@/models/Seller"

export async function GET() {
    try {
        await connectToDatabase()

        // Fetch verified sellers with all relevant profile info
        const sellers = await Seller.find({ isApproved: true })
            .select("name businessName businessDescription category profileImage rating totalOrders")
            .lean()

        const sellersList = sellers.map((seller) => ({
            id: seller._id.toString(),
            name: seller.name,
            businessName: seller.businessName,
            businessDescription: seller.businessDescription,
            category: seller.category,
            profileImage: seller.profileImage || "/placeholder-user.jpg", // Fallback image
            rating: seller.rating || 0,
            totalOrders: seller.totalOrders || 0,
        }))

        return NextResponse.json({ sellers: sellersList })
    } catch (error) {
        console.error("Error fetching sellers:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
