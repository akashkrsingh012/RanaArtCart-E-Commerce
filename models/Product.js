import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        discountPrice: { type: Number, default: 0 },
        stock: { type: Number, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
)

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)
