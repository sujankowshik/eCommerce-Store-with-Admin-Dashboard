"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { ImageWithFallback } from "@/components/image-with-fallback"

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart()
  const { toast } = useToast()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      })
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id)
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    })
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-16 text-center">
        <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Button size="lg" asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <ImageWithFallback
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-20 w-20 rounded-md object-cover"
                    width={80}
                    height={80}
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-2xl font-bold text-primary">${item.price}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$9.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(total + 9.99 + total * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
