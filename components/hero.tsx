"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 }) as any])

  const heroImages = [
    {
      src: "/hand-painted-canvas-art.jpg",
      alt: "Hand Painted Canvas Art",
    },
    {
      src: "/ceramic-vase-pottery.jpg",
      alt: "Handcrafted Ceramic Vase",
    },
    {
      src: "/wooden-decorative-box.jpg",
      alt: "Artisanal Wooden Box",
    },
  ]

  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl z-10 relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
              Discover Authentic <span className="bg-gradient-to-r from-amber-200 to-yellow-100 bg-clip-text text-transparent underline decoration-4 decoration-yellow-500/30 underline-offset-4">Handmade Arts</span>
            </h2>
            <p className="text-lg md:text-xl mb-8 text-balance text-primary-foreground/90 font-light">
              Shop directly from talented artisans. Every piece tells a story of craftsmanship and passion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#products"
                className="bg-amber-500 text-white px-8 py-3.5 rounded-full font-bold hover:scale-105 hover:bg-amber-600 hover:shadow-lg transition-all duration-300 shadow-md inline-block text-center"
              >
                Start Shop
              </Link>
              <Link
                href="#products"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 inline-block text-center"
              >
                View Collections
              </Link>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-10 duration-1000">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/30 rounded-full blur-3xl rounded-full"></div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3] group">
              <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                  {heroImages.map((image, index) => (
                    <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <p className="text-white font-medium text-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          {image.alt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
