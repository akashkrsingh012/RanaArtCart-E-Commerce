"use client"

import Link from "next/link"
import { Eye } from "lucide-react"

// Dummy data
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    total: 2499,
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 1599,
    status: "processing",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    total: 3299,
    status: "shipped",
    date: "2024-01-13",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    total: 899,
    status: "delivered",
    date: "2024-01-12",
  },
  {
    id: "ORD-005",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    total: 4499,
    status: "pending",
    date: "2024-01-11",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function RecentOrdersTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <p className="text-sm text-gray-600">Latest customer orders</p>
        </div>
        <Link
          href="/seller/orders"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View all →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Order ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Customer</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{order.customer}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{order.email}</td>
                <td className="py-3 px-4 text-sm font-semibold text-gray-900">₹{order.total.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      statusColors[order.status as keyof typeof statusColors]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                <td className="py-3 px-4">
                  <Link
                    href={`/seller/orders/${order.id}`}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}












