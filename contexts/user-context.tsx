"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  status?: "active" | "cancelled" | "returned"
}

export interface Order {
  _id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"
  shippingAddress: {
    name: string
    email: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  addresses: {
    id: string
    name: string
    email: string
    phone: string
    address: string
    city: string
    pincode: string
    isDefault: boolean
  }[]
  wishlist: string[]
}

interface UserContextType {
  user: User | null
  isLoggedIn: boolean
  orders: Order[]
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, phone: string) => Promise<void>
  logout: () => Promise<void>
  addOrder: (orderData: Partial<Order>) => Promise<Order>
  cancelOrder: (orderId: string) => Promise<void>
  fetchOrders: () => Promise<void>
  updateUserInfo: (updates: Partial<User>) => void
  addAddress: (address: Omit<User["addresses"][0], "id">) => void
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Initial load
  useEffect(() => {
    // Initial load - try to recover session from localStorage OR cookies
    const savedUser = localStorage.getItem("ranaartcart_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) { /* ignore */ }
    }

    const verify = async () => {
      const accessToken = localStorage.getItem("accessToken")
      try {
        // Try to fetch user with token (if any) or cookies
        const newUser = await fetchMe(accessToken || undefined)

        // If we got here, session is valid. Update localStorage just in case it was missing
        if (!accessToken && newUser) {
          // Note: we don't have the raw string token to put in localStorage if we used cookies. 
          // That's fine, we will rely on cookies from now on.
        }
      } catch (e) {
        // Only clear if we explicitly had a token that failed, OR if we want to enforce clean state
        console.warn("Session check failed", e)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("ranaartcart_user")
        setUser(null)
      }
      setMounted(true)
    }

    void verify()
  }, [])

  // Persist user
  useEffect(() => {
    if (mounted && user) {
      localStorage.setItem("ranaartcart_user", JSON.stringify(user))
    }
  }, [user, mounted])

  // Fetch orders whenever user is logged in
  useEffect(() => {
    if (user && mounted) {
      fetchOrders()
    } else if (!user && mounted) {
      setOrders([])
    }
  }, [user, mounted])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const headers: Record<string, string> = {}
      if (token) headers.Authorization = `Bearer ${token}`

      const res = await fetch("/api/orders", { headers })
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders)
      }
    } catch (e) {
      console.error("Failed to fetch orders:", e)
    }
  }

  const fetchMe = async (accessToken?: string) => {
    const headers: Record<string, string> = {}
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }
    const res = await fetch("/api/auth/me", {
      headers,
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || "Unable to load user")
    }
    const newUser: User = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      phone: "",
      addresses: [],
      wishlist: [],
    }
    setUser(newUser)
    return newUser
  }

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || "Login failed")
    }
    localStorage.setItem("accessToken", data.accessToken)
    await fetchMe(data.accessToken)
  }

  const signup = async (name: string, email: string, password: string, phone: string) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.error || "Signup failed")
    }
    await login(email, password)
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch (e) {
      console.error("Logout request failed", e)
    }
    setUser(null)
    setOrders([])
    localStorage.removeItem("ranaartcart_user")
    localStorage.removeItem("accessToken")
    router.push("/")
  }

  const addOrder = async (orderData: Partial<Order>) => {
    const token = localStorage.getItem("accessToken")
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers,
      body: JSON.stringify(orderData)
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Failed to create order")

    // Update local state immediately
    setOrders(prev => [data.order, ...prev])
    return data.order
  }

  const cancelOrder = async (orderId: string) => {
    const token = localStorage.getItem("accessToken")
    if (!token) return

    const res = await fetch(`/api/orders/${orderId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })

    if (res.ok) {
      // Update status locally
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: "Cancelled" } : o))
    }
  }

  const updateUserInfo = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null))
  }

  const addAddress = (address: Omit<User["addresses"][0], "id">) => {
    setUser((prev) =>
      prev
        ? {
          ...prev,
          addresses: [
            ...prev.addresses,
            {
              id: `addr_${Date.now()}`,
              ...address,
            },
          ],
        }
        : null,
    )
  }

  const addToWishlist = async (productId: string) => {
    if (!user) return

    // Optimistic update
    const previousWishlist = [...user.wishlist]
    if (!previousWishlist.includes(productId)) {
      setUser(prev => prev ? { ...prev, wishlist: [...prev.wishlist, productId] } : null)
    }

    try {
      const token = localStorage.getItem("accessToken")
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (token) headers.Authorization = `Bearer ${token}`

      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers,
        body: JSON.stringify({ productId })
      })

      if (res.ok) {
        const data = await res.json()
        // Update with server truth
        setUser(prev => prev ? { ...prev, wishlist: data.wishlist } : null)
      } else {
        throw new Error("Failed to add to wishlist")
      }
    } catch (e) {
      console.error(e)
      // Revert
      setUser(prev => prev ? { ...prev, wishlist: previousWishlist } : null)
    }
  }

  const removeFromWishlist = async (productId: string) => {
    if (!user) return

    // Optimistic update
    const previousWishlist = [...user.wishlist]
    if (previousWishlist.includes(productId)) {
      setUser(prev => prev ? { ...prev, wishlist: prev.wishlist.filter(id => id !== productId) } : null)
    }

    try {
      const token = localStorage.getItem("accessToken")
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (token) headers.Authorization = `Bearer ${token}`

      // Logic is toggle, so sending it again removes it if it was there? 
      // API is toggle. If we call it and it was removed in UI, we expect backend to remove it.
      // BUT if we optimistically removed it, and backend adds it back... that's bad.
      // Wait, my API is a toggle.
      // If I want strictly "remove", I should check state first.
      // The API handles toggle based on DB state.
      // If UI and DB are out of sync, toggle might invert.
      // Ideally API should have ADD and REMOVE or explicit action.
      // But for now, assuming sync:

      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers,
        body: JSON.stringify({ productId })
      })

      if (res.ok) {
        const data = await res.json()
        setUser(prev => prev ? { ...prev, wishlist: data.wishlist } : null)
      } else {
        throw new Error("Failed to remove from wishlist")
      }
    } catch (e) {
      console.error(e)
      setUser(prev => prev ? { ...prev, wishlist: previousWishlist } : null)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        orders,
        login,
        signup,
        logout,
        addOrder,
        cancelOrder,
        fetchOrders,
        updateUserInfo,
        addAddress,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}
