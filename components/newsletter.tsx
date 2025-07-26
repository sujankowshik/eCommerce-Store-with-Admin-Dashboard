"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Subscribed successfully!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-primary-foreground/80 mb-8">
            Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special
            offers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background text-foreground"
            />
            <Button type="submit" variant="secondary" disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="text-xs text-primary-foreground/60 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
