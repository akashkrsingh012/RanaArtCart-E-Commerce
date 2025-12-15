"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Package, FolderTree, Users, Settings, LogOut, ShoppingCart } from "lucide-react"
import { useSeller } from "@/contexts/seller-context"

const menuItems = [
  { label: "Dashboard", href: "/seller/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/seller/orders", icon: ShoppingCart },
  { label: "Products", href: "/seller/products", icon: Package },
  { label: "Categories", href: "/seller/categories", icon: FolderTree },
  { label: "Users", href: "/seller/users", icon: Users },
  { label: "Settings", href: "/seller/settings", icon: Settings },
]

export default function SellerSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logoutSeller } = useSeller()

  const handleLogout = async () => {
    await logoutSeller()
    router.push("/seller/login")
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Seller Panel</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your store</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}




