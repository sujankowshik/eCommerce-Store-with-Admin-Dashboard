import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Electronics",
    image: "/placeholder.svg?height=200&width=300&text=Electronics",
    href: "/categories/electronics",
    count: 1234,
  },
  {
    name: "Clothing",
    image: "/placeholder.svg?height=200&width=300&text=Clothing",
    href: "/categories/clothing",
    count: 2567,
  },
  {
    name: "Home & Garden",
    image: "/placeholder.svg?height=200&width=300&text=Home+Garden",
    href: "/categories/home-garden",
    count: 890,
  },
  {
    name: "Sports",
    image: "/placeholder.svg?height=200&width=300&text=Sports",
    href: "/categories/sports",
    count: 456,
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="aspect-[4/3] object-cover w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count.toLocaleString()} products</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
