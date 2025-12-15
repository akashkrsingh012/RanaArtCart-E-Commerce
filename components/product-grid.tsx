"use client"

import ProductCard from "./product-card"

import { useState, useEffect } from "react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  artist: string
}

interface ProductGridProps {
  selectedCategory: string | null
}

export default function ProductGrid({ selectedCategory }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch products")
        const data = await res.json()

        const mappedProducts = data.products.map((p: any) => ({
          id: p._id,
          name: p.name,
          category: p.category,
          price: p.price,
          originalPrice: p.discountPrice || 0,
          image: p.image,
          rating: 4.5, // Mock rating
          reviews: 0, // Mock reviews
          artist: "Verified Seller", // Mock artist
        }))
        setProducts(mappedProducts)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = selectedCategory ? products.filter((p) => p.category === selectedCategory) : products

  if (loading) {
    return (
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-balance">
          {selectedCategory
            ? `Featured ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
            : "Featured Products"}
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No products found.
          </div>
        )}

      </div>
    </section>
  )
}
