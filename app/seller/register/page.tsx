"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSeller } from "@/contexts/seller-context"
import Link from "next/link"
import { Check } from "lucide-react"

export default function SellerRegisterPage() {
  const router = useRouter()
  const { registerSeller } = useSeller()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    businessName: "",
    businessDescription: "",
    category: "paintings",
  })
  const [error, setError] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.businessName ||
      !formData.businessDescription
    ) {
      setError("Please fill in all fields")
      return
    }

    try {
      await registerSeller({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        businessDescription: formData.businessDescription,
        category: formData.category,
        password: formData.password,
      })
      setShowSuccessModal(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed"
      setError(message)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-2xl border border-slate-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Registration Submitted!</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Your account has been created and is currently <strong>pending admin approval</strong>.
              <br />
              An administrator will review your details shortly. You can login once verified.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/')}
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md w-full bg-card rounded-lg border border-border p-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Become a Seller</h1>
        <p className="text-muted-foreground text-center mb-6">Register your artisan business on ranaartcart</p>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">{error}</div>
          )}

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+91 9876543210"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Business Name</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-4 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your studio/business name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Business Description</label>
            <textarea
              value={formData.businessDescription}
              onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
              className="w-full px-4 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={3}
              placeholder="Tell us about your artisan work..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Primary Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-input text-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="paintings">Paintings</option>
              <option value="sculptures">Sculptures</option>
              <option value="pottery">Pottery</option>
              <option value="textiles">Textiles</option>
              <option value="jewelry">Jewelry</option>
              <option value="woodcraft">Woodcraft</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Register as Seller
          </button>
        </form>

        <p className="text-center text-muted-foreground mt-4">
          Already registered?{" "}
          <Link href="/seller/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
