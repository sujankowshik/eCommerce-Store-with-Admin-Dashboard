import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryGrid } from "@/components/category-grid"
import { Newsletter } from "@/components/newsletter"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Suspense fallback={<div className="h-96 animate-pulse bg-muted" />}>
        <FeaturedProducts />
      </Suspense>
      <CategoryGrid />
      <Newsletter />
    </div>
  )
}
