"use client"

import { useState } from "react"
import Hero from "@/components/hero"
import CategoryBrowser from "@/components/category-browser"
import ProductGrid from "@/components/product-grid"
import FeaturedSection from "@/components/featured-section"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="flex-1">
      <Hero />
      <section id="categories">
        <CategoryBrowser onCategorySelect={setSelectedCategory} />
      </section>
      <section id="products">
        <ProductGrid selectedCategory={selectedCategory} />
      </section>
      <FeaturedSection />
    </div>
  )
}
