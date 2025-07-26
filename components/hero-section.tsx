import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container px-4 py-24 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>Trusted by 50,000+ customers</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Discover Amazing
                <span className="text-primary block">Products</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-md">
                Shop the latest trends with secure payments, fast delivery, and unbeatable prices.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/deals">View Deals</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
              <img
                src="/placeholder.svg?height=500&width=500&text=Shopping+Experience"
                alt="Shopping Experience"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background border rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-semibold">✓</span>
                </div>
                <div>
                  <div className="font-semibold">Free Shipping</div>
                  <div className="text-sm text-muted-foreground">On orders over $50</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
