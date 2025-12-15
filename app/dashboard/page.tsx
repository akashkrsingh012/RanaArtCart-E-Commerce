"use client"

import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { UserIcon, MapPin, Phone, Mail, Package, Clock, CheckCircle2, Truck } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, isLoggedIn, orders, fetchOrders } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders()
    }
  }, [isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null

  const recentOrders = orders.slice(0, 3) // Show only 3 most recent orders

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return <Clock className="text-yellow-500" size={16} />
      case "processing": return <Package className="text-blue-500" size={16} />
      case "shipped": return <Truck className="text-indigo-500" size={16} />
      case "delivered": return <CheckCircle2 className="text-green-500" size={16} />
      default: return <Package className="text-gray-500" size={16} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Dashboard</h1>

        {/* User Info */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <UserIcon size={32} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-foreground">
              <Mail size={18} />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Phone size={18} />
              <span>{user.phone || "Not provided"}</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        {orders.length > 0 && (
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">Recent Orders</h3>
              <Link href="/orders" className="text-primary hover:underline text-sm">
                View All ({orders.length})
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Link
                  key={order._id}
                  href="/orders"
                  className="block p-4 bg-background rounded-lg border border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="font-medium capitalize text-sm">{order.status}</span>
                    </div>
                    <span className="font-semibold">₹{order.totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Order #{order._id.slice(-8)}</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            href="/orders"
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="font-semibold text-foreground mb-2">My Orders</h3>
            <p className="text-muted-foreground text-sm">Track and manage your orders</p>
          </Link>
          <Link
            href="/wishlist"
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="font-semibold text-foreground mb-2">Wishlist</h3>
            <p className="text-muted-foreground text-sm">View your saved items</p>
          </Link>
          <Link
            href="/"
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="font-semibold text-foreground mb-2">Continue Shopping</h3>
            <p className="text-muted-foreground text-sm">Browse more products</p>
          </Link>
        </div>

        {/* Saved Addresses */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Saved Addresses</h3>
          {user.addresses.length === 0 ? (
            <p className="text-muted-foreground">No addresses saved yet</p>
          ) : (
            <div className="space-y-3">
              {user.addresses.map((addr) => (
                <div key={addr.id} className="p-4 bg-background rounded-lg border border-border">
                  <div className="flex items-start gap-2">
                    <MapPin size={18} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">{addr.name}</p>
                      <p className="text-sm text-muted-foreground">{addr.address}</p>
                      <p className="text-sm text-muted-foreground">
                        {addr.city} - {addr.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
