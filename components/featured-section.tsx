import { Sparkles, ShieldCheck, Zap, Globe } from "lucide-react"

export default function FeaturedSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Why Choose ranaartcart?</h2>
          <p className="text-muted-foreground">Support authentic artisans and get unique, handcrafted products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Sparkles,
              title: "Authentic Art",
              description: "Every piece is handmade with passion by talented artisans",
            },
            {
              icon: ShieldCheck,
              title: "Quality Assured",
              description: "All products verified and quality checked before delivery",
            },
            {
              icon: Zap,
              title: "Fast Shipping",
              description: "Express delivery available with real-time tracking",
            },
            {
              icon: Globe,
              title: "Support Artisans",
              description: "Direct support to craftspeople, fair pricing guaranteed",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="bg-card rounded-lg border border-border p-6 text-center hover:shadow-md transition-shadow"
              >
                <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
