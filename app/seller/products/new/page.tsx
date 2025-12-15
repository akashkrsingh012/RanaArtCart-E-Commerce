"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SellerLayout from "@/components/seller/SellerLayout"
import { compressImage } from "@/lib/imageUtils"

export default function NewProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    category: "",
    discountPercentage: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  // Auto-calculate MRP based on Price and Discount %
  const calculateMRP = (price: string, percentage: string) => {
    const p = parseFloat(price)
    const per = parseFloat(percentage)
    if (!isNaN(p) && !isNaN(per) && per > 0 && per < 100) {
      const mrp = p / (1 - per / 100)
      return Math.round(mrp).toString()
    }
    return ""
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = e.target.value
    let newMRP = formData.discountPrice

    // If discount % exists, recalculate MRP
    if (formData.discountPercentage) {
      newMRP = calculateMRP(newPrice, formData.discountPercentage)
    }

    setFormData({ ...formData, price: newPrice, discountPrice: newMRP })
  }

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercent = e.target.value
    const newMRP = calculateMRP(formData.price, newPercent)
    setFormData({ ...formData, discountPercentage: newPercent, discountPrice: newMRP })
  }

  // Allow manual MRP override (optional: clears %)
  const handleMRPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMRP = e.target.value
    setFormData({ ...formData, discountPrice: newMRP, discountPercentage: "" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      data.append("name", formData.name)
      data.append("description", formData.description)
      data.append("price", formData.price)
      data.append("discountPrice", formData.discountPrice)
      data.append("stock", formData.stock)
      data.append("category", formData.category)

      if (imageFile) {
        // Compress image before upload
        try {
          const compressedFile = await compressImage(imageFile)
          data.append("image", compressedFile)
        } catch (compressionError) {
          console.error("Image compression failed, falling back to original:", compressionError)
          data.append("image", imageFile)
        }
      }

      const res = await fetch("/api/products", {
        method: "POST",
        body: data,
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        console.error("Server responded with error:", res.status, errData)
        throw new Error(errData.error || "Failed to create product")
      }

      alert("Product created successfully!")
      router.push("/seller/products")
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : "Failed to create product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <SellerLayout>
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-1">Create a new product listing</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Selling Price) ₹</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={handlePriceChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Discount (%)</label>
              <input
                type="number"
                min="0"
                max="99"
                value={formData.discountPercentage}
                onChange={handleDiscountChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Original Price (MRP)</label>
              <input
                type="number"
                value={formData.discountPrice}
                onChange={handleMRPChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Auto-calculated"
              />
              {formData.discountPrice && Number(formData.discountPrice) <= Number(formData.price) && (
                <p className="text-xs text-red-500 mt-1">
                  MRP must be higher than Selling Price to show a discount.
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                <option value="paintings">Paintings</option>
                <option value="sculptures">Sculptures</option>
                <option value="pottery">Pottery</option>
                <option value="textiles">Textiles</option>
                <option value="jewelry">Jewelry</option>
                <option value="woodcraft">Woodcraft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imageFile && <p className="mt-2 text-sm text-gray-500">Selected: {imageFile.name}</p>}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </SellerLayout>
  )
}
