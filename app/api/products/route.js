
import { NextResponse } from "next/server"
import { headers, cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { connectToDatabase } from "@/lib/mongodb"
import Product from "@/models/Product"
import Seller from "@/models/Seller"

export async function POST(request) {
    try {
        console.log("Starting product creation...");
        // Authenticate Seller
        const headerStore = await headers()
        const authHeader = headerStore.get("authorization")
        const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null
        const cookieStore = await cookies()
        const accessToken = cookieStore.get("sellerAccessToken")?.value || bearerToken
        const refreshToken = cookieStore.get("sellerRefreshToken")?.value

        let sellerId = null;
        let tokenVerified = false;

        // Try Access Token
        if (accessToken) {
            try {
                const payload = jwt.verify(accessToken, process.env.JWT_SECRET)
                sellerId = payload.sub
                tokenVerified = true;
            } catch (e) {
                console.log("API/Products: Access Token invalid.");
            }
        }

        // Try Refresh Token
        if (!tokenVerified && refreshToken) {
            try {
                const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
                sellerId = payload.sub
                tokenVerified = true;
            } catch (e) {
                console.log("API/Products: Refresh Token invalid.");
            }
        }

        if (!tokenVerified || !sellerId) {
            console.log("API/Products: Auth failed.");
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
        }

        const formData = await request.formData()
        const name = formData.get("name")
        const description = formData.get("description")
        const price = formData.get("price")
        const stock = formData.get("stock")
        const category = formData.get("category")
        const imageFile = formData.get("image")

        console.log("Form data received:", { name, description, price, stock, category, image: imageFile ? "present" : "missing" });

        if (!imageFile || !(imageFile instanceof Blob)) {
            console.log("Image validation failed.");
            return NextResponse.json({ error: "Image file is required." }, { status: 400 })
        }

        const buffer = Buffer.from(await imageFile.arrayBuffer())
        const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, "_")}`
        const uploadDir = path.join(process.cwd(), "public/uploads")

        console.log("Saving image to:", uploadDir);
        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (e) {
            // Ignore if exists
        }

        const filepath = path.join(uploadDir, filename)
        await writeFile(filepath, buffer)
        console.log("Image saved.");

        const imageUrl = `/uploads/${filename}`

        await connectToDatabase()
        console.log("DB connected.");

        // Verify seller exists
        const seller = await Seller.findById(sellerId)
        if (!seller) {
            console.log("Seller not found in DB.");
            return NextResponse.json({ error: "Seller not found." }, { status: 404 })
        }

        console.log("Creating product in DB...");
        const newProduct = await Product.create({
            name,
            description,
            price: Number(price),
            stock: Number(stock),
            category,
            image: imageUrl,
            sellerId,
        })
        console.log("Product created:", newProduct._id);

        return NextResponse.json({ product: newProduct }, { status: 201 })
    } catch (error) {
        console.error("Error creating product details:", error)
        return NextResponse.json({ error: "Internal Server Error: " + error.message }, { status: 500 })
    }
}

export const dynamic = "force-dynamic";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        console.log("API/Products: Fetching products...", searchParams.toString())
        const sellerId = searchParams.get("sellerId")

        await connectToDatabase()

        let query = { isDeleted: { $ne: true } }
        if (sellerId) {
            query.sellerId = sellerId
        }

        const products = await Product.find(query).sort({ createdAt: -1 })

        return NextResponse.json({ products })
    } catch (error) {
        console.error("Error fetching products:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
