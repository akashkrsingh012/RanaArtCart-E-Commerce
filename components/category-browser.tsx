"use client"

interface CategoryBrowserProps {
  onCategorySelect: (category: string | null) => void
}

const categories = [
  { id: "paintings", label: "Paintings", emoji: "🎨" },
  { id: "sculptures", label: "Sculptures", emoji: "🗿" },
  { id: "pottery", label: "Pottery", emoji: "🏺" },
  { id: "textiles", label: "Textiles", emoji: "🧵" },
  { id: "jewelry", label: "Jewelry", emoji: "✨" },
  { id: "woodcraft", label: "Woodcraft", emoji: "🪵" },
]

export default function CategoryBrowser({ onCategorySelect }: CategoryBrowserProps) {
  return (
    <section className="py-8 bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">Browse By Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className="flex flex-col items-center gap-2 p-4 bg-background hover:bg-muted rounded-lg transition-colors text-center"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-sm font-medium text-foreground">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
