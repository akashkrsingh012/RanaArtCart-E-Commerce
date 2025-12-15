import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Seller from "@/models/Seller"
import { cookies } from "next/headers"

// Helper to verify admin
async function isAdmin() {
    const cookieStore = await cookies()
    return cookieStore.get("adminToken")?.value === "valid-admin-session"
}

export async function GET() {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        await connectToDatabase()

        // Fetch all sellers sorted by newest first
        const sellers = await Seller.find({})
            .sort({ createdAt: -1 })
            .select("-password") // Exclude password
            .lean()

        return NextResponse.json({ sellers: sellers.map(s => ({ ...s, id: s._id.toString() })) })
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    if (!(await isAdmin())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const { sellerId, action } = await request.json()

        if (!["approve", "reject"].includes(action)) {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 })
        }

        await connectToDatabase()

        if (action === "approve") {
            const updated = await Seller.findByIdAndUpdate(
                sellerId,
                { isApproved: true },
                { new: true }
            )
            return NextResponse.json({ success: true, seller: updated })
        }

        if (action === "reject") {
            // For rejection, we might want to delete them or just leave them unapproved.
            // Requirement says "approved or reject button". 
            // Often rejection means deleting or marking as rejected.
            // For simplicity, let's toggle isApproved to false (if it was true) or delete? 
            // The prompt says "approved/reject", usually reject means they can't login.
            // Let's explicitly set isApproved: false.
            // If they are new, they are already false. 
            // Maybe we want a separate status field? 
            // For now, staying with isApproved boolean. 
            // If rejected, we perhaps can delete the user if they are spam, or just keep them pending.
            // Let's implement DELETE for rejection to clear clutter, OR just keep them unapproved.
            // Reviewing user request: "verify seller... approved or reject button".
            // If I reject, maybe I should delete them so they can register again correctly?
            // Safer to just ensure isApproved is false.
            const updated = await Seller.findByIdAndUpdate(
                sellerId,
                { isApproved: false },
                { new: true }
            )
            return NextResponse.json({ success: true, seller: updated })
        }

    } catch (error) {
        console.error("Admin seller update failed", error)
        return NextResponse.json({ error: "Update failed" }, { status: 500 })
    }
}
