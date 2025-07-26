"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Users, Package, DollarSign, TrendingUp, TrendingDown, Plus } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { redirect } from "next/navigation"
import { AdminProductsTable } from "@/components/admin/products-table"
import { AdminOrdersTable } from "@/components/admin/orders-table"
import { AdminCustomersTable } from "@/components/admin/customers-table"
import { AdminAnalytics } from "@/components/admin/analytics"

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  revenueChange: number
  ordersChange: number
  customersChange: number
  productsChange: number
}

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      redirect("/login")
    }
  }, [user, loading])

  useEffect(() => {
    // Simulate API call for dashboard stats
    setTimeout(() => {
      setStats({
        totalRevenue: 45231.89,
        totalOrders: 1234,
        totalCustomers: 5678,
        totalProducts: 234,
        revenueChange: 12.5,
        ordersChange: 8.2,
        customersChange: 15.3,
        productsChange: -2.1,
      })
    }, 1000)
  }, [])

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your store, track sales, and monitor performance</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.totalRevenue.toLocaleString() || "0"}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats?.revenueChange && stats.revenueChange > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              {stats?.revenueChange ? `${Math.abs(stats.revenueChange)}%` : "0%"} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalOrders.toLocaleString() || "0"}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats?.ordersChange && stats.ordersChange > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              {stats?.ordersChange ? `${Math.abs(stats.ordersChange)}%` : "0%"} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalCustomers.toLocaleString() || "0"}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats?.customersChange && stats.customersChange > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              {stats?.customersChange ? `${Math.abs(stats.customersChange)}%` : "0%"} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalProducts.toLocaleString() || "0"}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {stats?.productsChange && stats.productsChange > 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              {stats?.productsChange ? `${Math.abs(stats.productsChange)}%` : "0%"} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminOrdersTable limit={5} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best selling products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Wireless Headphones", sales: 234, revenue: 18672 },
                    { name: "Smart Watch", sales: 189, revenue: 37791 },
                    { name: "Cotton T-Shirt", sales: 156, revenue: 4674 },
                    { name: "Coffee Beans", sales: 134, revenue: 3346 },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${product.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Products Management</CardTitle>
              <CardDescription>Manage your product inventory and pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminProductsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders Management</CardTitle>
              <CardDescription>Track and manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminOrdersTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>View and manage customer accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminCustomersTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <AdminAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
