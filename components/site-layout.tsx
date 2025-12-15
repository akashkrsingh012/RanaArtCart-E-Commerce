"use client"

import { usePathname } from "next/navigation"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Cart from "@/components/cart"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [cartOpen, setCartOpen] = useState(false)

    // Pages where Header and Footer should NOT appear
    const hideLayoutPrefixes = [
        "/login",
        "/signup",
        "/seller/login",
        "/seller/dashboard",
        "/admin",
        "/seller/products/new", // Assuming seller pages shouldn't have the main shop header
    ]

    const shouldHideLayout = hideLayoutPrefixes.some((prefix) => pathname.startsWith(prefix))

    return (
        <>
            {!shouldHideLayout && (
                <>
                    <Header cartOpen={cartOpen} onCartToggle={setCartOpen} />
                    {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
                </>
            )}
            <main className={!shouldHideLayout ? "min-h-screen flex flex-col" : ""}>
                {children}
            </main>
            {!shouldHideLayout && <Footer />}
        </>
    )
}
