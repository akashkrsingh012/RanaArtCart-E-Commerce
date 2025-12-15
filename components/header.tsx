"use client"

import { useState, useRef, useEffect } from "react"
import { ShoppingCart, Search, Menu, X, MapPin, Phone, User, LogOut, Heart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useUser } from "@/contexts/user-context"
import Link from "next/link"

interface HeaderProps {
  cartOpen: boolean
  onCartToggle: (open: boolean) => void
}

export default function Header({ cartOpen, onCartToggle }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { items } = useCart()
  const { user, logout } = useUser()
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    function handleScroll() {
      if (userMenuOpen) setUserMenuOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [userMenuOpen])

  return (
    <>
      {/* Top info bar - Premium dark accent */}
      <div className="bg-[#2A2A2A] text-white text-xs tracking-wide py-2 px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity cursor-default">
              <MapPin size={13} className="text-orange-400" />
              <span>Free shipping on orders above ₹999</span>
            </div>
          </div>
          <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
            <Phone size={13} className="text-orange-400" />
            <span>Support: +91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* Main header - Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/60 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-6">

            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 bg-orange-50 flex items-center justify-center border border-orange-100/50">
                {/* Using icon.svg as side logo */}
                <img src="/icon.svg" alt="RanaArtCart Logo" className="w-7 h-7 object-contain transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent group-hover:from-orange-600 group-hover:to-orange-500 transition-all duration-300">
                  RanaArtCart
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium group-hover:text-orange-400 transition-colors">
                  Handmade with Love
                </p>
              </div>
            </Link>

            {/* Search bar - Modern & Centered */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search for masterpieces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-5 pr-12 py-2.5 bg-neutral-50 border border-neutral-200 text-neutral-700 placeholder-neutral-400 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 shadow-sm hover:shadow-md transition-all duration-300">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">

              {/* Login/User Button */}
              <div className="hidden md:block">
                {user ? (
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="p-2 hover:bg-orange-50 rounded-full transition-all duration-300 flex items-center gap-2 group border border-transparent hover:border-orange-100"
                      aria-label="User account"
                    >
                      <User size={22} className="text-neutral-600 group-hover:text-orange-600" />
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden z-50 transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-5 py-4 bg-neutral-50 border-b border-neutral-100">
                          <p className="font-bold text-neutral-800 truncate">{user.name}</p>
                          <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <Link href="/dashboard" className="block px-5 py-2.5 text-sm font-medium text-neutral-600 hover:text-orange-600 hover:bg-orange-50 transition-colors" onClick={() => setUserMenuOpen(false)}>My Dashboard</Link>
                          <Link href="/orders" className="block px-5 py-2.5 text-sm font-medium text-neutral-600 hover:text-orange-600 hover:bg-orange-50 transition-colors" onClick={() => setUserMenuOpen(false)}>My Orders</Link>
                          <Link href="/wishlist" className="block px-5 py-2.5 text-sm font-medium text-neutral-600 hover:text-orange-600 hover:bg-orange-50 transition-colors" onClick={() => setUserMenuOpen(false)}>Wishlist</Link>
                        </div>
                        <div className="border-t border-neutral-100 py-2">
                          <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full text-left px-5 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2">
                            <LogOut size={15} /> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="group relative px-6 py-2.5 bg-neutral-900 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl hover:bg-neutral-800 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-orange-100 transition-colors">Sign In</span>
                  </Link>
                )}
              </div>

              {/* Wishlist Icon */}
              <Link
                href="/wishlist"
                className="hidden md:flex p-2.5 hover:bg-orange-50 rounded-full transition-all duration-300 group border border-transparent hover:border-orange-100"
                aria-label="Wishlist"
              >
                <Heart size={22} className="text-neutral-600 group-hover:text-orange-600 transition-colors" />
              </Link>

              {/* Cart Icon */}
              <button
                onClick={() => onCartToggle(!cartOpen)}
                className="relative p-2.5 hover:bg-orange-50 rounded-full transition-all duration-300 group border border-transparent hover:border-orange-100"
                aria-label="Shopping cart"
              >
                <ShoppingCart size={22} className="text-neutral-600 group-hover:text-orange-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white transform scale-100 group-hover:scale-110 transition-transform">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search - Slide down effect */}
          <div className="md:hidden mt-4 pb-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-100/50 text-neutral-800 placeholder-neutral-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all shadow-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-neutral-100 shadow-xl md:hidden animate-in slide-in-from-top-2 duration-200">
              <nav className="flex flex-col p-4 space-y-1">
                <Link href="/seller/login" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-orange-700 rounded-xl font-medium transition-colors">
                  Become a Seller
                </Link>
                <Link href="/orders" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-orange-700 rounded-xl font-medium transition-colors">
                  My Orders
                </Link>
                <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-orange-700 rounded-xl font-medium transition-colors">
                  Wishlist
                </Link>
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-orange-50 hover:text-orange-700 rounded-xl font-medium transition-colors">
                  My Account
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
