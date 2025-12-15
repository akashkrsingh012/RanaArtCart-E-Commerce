"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface SellerProduct {
  id: string
  name: string
  description: string
  category: string
  price: number
  stock: number
  image: string
  sellerId: string
}

export interface Seller {
  id: string
  name: string
  email: string
  phone: string
  businessName: string
  businessDescription: string
  category: string
  bankAccount?: string
  isApproved: boolean
  products: SellerProduct[]
  createdAt: string
}

export interface SellerOrder {
  id: string
  orderNumber: string
  buyerName: string
  buyerEmail: string
  product: SellerProduct
  quantity: number
  totalPrice: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  date: string
}

interface SellerContextType {
  sellers: Seller[]
  currentSeller: Seller | null
  sellerOrders: SellerOrder[]
  registerSeller: (sellerData: Omit<Seller, "id" | "products" | "createdAt" | "isApproved" | "password"> & { password: string }) => Promise<void>
  loginSeller: (email: string, password: string) => Promise<void>
  logoutSeller: () => Promise<void>
  addProduct: (product: Omit<SellerProduct, "id" | "sellerId">) => void
  updateProduct: (productId: string, updates: Partial<SellerProduct>) => void
  deleteProduct: (productId: string) => void
  addSellerOrder: (order: SellerOrder) => void
  updateSellerOrderStatus: (orderId: string, status: string) => void
  approveSeller: (sellerId: string) => void
}

const SellerContext = createContext<SellerContextType | undefined>(undefined)

export function SellerProvider({ children }: { children: React.ReactNode }) {
  const [sellers, setSellers] = useState<Seller[]>([])
  const [currentSeller, setCurrentSeller] = useState<Seller | null>(null)
  const [sellerOrders, setSellerOrders] = useState<SellerOrder[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedSellers = localStorage.getItem("ranaartcart_sellers")
    const savedCurrentSeller = localStorage.getItem("ranaartcart_current_seller")
    const savedSellerOrders = localStorage.getItem("ranaartcart_seller_orders")
    const accessToken = localStorage.getItem("sellerAccessToken")

    if (savedSellers) {
      try {
        setSellers(JSON.parse(savedSellers))
      } catch (e) {
        console.error("Failed to load sellers:", e)
      }
    }

    if (savedSellerOrders) {
      try {
        setSellerOrders(JSON.parse(savedSellerOrders))
      } catch (e) {
        console.error("Failed to load seller orders:", e)
      }
    }

    const verify = async () => {
      if (accessToken) {
        try {
          const res = await fetch("/api/seller/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
          const data = await res.json()
          if (res.ok) {
            setCurrentSeller({
              id: data.seller.id,
              name: data.seller.name,
              email: data.seller.email,
              phone: data.seller.phone,
              businessName: data.seller.businessName,
              businessDescription: data.seller.businessDescription,
              category: data.seller.category,
              products: [],
              createdAt: new Date().toISOString(),
              isApproved: false,
            })
          } else {
            localStorage.removeItem("sellerAccessToken")
            localStorage.removeItem("ranaartcart_current_seller")
          }
        } catch (e) {
          console.warn("Stored seller token invalid, clearing", e)
          localStorage.removeItem("sellerAccessToken")
          localStorage.removeItem("ranaartcart_current_seller")
        }
      }
    setMounted(true)
    }

    void verify()
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ranaartcart_sellers", JSON.stringify(sellers))
    }
  }, [sellers, mounted])

  useEffect(() => {
    if (mounted && currentSeller) {
      localStorage.setItem("ranaartcart_current_seller", JSON.stringify(currentSeller))
    }
  }, [currentSeller, mounted])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("ranaartcart_seller_orders", JSON.stringify(sellerOrders))
    }
  }, [sellerOrders, mounted])

  const registerSeller = async (sellerData: Omit<Seller, "id" | "products" | "createdAt" | "isApproved" | "password"> & { password: string }) => {
    // Call signup API which now returns tokens and sets refreshToken cookie
    const res = await fetch("/api/seller/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sellerData),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || "Seller signup failed")
    }
    
    // Auto-login: Store accessToken from response
    // RefreshToken is already set in HttpOnly cookie by the API
    if (data.accessToken) {
      localStorage.setItem("sellerAccessToken", data.accessToken)

      // Fetch seller data to set current seller
      const meRes = await fetch("/api/seller/me", {
        headers: { Authorization: `Bearer ${data.accessToken}` },
      })
      const meData = await meRes.json()
      if (!meRes.ok) {
        throw new Error(meData.error || "Failed to load seller")
      }

      const seller: Seller = {
        id: meData.seller.id,
        name: meData.seller.name,
        email: meData.seller.email,
        phone: meData.seller.phone,
        businessName: meData.seller.businessName,
        businessDescription: meData.seller.businessDescription,
        category: meData.seller.category,
        products: [],
        createdAt: new Date().toISOString(),
        isApproved: false,
      }
      setCurrentSeller(seller)
      localStorage.setItem("ranaartcart_current_seller", JSON.stringify(seller))
    }
  }

  const loginSeller = async (email: string, password: string) => {
    const res = await fetch("/api/seller/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || "Seller login failed")
    }
    localStorage.setItem("sellerAccessToken", data.accessToken)

    const meRes = await fetch("/api/seller/me", {
      headers: { Authorization: `Bearer ${data.accessToken}` },
    })
    const meData = await meRes.json()
    if (!meRes.ok) {
      throw new Error(meData.error || "Failed to load seller")
    }

    const seller: Seller = {
      id: meData.seller.id,
      name: meData.seller.name,
      email: meData.seller.email,
      phone: meData.seller.phone,
      businessName: meData.seller.businessName,
      businessDescription: meData.seller.businessDescription,
      category: meData.seller.category,
      products: [],
      createdAt: new Date().toISOString(),
      isApproved: false,
    }
    setCurrentSeller(seller)
    localStorage.setItem("ranaartcart_current_seller", JSON.stringify(seller))
  }

  const logoutSeller = async () => {
    try {
      await fetch("/api/seller/logout", { method: "POST" })
    } catch (e) {
      console.error("Seller logout request failed", e)
    }
    setCurrentSeller(null)
    localStorage.removeItem("sellerAccessToken")
    localStorage.removeItem("ranaartcart_current_seller")
  }

  const addProduct = (product: Omit<SellerProduct, "id" | "sellerId">) => {
    if (!currentSeller) return

    const newProduct: SellerProduct = {
      id: `product_${Date.now()}`,
      ...product,
      sellerId: currentSeller.id,
    }

    setCurrentSeller((prev) =>
      prev
        ? {
            ...prev,
            products: [...prev.products, newProduct],
          }
        : null,
    )

    setSellers((prev) =>
      prev.map((s) =>
        s.id === currentSeller.id
          ? {
              ...s,
              products: [...s.products, newProduct],
            }
          : s,
      ),
    )
  }

  const updateProduct = (productId: string, updates: Partial<SellerProduct>) => {
    if (!currentSeller) return

    setCurrentSeller((prev) =>
      prev
        ? {
            ...prev,
            products: prev.products.map((p) => (p.id === productId ? { ...p, ...updates } : p)),
          }
        : null,
    )

    setSellers((prev) =>
      prev.map((s) =>
        s.id === currentSeller.id
          ? {
              ...s,
              products: s.products.map((p) => (p.id === productId ? { ...p, ...updates } : p)),
            }
          : s,
      ),
    )
  }

  const deleteProduct = (productId: string) => {
    if (!currentSeller) return

    setCurrentSeller((prev) =>
      prev
        ? {
            ...prev,
            products: prev.products.filter((p) => p.id !== productId),
          }
        : null,
    )

    setSellers((prev) =>
      prev.map((s) =>
        s.id === currentSeller.id
          ? {
              ...s,
              products: s.products.filter((p) => p.id !== productId),
            }
          : s,
      ),
    )
  }

  const addSellerOrder = (order: SellerOrder) => {
    setSellerOrders((prev) => [...prev, order])
  }

  const updateSellerOrderStatus = (orderId: string, status: string) => {
    setSellerOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: status as any } : o)))
  }

  const approveSeller = (sellerId: string) => {
    setSellers((prev) =>
      prev.map((s) =>
        s.id === sellerId
          ? {
              ...s,
              isApproved: true,
            }
          : s,
      ),
    )

    if (currentSeller?.id === sellerId) {
      setCurrentSeller((prev) => (prev ? { ...prev, isApproved: true } : null))
    }
  }

  return (
    <SellerContext.Provider
      value={{
        sellers,
        currentSeller,
        sellerOrders,
        registerSeller,
        loginSeller,
        logoutSeller,
        addProduct,
        updateProduct,
        deleteProduct,
        addSellerOrder,
        updateSellerOrderStatus,
        approveSeller,
      }}
    >
      {children}
    </SellerContext.Provider>
  )
}

export function useSeller() {
  const context = useContext(SellerContext)
  if (!context) {
    throw new Error("useSeller must be used within SellerProvider")
  }
  return context
}
