import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { UserProvider } from "@/contexts/user-context"
import { SellerProvider } from "@/contexts/seller-context"
import { AdminProvider } from "@/contexts/admin-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  themeColor: "#8B6F47",
}

export const metadata: Metadata = {
  title: "ranaartcart - Handmade Arts Marketplace",
  description: "Discover authentic handmade arts, crafts, and artisanal products from talented artisans",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

import SiteLayout from "@/components/site-layout"

// ... imports remain same

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <AdminProvider>
          <UserProvider>
            <SellerProvider>
              <SiteLayout>{children}</SiteLayout>
            </SellerProvider>
          </UserProvider>
        </AdminProvider>
        <Analytics />
      </body>
    </html>
  )
}
