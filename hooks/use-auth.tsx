"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data - in real app, this would come from your backend
    const userData: User = {
      id: "1",
      email,
      name: email.split("@")[0],
      role: email === "admin@shophub.com" ? "admin" : "user",
    }

    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const loginWithGoogle = async () => {
    // Simulate Google OAuth
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData: User = {
      id: "google_" + Date.now(),
      email: "user@gmail.com",
      name: "Google User",
      role: "user",
    }

    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData: User = {
      id: Date.now().toString(),
      email,
      name,
      role: "user",
    }

    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
