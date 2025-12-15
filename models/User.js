import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
)

// Reuse existing model to avoid OverwriteModelError in dev/hot-reload
export default mongoose.models.User || mongoose.model("User", UserSchema)


