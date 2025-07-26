"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: "active" | "inactive" | "out_of_stock"
  image: string
  createdAt: string
}

export function AdminProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([
        {
          id: "1",
          name: "Wireless Bluetooth Headphones",
          category: "Electronics",
          price: 79.99,
          stock: 45,
          status: "active",
          image: "/placeholder.svg?height=50&width=50&text=Headphones",
          createdAt: "2024-01-15",
        },
        {
          id: "2",
          name: "Premium Cotton T-Shirt",
          category: "Clothing",
          price: 29.99,
          stock: 120,
          status: "active",
          image: "/placeholder.svg?height=50&width=50&text=T-Shirt",
          createdAt: "2024-01-14",
        },
        {
          id: "3",
          name: "Smart Fitness Watch",
          category: "Electronics",
          price: 199.99,
          stock: 0,
          status: "out_of_stock",
          image: "/placeholder.svg?height=50&width=50&text=Watch",
          createdAt: "2024-01-13",
        },
        {
          id: "4",
          name: "Organic Coffee Beans",
          category: "Food",
          price: 24.99,
          stock: 78,
          status: "active",
          image: "/placeholder.svg?height=50&width=50&text=Coffee",
          createdAt: "2024-01-12",
        },
        {
          id: "5",
          name: "Vintage Leather Jacket",
          category: "Clothing",
          price: 149.99,
          stock: 12,
          status: "inactive",
          image: "/placeholder.svg?height=50&width=50&text=Jacket",
          createdAt: "2024-01-11",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-10 w-64 bg-muted animate-pulse rounded" />
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>Add Product</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">ID: {product.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <span className={product.stock === 0 ? "text-red-600" : ""}>{product.stock}</span>
                </TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
