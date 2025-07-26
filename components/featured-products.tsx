"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  inStock: boolean
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([
        {
          id: "1",
          name: "Wireless Bluetooth Headphones",
          price: 79.99,
          originalPrice: 99.99,
          image: "/placeholder.svg?height=300&width=300&text=Wireless+Headphones",
          rating: 4.5,
          reviews: 128,
          category: "Electronics",
          inStock: true,
        },
        {
          id: "2",
          name: "Premium Cotton T-Shirt",
          price: 29.99,
          image: "/placeholder.svg?height=300&width=300&text=Cotton+T-Shirt",
          rating: 4.8,
          reviews: 89,
          category: "Clothing",
          inStock: true,
        },
        {
          id: "3",
          name: "Smart Fitness Watch",
          price: 199.99,
          originalPrice: 249.99,
          image: "/placeholder.svg?height=300&width=300&text=Fitness+Watch",
          rating: 4.6,
          reviews: 203,
          category: "Electronics",
          inStock: true,
        },
        {
          id: "4",
          name: "Organic Coffee Beans",
          price: 24.99,
          image: "/placeholder.svg?height=300&width=300&text=Coffee+Beans",
          rating: 4.9,
          reviews: 156,
          category: "Food",
          inStock: true,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-square bg-muted rounded-t-lg" />
                <CardContent className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products with unbeatable quality and prices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="aspect-square object-cover w-full group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
                <Badge variant="secondary" className="absolute top-2 right-2">
                  {product.category}
                </Badge>
              </div>

              <CardContent className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                </Link>

                <div className="flex items-center gap-1 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => handleAddToCart(product)} disabled={!product.inStock}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
