"use client"

import { useState } from "react"
import SellerLayout from "@/components/seller/SellerLayout"
import { Plus, Edit, Trash2 } from "lucide-react"

// Dummy categories data
const dummyCategories = [
  { id: "1", name: "Paintings", description: "Hand-painted artworks", productCount: 12 },
  { id: "2", name: "Pottery", description: "Ceramic and clay items", productCount: 8 },
  { id: "3", name: "Jewelry", description: "Handcrafted jewelry pieces", productCount: 15 },
  { id: "4", name: "Textiles", description: "Woven fabrics and rugs", productCount: 6 },
  { id: "5", name: "Woodcraft", description: "Wooden decorative items", productCount: 9 },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(dummyCategories)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", description: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newCategory = {
      id: String(categories.length + 1),
      ...formData,
      productCount: 0,
    }
    setCategories([...categories, newCategory])
    setFormData({ name: "", description: "" })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id))
    }
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-1">Manage product categories</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category description"
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Category
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setFormData({ name: "", description: "" })
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">{category.productCount}</span> products
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SellerLayout>
  )
}












