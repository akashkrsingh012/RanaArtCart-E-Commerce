"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import Link from "next/link"
import { useSeller } from "@/contexts/seller-context"

export default function LoginPage() {
  const router = useRouter()
  const { login: loginUser } = useUser()
  const { loginSeller } = useSeller() // Add this import
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSeller, setIsSeller] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    // Clear previous errors
    setError("")

    try {
      if (isSeller) {
        await loginSeller(email, password)
        router.push("/seller/dashboard")
      } else {
        await loginUser(email, password)
        router.push("/")
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed"
      setError(message)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-lg border border-border p-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
          {isSeller ? "Seller Login" : "Welcome Back"}
        </h1>
        <p className="text-muted-foreground text-center mb-6">
          {isSeller
            ? "Sign in to your seller dashboard"
            : "Sign in to your ranaartcart account"
          }
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">{error}</div>
          )}

          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="isSeller"
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isSeller" className="text-sm font-medium text-foreground cursor-pointer select-none">
              Login as a Seller
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={isSeller ? "seller@example.com" : "your@email.com"}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {isSeller ? "Login to Dashboard" : "Sign In"}
          </button>
        </form>

        <div className="text-center text-muted-foreground mt-4">
          <p className="mb-2">Don't have an account?</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup" className="text-primary font-semibold hover:underline">
              Sign up as a User
            </Link>
            <span>|</span>
            <Link href="/seller/register" className="text-primary font-semibold hover:underline">
              Sign up as a Seller
            </Link>
          </div>

        </div>

        <div className="text-center mt-6 pt-4 border-t border-border">
          <Link href="/admin/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2">
            Login as Administrator
          </Link>
        </div>
      </div>
    </div>
  )
}
