import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Hardcoded admin credentials for this iteration
const ADMIN_EMAIL = "admin@ranaartcart.com"
const ADMIN_PASSWORD = "admin123"

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 })
        }

        // In a real app, this would be a signed JWT. 
        // For now, a simple secure cookie value works for our hardcoded check.
        const cookieStore = await cookies()
        cookieStore.set("adminToken", "valid-admin-session", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 // 1 day
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
