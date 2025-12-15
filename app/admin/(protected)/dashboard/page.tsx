"use client"

import { useEffect, useState } from "react"
import { Check, X, Store, AlertCircle } from "lucide-react"

export default function AdminDashboardPage() {
  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("pending") // pending | approved

  useEffect(() => {
    fetchSellers()
  }, [])

  const fetchSellers = async () => {
    try {
      const res = await fetch("/api/admin/sellers")
      if (res.ok) {
        const data = await res.json()
        setSellers(data.sellers)
      }
    } catch (error) {
      console.error("Failed to fetch sellers")
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (sellerId, action) => {
    try {
      const res = await fetch("/api/admin/sellers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sellerId, action })
      })

      if (res.ok) {
        // Refresh list
        fetchSellers()
      }
    } catch (error) {
      console.error("Action failed")
    }
  }

  const filteredSellers = sellers.filter(seller =>
    activeTab === "pending" ? !seller.isApproved : seller.isApproved
  )

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading dashboard data...</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Seller Administration</h1>
        <p className="text-slate-500">Manage seller applications and active accounts</p>
      </header>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${activeTab === "pending"
              ? "border-amber-500 text-amber-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
        >
          Pending Requests ({sellers.filter(s => !s.isApproved).length})
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${activeTab === "approved"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
        >
          Verified Sellers ({sellers.filter(s => s.isApproved).length})
        </button>
      </div>

      {/* Content list */}
      <div className="grid gap-4">
        {filteredSellers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200 border-dashed">
            <AlertCircle className="mx-auto h-12 w-12 text-slate-300 mb-2" />
            <h3 className="text-lg font-medium text-slate-900">No sellers found</h3>
            <p className="text-slate-500">There are no {activeTab} sellers at the moment.</p>
          </div>
        ) : (
          filteredSellers.map(seller => (
            <div key={seller.id} className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-full">
                  <Store className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{seller.businessName}</h3>
                  <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-slate-600 mt-1">
                    <span>Owner: {seller.name}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{seller.email}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{seller.phone}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2 max-w-2xl">{seller.businessDescription}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded uppercase tracking-wider">
                      {seller.category}
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded">
                      Registered: {new Date(seller.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                {activeTab === "pending" ? (
                  <>
                    <button
                      onClick={() => handleAction(seller.id, "reject")}
                      className="flex-1 md:flex-none px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <X size={18} />
                      Reject
                    </button>
                    <button
                      onClick={() => handleAction(seller.id, "approve")}
                      className="flex-1 md:flex-none px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Check size={18} />
                      Approve
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleAction(seller.id, "reject")}
                    className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 font-medium rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={18} />
                    Revoke Access
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
