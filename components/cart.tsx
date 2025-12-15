"use client"

import { X, Trash2, Plus, Minus, CreditCard, Truck, Bell } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface CartProps {
  onClose: () => void
}

export default function Cart({ onClose }: CartProps) {
  const { items, removeItem, updateQuantity, clearCart } = useCart()
  const { user, addOrder } = useUser()
  const router = useRouter()
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "payment" | "confirmation">("cart")
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    pincode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [shippingMethod, setShippingMethod] = useState("standard")

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shippingCost =
    shippingMethod === "express" ? 199 : shippingMethod === "standard" ? (subtotal > 999 ? 0 : 99) : 49
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shippingCost + tax

  const handleShippingContinue = () => {
    if (
      customerInfo.name &&
      customerInfo.email &&
      customerInfo.phone &&
      customerInfo.address &&
      customerInfo.city &&
      customerInfo.pincode
    ) {
      setCheckoutStep("payment")
    }
  }

  const handlePayment = () => {
    // Simulate payment processing
    if (paymentMethod === "card") {
      // Mock card validation
      setCheckoutStep("confirmation")
      const order: any = {
        id: `order_${Date.now()}`,
        orderNumber: `RAC${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString(),
        items: items,
        total: total,
        status: "processing",
        trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        estimatedDelivery: new Date(
          Date.now() + (shippingMethod === "express" ? 2 : shippingMethod === "standard" ? 5 : 1) * 24 * 60 * 60 * 1000,
        )
          .toISOString()
          .split("T")[0],
        customerInfo: customerInfo,
      }
      addOrder(order)
      clearCart()
    }
  }

  if (checkoutStep === "confirmation") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg max-w-md w-full p-6 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Order Confirmed!</h2>
          <p className="text-muted-foreground mb-4">
            Your order has been placed successfully. A confirmation email has been sent to {customerInfo.email}
          </p>
          <div className="bg-background rounded-lg p-4 mb-6 text-left space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                Payment: {paymentMethod === "card" ? "Debit/Credit Card" : "UPI"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-primary" />
              <span className="text-sm text-foreground">
                Shipping:{" "}
                {shippingMethod === "express"
                  ? "Express (2 days)"
                  : shippingMethod === "standard"
                    ? "Standard (5 days)"
                    : "Economy (7+ days)"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-primary" />
              <span className="text-sm text-foreground">Notifications enabled</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="bg-card w-full max-w-md h-full overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-card">
          <h2 className="text-xl font-bold text-foreground">
            {checkoutStep === "cart" ? "Shopping Cart" : checkoutStep === "shipping" ? "Shipping Details" : "Payment"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex gap-1">
            <div className={`flex-1 h-1 rounded-full ${checkoutStep === "cart" ? "bg-primary" : "bg-muted"}`} />
            <div
              className={`flex-1 h-1 rounded-full ${["shipping", "payment", "confirmation"].includes(checkoutStep) ? "bg-primary" : "bg-muted"}`}
            />
            <div
              className={`flex-1 h-1 rounded-full ${checkoutStep === "payment" || checkoutStep === "confirmation" ? "bg-primary" : "bg-muted"}`}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {checkoutStep === "cart" ? (
            <>
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-background rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">₹{item.price.toLocaleString("en-IN")}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-muted rounded transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-muted rounded transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-1 hover:bg-muted rounded transition-colors text-destructive"
                            aria-label="Remove from cart"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : checkoutStep === "shipping" ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Delivery Address</h3>
              <input
                type="text"
                placeholder="Full Name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                className="w-full px-3 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                className="w-full px-3 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className="w-full px-3 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <textarea
                placeholder="Street Address"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                className="w-full px-3 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                rows={2}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="City"
                  value={customerInfo.city}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                  className="px-3 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={customerInfo.pincode}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                  className="px-3 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <h3 className="font-semibold text-foreground mt-6">Shipping Method</h3>
              <div className="space-y-2">
                {[
                  { id: "express", label: "Express Delivery", time: "2 days", cost: 199 },
                  { id: "standard", label: "Standard Delivery", time: "5 days", cost: subtotal > 999 ? 0 : 99 },
                  { id: "economy", label: "Economy Delivery", time: "7+ days", cost: 49 },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${shippingMethod === method.id
                      ? "bg-primary bg-opacity-10 border-primary"
                      : "border-border hover:bg-muted"
                      }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={method.id}
                      checked={shippingMethod === method.id}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.time}</p>
                    </div>
                    <span className="text-sm font-bold text-primary">
                      {method.cost === 0 ? "FREE" : `₹${method.cost}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ) : checkoutStep === "payment" ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Payment Method</h3>
              <div className="space-y-2">
                {[
                  { id: "card", label: "Debit / Credit Card" },
                  { id: "upi", label: "UPI (Google Pay, PhonePe)" },
                  { id: "netbanking", label: "Net Banking" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${paymentMethod === method.id
                      ? "bg-primary bg-opacity-10 border-primary"
                      : "border-border hover:bg-muted"
                      }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} />
                      <span className="font-semibold text-sm text-foreground">{method.label}</span>
                    </div>
                  </label>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <input
                    type="text"
                    placeholder="Card Number"
                    defaultValue="4111 1111 1111 1111"
                    className="w-full px-3 py-2 bg-input text-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      defaultValue="12/25"
                      className="px-3 py-2 bg-input text-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      defaultValue="123"
                      className="px-3 py-2 bg-input text-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Demo card: 4111 1111 1111 1111</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-background rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">₹{item.price.toLocaleString("en-IN")}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm font-semibold">{item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-border bg-card p-4 space-y-3">
          {checkoutStep === "cart" && items.length > 0 && (
            <>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <button
                onClick={() => {
                  if (user) {
                    onClose()
                    router.push("/choose-seller")
                  } else {
                    alert("Please login to continue")
                  }
                }}
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Choose Seller
              </button>
            </>
          )}
          {checkoutStep === "shipping" && (
            <>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCheckoutStep("cart")}
                  className="flex-1 bg-muted text-muted-foreground py-2 rounded-lg font-semibold hover:bg-border transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleShippingContinue}
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Continue to Payment
                </button>
              </div>
            </>
          )}
          {checkoutStep === "payment" && (
            <>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCheckoutStep("shipping")}
                  className="flex-1 bg-muted text-muted-foreground py-2 rounded-lg font-semibold hover:bg-border transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 bg-accent text-accent-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Complete Payment
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
