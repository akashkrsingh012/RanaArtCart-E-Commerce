"use client"

import { useCart } from "@/hooks/use-cart"
import { useUser } from "@/contexts/user-context"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, CheckCircle2 } from "lucide-react"

interface SingleProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

export default function CheckoutPage() {
    const { items: cartItems, clearCart } = useCart()
    const { user, addOrder } = useUser()
    const router = useRouter()
    const searchParams = useSearchParams()

    // Check for buy now flow
    const buyNowProductId = searchParams.get("productId")
    const buyNowSellerId = searchParams.get("sellerId")

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [buyNowItem, setBuyNowItem] = useState<SingleProduct | null>(null)
    const [initializing, setInitializing] = useState(!!buyNowProductId)

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "India",
    })

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || prev.name,
                email: user.email || prev.email
            }))
        }
    }, [user])

    useEffect(() => {
        const fetchBuyNowProduct = async () => {
            if (!buyNowProductId) return

            try {
                const res = await fetch(`/api/products/${buyNowProductId}`)
                if (res.ok) {
                    const data = await res.json()
                    setBuyNowItem({
                        id: data.product._id,
                        name: data.product.name,
                        price: data.product.price,
                        image: data.product.image,
                        quantity: 1
                    })
                }
            } catch (error) {
                console.error("Error fetching buy now product:", error)
            } finally {
                setInitializing(false)
            }
        }

        fetchBuyNowProduct()
    }, [buyNowProductId])

    // Determine actual items to checkout (Cart vs Buy Now)
    const actualItems = buyNowItem ? [buyNowItem] : cartItems
    const subtotal = actualItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const shipping = subtotal > 999 ? 0 : 99
    const total = subtotal + shipping

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const orderData = {
                items: actualItems.map(item => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                totalAmount: total,
                shippingAddress: {
                    name: formData.name,
                    email: formData.email,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip,
                    country: formData.country,
                },
                // Pass sellerId only if in Buy Now mode
                sellerId: buyNowItem ? buyNowSellerId : undefined
            }

            await addOrder(orderData)

            setSuccess(true)
            if (!buyNowItem) {
                clearCart() // Only clear cart if this was a cart checkout
            }

            setTimeout(() => {
                router.push("/orders") // Redirect to orders instead of dashboard for better UX
            }, 2000)
        } catch (error) {
            console.error("Order failed:", error)
            const errorMessage = error instanceof Error ? error.message : "Failed to place order. Please try again."
            setError(errorMessage)

            // If it's a login error, redirect to login
            if (errorMessage.includes("log in") || errorMessage.includes("Session expired")) {
                setTimeout(() => {
                    router.push("/login")
                }, 2000)
            }
        } finally {
            setLoading(false)
        }
    }

    if (initializing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        )
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <CheckCircle2 size={64} className="text-green-500 mx-auto" />
                    <h1 className="text-2xl font-bold">Order Placed Successfully!</h1>
                    <p className="text-muted-foreground">Redirecting to your orders...</p>
                </div>
            </div>
        )
    }

    if (actualItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Your checkout is empty</h1>
                    <p className="text-muted-foreground">Add some items to checkout</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="space-y-6">
                        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4 max-h-[300px] overflow-auto pr-2">
                                {actualItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium line-clamp-1">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            <p className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-border mt-4 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                                    <span>Total</span>
                                    <span className="text-primary">₹{total.toLocaleString("en-IN")}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Details Form */}
                    <div>
                        <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                            <h2 className="text-xl font-semibold mb-6">Delivery Details</h2>
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                                    <input
                                        id="name"
                                        required
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="address" className="text-sm font-medium">Address</label>
                                    <textarea
                                        id="address"
                                        required
                                        className="w-full px-3 py-2 border border-input rounded-md bg-background min-h-[80px]"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="city" className="text-sm font-medium">City</label>
                                        <input
                                            id="city"
                                            required
                                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="state" className="text-sm font-medium">State</label>
                                        <input
                                            id="state"
                                            required
                                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="zip" className="text-sm font-medium">PIN Code</label>
                                        <input
                                            id="zip"
                                            required
                                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                                            value={formData.zip}
                                            onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="country" className="text-sm font-medium">Country</label>
                                        <input
                                            id="country"
                                            readOnly
                                            className="w-full px-3 py-2 border border-input rounded-md bg-muted text-muted-foreground cursor-not-allowed"
                                            value={formData.country}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 mt-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        "Place Order"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
