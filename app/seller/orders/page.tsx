"use client"

import { useEffect, useState } from "react"
import SellerLayout from "@/components/seller/SellerLayout"
import { Loader2, Package, Truck, CheckCircle2, XCircle, Clock, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

interface OrderItem {
    productId: string
    name: string
    price: number
    quantity: number
    image?: string
}

interface ShippingAddress {
    name: string
    email: string
    address: string
    city: string
    state: string
    zip: string
    country: string
}

interface SellerOrder {
    _id: string
    orderId: string
    userId: string
    userName: string
    userEmail: string
    items: OrderItem[]
    sellerSubtotal: number
    totalAmount: number
    shippingAddress: ShippingAddress
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
    paymentMethod: string
    createdAt: string
    updatedAt: string
}

export default function SellerOrdersPage() {
    const router = useRouter()
    const [orders, setOrders] = useState<SellerOrder[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [selectedOrder, setSelectedOrder] = useState<SellerOrder | null>(null)

    useEffect(() => {
        fetchOrders()
        // Refresh orders every 30 seconds for real-time updates
        const interval = setInterval(fetchOrders, 30000)
        return () => clearInterval(interval)
    }, [])

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("sellerAccessToken")
            const headers: Record<string, string> = {}
            if (token) {
                headers.Authorization = `Bearer ${token}`
            }

            const res = await fetch("/api/seller/orders", {
                headers,
                credentials: "include"
            })

            if (res.status === 401) {
                router.push("/seller/login")
                return
            }

            if (!res.ok) {
                throw new Error("Failed to fetch orders")
            }

            const data = await res.json()
            setOrders(data.orders || [])
            setError(null)
        } catch (err: any) {
            setError(err.message || "Failed to load orders")
            console.error("Error fetching orders:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        try {
            const token = localStorage.getItem("sellerAccessToken")
            const headers: Record<string, string> = {
                "Content-Type": "application/json"
            }
            if (token) {
                headers.Authorization = `Bearer ${token}`
            }

            const res = await fetch(`/api/seller/orders/${orderId}`, {
                method: "PATCH",
                headers,
                body: JSON.stringify({ status: newStatus }),
                credentials: "include"
            })

            if (!res.ok) {
                throw new Error("Failed to update order status")
            }

            // Refresh orders after update
            await fetchOrders()
        } catch (err: any) {
            alert(err.message || "Failed to update order status")
            console.error("Error updating order:", err)
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Pending":
                return <Clock className="text-yellow-500" size={20} />
            case "Processing":
                return <Package className="text-blue-500" size={20} />
            case "Shipped":
                return <Truck className="text-indigo-500" size={20} />
            case "Delivered":
                return <CheckCircle2 className="text-green-500" size={20} />
            case "Cancelled":
                return <XCircle className="text-red-500" size={20} />
            default:
                return <Clock className="text-gray-500" size={20} />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-300"
            case "Processing":
                return "bg-blue-100 text-blue-800 border-blue-300"
            case "Shipped":
                return "bg-indigo-100 text-indigo-800 border-indigo-300"
            case "Delivered":
                return "bg-green-100 text-green-800 border-green-300"
            case "Cancelled":
                return "bg-red-100 text-red-800 border-red-300"
            default:
                return "bg-gray-100 text-gray-800 border-gray-300"
        }
    }

    const filteredOrders = selectedStatus === "all" 
        ? orders 
        : orders.filter(order => order.status === selectedStatus)

    if (loading) {
        return (
            <SellerLayout>
                <div className="flex h-screen items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                </div>
            </SellerLayout>
        )
    }

    return (
        <SellerLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
                        <p className="text-gray-600 mt-1">Manage and track all your orders</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Orders</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                            onClick={fetchOrders}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                        <Package className="mx-auto text-gray-400 mb-4" size={48} />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h2>
                        <p className="text-gray-600">
                            {selectedStatus === "all" 
                                ? "You don't have any orders yet." 
                                : `No ${selectedStatus.toLowerCase()} orders found.`}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Order #{order.orderId.slice(-8).toUpperCase()}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-gray-900">
                                                ₹{order.sellerSubtotal.toLocaleString("en-IN")}
                                            </p>
                                            <p className="text-sm text-gray-600">Your Items</p>
                                        </div>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Customer Information</h4>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">Name: </span>
                                                <span className="font-medium text-gray-900">{order.userName}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Email: </span>
                                                <span className="font-medium text-gray-900">{order.userEmail}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                                        <div className="space-y-3">
                                            {order.items.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                                                >
                                                    {item.image && (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-16 h-16 object-cover rounded"
                                                        />
                                                    )}
                                                    <div className="flex-1">
                                                        <h5 className="font-medium text-gray-900">{item.name}</h5>
                                                        <p className="text-sm text-gray-600">
                                                            Quantity: {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-gray-900">
                                                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                                        <p className="text-sm text-gray-700">
                                            {order.shippingAddress.name}<br />
                                            {order.shippingAddress.address}<br />
                                            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}<br />
                                            {order.shippingAddress.country}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(order.status)}
                                            <span className="text-sm text-gray-600">Payment: {order.paymentMethod}</span>
                                        </div>
                                        {order.status !== "Delivered" && order.status !== "Cancelled" && (
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-sm text-gray-600 text-center">
                    Total Orders: {filteredOrders.length} | Showing {selectedStatus === "all" ? "all" : selectedStatus} orders
                </div>
            </div>
        </SellerLayout>
    )
}


