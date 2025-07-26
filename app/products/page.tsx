"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Search, Filter } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { ImageWithFallback } from "@/components/image-with-fallback"
import Link from "next/link"

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
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
          inStock: false,
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
        {
          id: "5",
          name: "Yoga Mat Premium",
          price: 49.99,
          image: "/placeholder.svg?height=300&width=300&text=Yoga+Mat",
          rating: 4.7,
          reviews: 92,
          category: "Sports",
          inStock: true,
        },
        {
          id: "6",
          name: "Leather Wallet",
          price: 89.99,
          originalPrice: 120.0,
          image: "/placeholder.svg?height=300&width=300&text=Leather+Wallet",
          rating: 4.4,
          reviews: 67,
          category: "Accessories",
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

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
          <div className="h-4 w-96 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
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
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <p className="text-muted-foreground">Discover our complete collection of premium products</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative overflow-hidden rounded-t-lg">
              <ImageWithFallback
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="aspect-square object-cover w-full group-hover:scale-105 transition-transform duration-300"
                width={300}
                height={300}
              />
              {product.originalPrice && (
                <Badge className="absolute top-2 left-2 bg-red-500">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
              <Badge variant="secondary" className="absolute top-2 right-2">
                {product.category}
              </Badge>
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive">Out of Stock</Badge>
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2 mb-2">{product.name}</h3>
              </Link>

              <div className="flex items-center gap-1 mb-2">
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

              <div className="flex items-center gap-2">
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
