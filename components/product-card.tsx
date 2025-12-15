"use client"

import { useUser } from "@/contexts/user-context"
import { ShoppingCart, Heart, Star, CreditCard } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice: number
    image: string
    rating: number
    reviews: number
    artist: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { user, addToWishlist, removeFromWishlist } = useUser()
  const router = useRouter()
  // Local state for add-to-cart feedback only
  const [isAdded, setIsAdded] = useState(false)
  const discount =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

  const isWishlisted = user?.wishlist?.includes(product.id) || false

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      router.push("/login")
      return
    }

    // Redirect to choose-seller page with productId
    router.push(`/choose-seller?productId=${product.id}`)
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      router.push("/login")
      return
    }

    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative overflow-hidden bg-muted h-52">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded-lg text-sm font-bold animate-bounce shadow-sm">
              {discount}% OFF
            </div>
          )}
          <button
            onClick={toggleWishlist}
            className="absolute top-2 left-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors z-10"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={18} fill={isWishlisted ? "#C85A17" : "none"} color={isWishlisted ? "#C85A17" : "#7A6B5C"} />
          </button>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-base text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-xs text-muted-foreground mb-3">by {product.artist}</p>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(product.rating) ? "#C85A17" : "#E0D5C7"}
                  stroke={i < Math.floor(product.rating) ? "#C85A17" : "#E0D5C7"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-end gap-2 mb-4 mt-auto">
            <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through mb-0.5">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={handleAddToCart}
              className={`py-2 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 ${isAdded
                ? "bg-green-600 text-white"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              <ShoppingCart size={16} />
              {isAdded ? "Added" : "Add"}
            </button>
            <button
              onClick={handleBuyNow}
              className="py-2 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            >
              <CreditCard size={16} />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
