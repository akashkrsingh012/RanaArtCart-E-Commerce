"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/contexts/admin-context"
import Link from "next/link"

export default function NewPromotionPage() {
  const router = useRouter()
  const { addPromotion } = useAdmin()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountPercent: "",
    startDate: "",
    endDate: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (
      !formData.title ||
      !formData.description ||
      !formData.discountPercent ||
      !formData.startDate ||
      !formData.endDate
    ) {
      setError("Please fill in all fields")
      return
    }

    if (isNaN(Number(formData.discountPercent))) {
      setError("Discount must be a number")
      return
    }

    addPromotion({
      title: formData.title,
      description: formData.description,
      discountPercent: Number(formData.discountPercent),
      startDate: formData.startDate,
      endDate: formData.endDate,
      productIds: [],
      isActive: true,
    })

    router.push("/admin/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/admin/dashboard" className="text-primary font-semibold hover:underline mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-card rounded-lg border border-border p-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">Create New Promotion</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">{error}</div>
            )}

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Promotion Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Summer Art Sale"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
                placeholder="Describe the promotion..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Discount %</label>
              <input
                type="number"
                value={formData.discountPercent}
                onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                className="w-full px-4 py-2 bg-input text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2 bg-input text-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2 bg-input text-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Create Promotion
              </button>
              <Link
                href="/admin/dashboard"
                className="flex-1 bg-muted text-muted-foreground py-2 rounded-lg font-semibold hover:bg-border text-center transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
