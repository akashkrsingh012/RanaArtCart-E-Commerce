"use client"

import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  category: string
  image: string
  stock: number
  sellerId: string
}

export default function WishlistPage() {
  const { user, isLoggedIn, removeFromWishlist } = useUser()
  const { addItem } = useCart()
  const router = useRouter()
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // If we have a user, fetch their wishlist details
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        if (!token) return

        const res = await fetch("/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (res.ok) {
          const data = await res.json()
          setWishlistProducts(data.wishlist || [])
        }
      } catch (error) {
        console.error("Failed to fetch wishlist", error)
      } finally {
        setLoading(false)
      }
    }

    if (isLoggedIn) {
      fetchWishlist()
    } else if (!localStorage.getItem("accessToken") && !loading) {
      // If not logged in and not loading init state
      router.push("/login")
    } else {
      // give it a moment or wait for mounted
      setLoading(false)
    }
  }, [isLoggedIn, router])

  if (!user) return null

  // Filter products based on current user context (IDs)
  // This handles immediate removal from UI when removeFromWishlist is called
  const displayItems = wishlistProducts.filter(p => user.wishlist.includes(p._id))

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Wishlist</h1>

        {loading ? (
          <div className="flex justify-center p-12">Loading...</div>
        ) : displayItems.length === 0 ? (
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Add items to your wishlist to save them for later</p>
            <button
              onClick={() => router.push("/")}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((product) => (
              <div
                key={product._id}
                className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-muted transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Heart size={18} fill="#C85A17" color="#C85A17" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1">{product.name}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</span>
                  </div>

                  <button
                    onClick={() => {
                      addItem({
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                      })
                    }}
                    className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
