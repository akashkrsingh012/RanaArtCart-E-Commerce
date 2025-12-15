export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Discover Authentic Handmade Arts</h2>
          <p className="text-lg md:text-xl mb-8 text-balance">
            Shop directly from talented artisans. Every piece tells a story of craftsmanship and passion.
          </p>
          <button className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Start Shopping
          </button>
        </div>
      </div>
    </section>
  )
}
