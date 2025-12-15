"use client"

import { useEffect, useState } from "react"
import SellerLayout from "@/components/seller/SellerLayout"
import StatCard from "@/components/seller/StatCard"
import SalesChart from "@/components/seller/SalesChart"
import OrdersChart from "@/components/seller/OrdersChart"
import RecentOrdersTable from "@/components/seller/RecentOrdersTable"

export default function SellerDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCategories: 0,
    totalUsers: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch products
        const token = localStorage.getItem("sellerAccessToken")
        const headers: Record<string, string> = {}
        if (token) {
          headers.Authorization = `Bearer ${token}`
        }

        // Get seller info
        const meRes = await fetch("/api/seller/me", { headers, credentials: "include" })
        if (!meRes.ok) return
        
        const { seller } = await meRes.json()

        // Fetch seller's products
        const productsRes = await fetch(`/api/products?sellerId=${seller.id}`, { headers })
        const { products } = await productsRes.json()

        // Fetch seller's orders
        const ordersRes = await fetch("/api/seller/orders", { headers, credentials: "include" })
        const { orders } = await ordersRes.json()

        setStats({
          totalProducts: products?.length || 0,
          totalOrders: orders?.length || 0,
          totalCategories: 8, // TODO: Implement categories API
          totalUsers: 0, // TODO: Implement users count
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
        // Fallback to default values
        setStats({
          totalProducts: 0,
          totalOrders: 0,
          totalCategories: 0,
          totalUsers: 0,
        })
      }
    }

    fetchStats()
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <SellerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Products" value={stats.totalProducts} change="+12%" changeType="positive" icon="package" />
          <StatCard title="Total Orders" value={stats.totalOrders} change="+8%" changeType="positive" icon="shopping" />
          <StatCard title="Total Categories" value={stats.totalCategories} change="+3%" changeType="positive" icon="folder" />
          <StatCard title="Total Users" value={stats.totalUsers} change="+15%" changeType="positive" icon="users" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <OrdersChart />
        </div>

        <RecentOrdersTable />
      </div>
    </SellerLayout>
  )
}
