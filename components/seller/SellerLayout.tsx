"use client"

import { ReactNode } from "react"
import SellerSidebar from "./SellerSidebar"
import SellerNavbar from "./SellerNavbar"

export default function SellerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SellerSidebar />
      <div className="flex-1 flex flex-col">
        <SellerNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}












