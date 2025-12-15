"use client"

import { Package, ShoppingCart, FolderTree, Users } from "lucide-react"

const icons = {
  package: Package,
  shopping: ShoppingCart,
  folder: FolderTree,
  users: Users,
}

interface StatCardProps {
  title: string
  value: number
  change: string
  changeType: "positive" | "negative"
  icon: keyof typeof icons
}

export default function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  const Icon = icons[icon]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="text-blue-600" size={24} />
        </div>
        <span
          className={`text-sm font-semibold px-2 py-1 rounded-full ${
            changeType === "positive" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {change}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
      </div>
    </div>
  )
}












