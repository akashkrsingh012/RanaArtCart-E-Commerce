"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import SellerLayout from "@/components/seller/SellerLayout"
import { Plus, Edit, Trash2, Eye } from "lucide-react"

// Dummy products data
const dummyProducts = [
  {
    id: "1",
    name: "Handmade Ceramic Vase",
    price: 1299,
    stock: 15,
    category: "Pottery",
    status: "active",
  },
  {
    id: "2",
    name: "Wooden Decorative Box",
    price: 899,
    stock: 8,
    category: "Woodcraft",
    status: "active",
  },
  {
    id: "3",
    name: "Silver Pendant Necklace",
    price: 2499,
    stock: 0,
    category: "Jewelry",
    status: "draft",
  },
  {
    id: "4",
    name: "Handwoven Cotton Rug",
    price: 3499,
    stock: 5,
    category: "Textiles",
    status: "active",
  },
  {
    id: "5",
    name: "Abstract Acrylic Painting",
    price: 4999,
    stock: 3,
    category: "Paintings",
    status: "active",
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 1. Get current seller ID
        const meRes = await fetch("/api/seller/me")
        if (!meRes.ok) throw new Error("Failed to fetch seller info")
        const { seller } = await meRes.json()

        // 2. Fetch seller's products
        const productsRes = await fetch(`/api/products?sellerId=${seller.id}`)
        if (!productsRes.ok) throw new Error("Failed to fetch products")
        const { products } = await productsRes.json()

        setProducts(products)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(
    (product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || "Failed to delete product")
        }

        // Remove from state
        setProducts(products.filter((p: any) => p._id !== id))
        alert("Product deleted successfully")
      } catch (error) {
        console.error("Delete failed", error)
        alert(error instanceof Error ? error.message : "Failed to delete product")
      }
    }
  }

  if (loading) {
    return (
      <SellerLayout>
        <div className="flex h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </SellerLayout>
    )
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Manage your product catalog</p>
          </div>
          <Link
            href="/seller/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Product
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Image</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product: any) => (
                  <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="h-10 w-10 relative overflow-hidden rounded-md border border-gray-200">
                        <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">₹{product.price.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm ${product.stock === 0 ? "text-red-600 font-semibold" : "text-gray-700"}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{product.category}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {/* 
                        <Link
                          href={`/seller/products/${product._id}`}
                          className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </Link>
                         */}
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No products found. Add your first product!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SellerLayout>
  )
}












