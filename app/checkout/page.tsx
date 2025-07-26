"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Truck, Shield, ArrowLeft } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("stripe")
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })
  const [sameAsShipping, setSameAsShipping] = useState(true)

  const shippingCost = 9.99
  const tax = total * 0.08
  const finalTotal = total + shippingCost + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Process payment based on selected method
      if (paymentMethod === "stripe") {
        // Integrate with Stripe
        console.log("Processing Stripe payment...")
      } else if (paymentMethod === "paypal") {
        // Integrate with PayPal
        console.log("Processing PayPal payment...")
      }

      // Clear cart and redirect to success page
      clearCart()
      toast({
        title: "Order placed successfully!",
        description: "You will receive a confirmation email shortly.",
      })
      router.push("/order-success")
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some items to your cart to proceed with checkout.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase securely</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="stripe" id="stripe" />
                  <Label htmlFor="stripe" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span>Credit/Debit Card (Stripe)</span>
                      <div className="flex gap-2">
                        <img src="/placeholder.svg?height=24&width=38" alt="Visa" className="h-6" />
                        <img src="/placeholder.svg?height=24&width=38" alt="Mastercard" className="h-6" />
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span>PayPal</span>
                      <img src="/placeholder.svg?height=24&width=60" alt="PayPal" className="h-6" />
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image || "/placeholder.svg?height=64&width=64&text=Product"}
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=64&width=64&text=Product"
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Shield className="h-4 w-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>

              <Button className="w-full" size="lg" onClick={handleSubmit} disabled={loading}>
                {loading ? "Processing..." : `Complete Order - $${finalTotal.toFixed(2)}`}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
