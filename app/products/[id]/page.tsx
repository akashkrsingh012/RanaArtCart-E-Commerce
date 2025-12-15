"use client"

import { useState, useEffect, use } from "react"
import { ShoppingCart, Star, Heart, ArrowLeft, Loader2, Minus, Plus } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"

interface Product {
    _id: string;
    name: string;
    category: string;
    price: number;
    discountPrice?: number;
    image: string;
    rating?: number;
    reviews?: number;
    artist?: string;
    description?: string;
    stock?: number;
    details?: string;
    sizes?: string[];
    colors?: string[];
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const cart = useCart()
    const { user } = useUser()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedColor, setSelectedColor] = useState<string>("")
    const [selectedSize, setSelectedSize] = useState<string>("")
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState<"description" | "details">("description")
    const [isAdded, setIsAdded] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch product")
                }
                const data = await response.json()
                setProduct(data)
                // Set default selections if available
                if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0])
                if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0])
            } catch (err) {
                console.error("Error fetching product:", err)
                setError("Failed to load product details")
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProduct()
        }
    }, [id])

    const handleAddToCart = () => {
        if (!product) return

        cart.addItem({
            id: product._id,
            name: product.name,
            price: product.discountPrice || product.price,
            image: product.image,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
            sellerId: "seller_id_placeholder" // Replace with actual seller ID if available
        })

        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    const handleBuyNow = () => {
        if (!user) {
            router.push(`/login?redirect=/products/${id}`)
            return
        }
        handleAddToCart()
        router.push("/cart")
    }

    const increaseQuantity = () => {
        if (product && quantity < (product.stock || 10)) {
            setQuantity(prev => prev + 1)
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold text-red-500">Product Not Found</h2>
                <Link href="/" className="text-primary hover:underline">
                    Return to Home
                </Link>
            </div>
        )
    }

    const availableColors = product.colors && product.colors.length > 0
        ? product.colors
        : ["Standard"]

    const availableSizes = product.sizes && product.sizes.length > 0
        ? product.sizes
        : ["Standard"]

    const stock = product.stock || 0

    return (
        <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted border border-border shadow-sm">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                            {product.discountPrice && product.discountPrice < product.price && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
                                        {product.category || "Category"}
                                    </p>
                                    <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-2">
                                        {product.name}
                                    </h1>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>By {product.artist || "Verified Seller"}</span>
                                        <span>•</span>
                                        <div className="flex items-center text-yellow-400">
                                            <Star size={16} fill="currentColor" />
                                            <span className="ml-1 text-foreground font-medium">
                                                {product.rating || 4.5}
                                            </span>
                                        </div>
                                        <span>({product.reviews || 0} reviews)</span>
                                    </div>
                                </div>
                                <button className="p-3 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-red-500">
                                    <Heart size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-end gap-4">
                            <span className="text-4xl font-bold text-primary">
                                ₹{(product.discountPrice || product.price).toLocaleString("en-IN")}
                            </span>
                            {product.discountPrice && product.discountPrice < product.price && (
                                <span className="text-xl text-muted-foreground line-through mb-1">
                                    ₹{product.price.toLocaleString("en-IN")}
                                </span>
                            )}
                        </div>

                        <div className="space-y-6">
                            {/* Color Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-3">
                                    Color: <span className="text-primary capitalize">{selectedColor}</span>
                                </label>
                                <div className="flex gap-3">
                                    {availableColors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${selectedColor === color
                                                ? "border-primary bg-primary/10 text-primary"
                                                : "border-border hover:border-primary/50 text-foreground"
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-3">
                                    Size: {selectedSize ? <span className="text-primary">{selectedSize}</span> : "Select"}
                                </label>
                                <div className="flex gap-3">
                                    {availableSizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-[3rem] px-3 h-12 rounded-lg border-2 font-semibold transition-all flex items-center justify-center ${selectedSize === size
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-border hover:border-primary/50 text-foreground"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-3">
                                    Quantity
                                </label>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={decreaseQuantity}
                                        disabled={quantity <= 1}
                                        className="p-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <div className="w-20 text-center px-3 py-2 border border-border rounded-lg bg-background font-semibold">
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={increaseQuantity}
                                        disabled={quantity >= stock}
                                        className="p-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Plus size={20} />
                                    </button>
                                    <span className="text-sm text-green-600 font-medium">{stock > 0 ? `${stock} in Stock` : "Out of Stock"}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={stock === 0}
                                    className={`flex-1 h-14 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${isAdded
                                        ? "bg-green-600 text-white"
                                        : "bg-secondary text-secondary-foreground hover:bg-primary/10 border-2 border-primary/20 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                        }`}
                                >
                                    <ShoppingCart size={24} />
                                    {isAdded ? "Added to Cart" : "Add to Cart"}
                                </button>

                                <button
                                    onClick={handleBuyNow}
                                    disabled={stock === 0}
                                    className="flex-1 h-14 rounded-xl font-bold text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        {/* Info Icons */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                            <div className="text-center">
                                <div className="font-semibold text-foreground text-sm">Free Shipping</div>
                                <div className="text-xs text-muted-foreground">On orders over ₹999</div>
                            </div>
                            <div className="text-center border-l border-border">
                                <div className="font-semibold text-foreground text-sm">Secure Payment</div>
                                <div className="text-xs text-muted-foreground">Protected Payments</div>
                            </div>
                            <div className="text-center border-l border-border">
                                <div className="font-semibold text-foreground text-sm">Easy Returns</div>
                                <div className="text-xs text-muted-foreground">30 Day Returns</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description and Details Section */}
                <div className="mt-8 border-t border-border pt-8">
                    <div className="flex gap-8 mb-6 border-b border-border">
                        <button
                            onClick={() => setActiveTab("description")}
                            className={`pb-4 px-2 font-semibold text-lg transition-colors ${activeTab === "description"
                                ? "text-primary border-b-2 border-primary"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            DESCRIPTION
                        </button>
                        <button
                            onClick={() => setActiveTab("details")}
                            className={`pb-4 px-2 font-semibold text-lg transition-colors ${activeTab === "details"
                                ? "text-primary border-b-2 border-primary"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            DETAILS
                        </button>
                    </div>

                    <div className="max-w-4xl">
                        {activeTab === "description" && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">Product Overview</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {product.description || "No description available."}
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === "details" && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="font-semibold text-foreground">Material:</span>
                                        <span className="ml-2 text-muted-foreground">Standard</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-foreground">SKU:</span>
                                        <span className="ml-2 text-muted-foreground">{product._id.slice(-8).toUpperCase()}</span>
                                    </div>
                                </div>
                                {product.details && (
                                    <div className="mt-4">
                                        <p className="text-muted-foreground leading-relaxed">{product.details}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
