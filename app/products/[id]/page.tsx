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
    discountPrice?: number; // Updated to match DB
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
// ... (lines 26-145 omitted)

const discount = product.price && product.discountPrice && product.discountPrice > product.price
    ? Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)
    : 0

// Mock rating/reviews if not in DB
const rating = product.rating || 4.5
const reviews = product.reviews || 0
const artist = product.artist || "Verified Seller"

return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
// ... (lines 157-227 omitted)
        <div className="flex items-end gap-4 mb-8">
            <span className="text-4xl font-bold text-primary">
                ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.discountPrice && product.discountPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through mb-1">
                    ₹{product.discountPrice.toLocaleString("en-IN")}
                </span>
            )}
        </div>
    </div>

                        {/* Color Selection */ }
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

{/* Size Selection */ }
<div>
    <label className="block text-sm font-semibold text-foreground mb-3">
        Size (US): {selectedSize ? <span className="text-primary">{selectedSize}</span> : "Select"}
    </label>
    <div className="flex gap-3">
        {availableSizes.map((size) => (
            <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all ${selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary/50 text-foreground"
                    }`}
            >
                {size}
            </button>
        ))}
    </div>
</div>

{/* Quantity Selection */ }
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
        <input
            type="number"
            min="1"
            max={stock}
            value={quantity}
            onChange={(e) => {
                const val = parseInt(e.target.value) || 1
                setQuantity(Math.min(Math.max(1, val), stock))
            }}
            className="w-20 text-center px-3 py-2 border border-border rounded-lg bg-background font-semibold"
        />
        <button
            onClick={increaseQuantity}
            disabled={quantity >= stock}
            className="p-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Plus size={20} />
        </button>
        <span className="text-sm text-green-600 font-medium">{stock} in Stock</span>
    </div>
</div>

{/* Action Buttons */ }
<div className="flex gap-4 pt-4">
    <button
        onClick={handleAddToCart}
        disabled={!selectedSize}
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
        disabled={!selectedSize}
        className="flex-1 h-14 rounded-xl font-bold text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
        Buy Now
    </button>
</div>

{/* Info Icons */ }
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
                    </div >
                </div >

    {/* Description and Details Section - Below Image */ }
    < div className = "mt-8 border-t border-border pt-8" >
                    <div className="flex gap-8 mb-6 border-b border-border">
                        <button
                            onClick={() => setActiveTab("description")}
                            className={`pb-4 px-2 font-semibold text-lg transition-colors ${
                                activeTab === "description"
                                    ? "text-primary border-b-2 border-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            DESCRIPTION
                        </button>
                        <button
                            onClick={() => setActiveTab("details")}
                            className={`pb-4 px-2 font-semibold text-lg transition-colors ${
                                activeTab === "details"
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
                                        {product.description || "Warm thermal t-shirt perfect for winter season."}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">Detailed Description</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {product.description
                                            ? `${product.description} This premium product is crafted from fine materials for durability and quality. Designed for modern individuals, it offers both style and comfort. The contemporary design features high-quality fabrics that ensure comfort and breathability. With attention to detail in every stitch, this product is versatile and perfect for various occasions.`
                                            : "This premium product is crafted from fine materials for durability and quality. Designed for modern individuals, it offers both style and comfort. The contemporary design features high-quality fabrics that ensure comfort and breathability. With attention to detail in every stitch, this product is versatile and perfect for various occasions."}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">Key Features</h3>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                        <li>Premium quality materials</li>
                                        <li>Comfortable and breathable</li>
                                        <li>Contemporary design</li>
                                        <li>Durable construction</li>
                                        <li>Versatile for various occasions</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === "details" && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="font-semibold text-foreground">Material:</span>
                                        <span className="ml-2 text-muted-foreground">Premium Cotton Blend</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-foreground">Care Instructions:</span>
                                        <span className="ml-2 text-muted-foreground">Machine Wash Cold</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-foreground">Origin:</span>
                                        <span className="ml-2 text-muted-foreground">Made in India</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-foreground">Warranty:</span>
                                        <span className="ml-2 text-muted-foreground">1 Year</span>
                                    </div>
                                    {product.stock && (
                                        <div>
                                            <span className="font-semibold text-foreground">Stock:</span>
                                            <span className="ml-2 text-muted-foreground">{product.stock} units available</span>
                                        </div>
                                    )}
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
                </div >
            </div >
        </div >
    )
}
