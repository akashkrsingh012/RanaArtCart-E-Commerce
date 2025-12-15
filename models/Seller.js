import mongoose from "mongoose"

const SellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    businessName: { type: String, required: true },
    businessDescription: { type: String, required: true },
    category: { type: String, required: true },
    profileImage: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.models.Seller || mongoose.model("Seller", SellerSchema)














