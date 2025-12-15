"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Promotion {
  id: string
  title: string
  description: string
  discountPercent: number
  startDate: string
  endDate: string
  productIds: string[]
  isActive: boolean
}

export interface AdminStats {
  totalSellers: number
  approvedSellers: number
  pendingSellers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
}

interface AdminContextType {
  adminUser: { id: string; email: string; role: string } | null
  promotions: Promotion[]
  stats: AdminStats | null
  loginAdmin: (email: string, password: string) => void
  logoutAdmin: () => void
  addPromotion: (promotion: Omit<Promotion, "id">) => void
  updatePromotion: (id: string, updates: Partial<Promotion>) => void
  deletePromotion: (id: string) => void
  updateAdminStats: (stats: AdminStats) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [adminUser, setAdminUser] = useState<{ id: string; email: string; role: string } | null>(null)
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedAdmin = localStorage.getItem("ranaartcart_admin")
    const savedPromotions = localStorage.getItem("ranaartcart_promotions")
    const savedStats = localStorage.getItem("ranaartcart_admin_stats")

    if (savedAdmin) {
      try {
        setAdminUser(JSON.parse(savedAdmin))
      } catch (e) {
        console.error("Failed to load admin:", e)
      }
    }

    if (savedPromotions) {
      try {
        setPromotions(JSON.parse(savedPromotions))
      } catch (e) {
        console.error("Failed to load promotions:", e)
      }
    }

    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats))
      } catch (e) {
        console.error("Failed to load stats:", e)
      }
    }

    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && adminUser) {
      localStorage.setItem("ranaartcart_admin", JSON.stringify(adminUser))
    }
  }, [adminUser, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ranaartcart_promotions", JSON.stringify(promotions))
    }
  }, [promotions, mounted])

  useEffect(() => {
    if (mounted && stats) {
      localStorage.setItem("ranaartcart_admin_stats", JSON.stringify(stats))
    }
  }, [stats, mounted])

  const loginAdmin = (_email: string, _password: string) => {
    // Disabled mock login. Integrate with a real admin auth backend.
    throw new Error("Admin login is not configured. Please connect to the backend API.")
  }

  const logoutAdmin = () => {
    setAdminUser(null)
    localStorage.removeItem("ranaartcart_admin")
  }

  const addPromotion = (promotion: Omit<Promotion, "id">) => {
    const newPromotion: Promotion = {
      id: `promo_${Date.now()}`,
      ...promotion,
    }
    setPromotions((prev) => [...prev, newPromotion])
  }

  const updatePromotion = (id: string, updates: Partial<Promotion>) => {
    setPromotions((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deletePromotion = (id: string) => {
    setPromotions((prev) => prev.filter((p) => p.id !== id))
  }

  const updateAdminStats = (newStats: AdminStats) => {
    setStats(newStats)
  }

  return (
    <AdminContext.Provider
      value={{
        adminUser,
        promotions,
        stats,
        loginAdmin,
        logoutAdmin,
        addPromotion,
        updatePromotion,
        deletePromotion,
        updateAdminStats,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider")
  }
  return context
}
