import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                productId: { type: String, required: true },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
                image: { type: String },
                status: { type: String, default: "active", enum: ["active", "cancelled", "returned"] },
            },
        ],
        totalAmount: { type: Number, required: true },
        shippingAddress: {
            name: { type: String, required: true },
            email: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: String, required: true },
            country: { type: String, default: "India" },
        },
        status: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
        paymentMethod: { type: String, default: "COD" }, // Defaulting to COD for now
    },
    { timestamps: true }
)

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)
