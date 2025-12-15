"use client"

import { useUser } from "@/contexts/user-context"
import { Package, Clock, CheckCircle2, XCircle, Truck, ShoppingBag, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function OrdersPage() {
  const { user, isLoggedIn, orders, cancelOrder, fetchOrders } = useUser()
  const router = useRouter()
  const [cancellingId, setCancellingId] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  // In case orders are not fetched yet
  useEffect(() => {
    if (isLoggedIn) fetchOrders()
  }, [isLoggedIn])

  const handleCancel = async (orderId: string) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      setCancellingId(orderId)
      try {
        await cancelOrder(orderId)
      } catch (error) {
        alert("Failed to cancel order")
      } finally {
        setCancellingId(null)
      }
    }
  }

  if (!user) return null

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return <Clock className="text-yellow-500" />
      case "processing": return <Package className="text-blue-500" />
      case "shipped": return <Truck className="text-indigo-500" />
      case "delivered": return <CheckCircle2 className="text-green-500" />
      case "cancelled": return <XCircle className="text-red-500" />
      default: return <Package className="text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <Link href="/" className="text-primary hover:underline">
            Continue Shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No orders placed yet</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't bought anything yet.</p>
            <Link
              href="/"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id || Math.random()} className="bg-card rounded-lg border border-border overflow-hidden shadow-sm">
                <div className="p-4 bg-muted/30 border-b border-border flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-mono text-sm font-medium">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-medium">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="font-medium capitalize">{order.status}</span>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      {item.image && (
                        <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`font-medium ${item.status === 'cancelled' ? 'text-slate-400 line-through' : ''}`}>{item.name}</h3>
                          {item.status === 'cancelled' && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded uppercase tracking-wide">
                              Out of Stock / Cancelled
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-muted/10 border-t border-border flex justify-end">
                  {order.status === "Pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      disabled={cancellingId === order._id}
                      className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2 px-4 py-2 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                    >
                      {cancellingId === order._id && <Loader2 size={14} className="animate-spin" />}
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
