import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Seller from "@/models/Seller"

export async function GET() {
    try {
        await connectToDatabase()

        // Fetch only verified sellers (isApproved: true)
        // Select relevant fields: id, name, businessName, businessDescription, category
        // In a real app we might paginate, but for now we list all.
        const sellers = await Seller.find({ isApproved: true })
            .select("name businessName businessDescription category")
            .lean()

        // Map _id to id if needed, or just use _id
        const sellersList = sellers.map(seller => ({
            ...seller,
            id: seller._id.toString()
        }))

        return NextResponse.json({ sellers: sellersList })
    } catch (error) {
        console.error("Error fetching sellers list:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
