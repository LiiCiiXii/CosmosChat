"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Rocket, User, Mail, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (formData.password === formData.confirmPassword) {
        localStorage.setItem(
          "cosmosUser",
          JSON.stringify({
            username: formData.username,
            email: formData.email,
            id: Date.now().toString(),
          }),
        )
        router.push("/dashboard")
      } else {
        alert("Passwords do not match!")
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Planets */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse" />
      <div
        className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-30 animate-bounce"
        style={{ animationDuration: "8s" }}
      />

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center text-purple-300 hover:text-purple-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Universe
        </Link>

        <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30 backdrop-blur-lg shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Rocket className="w-12 h-12 text-cyan-400 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Join the Cosmos
            </CardTitle>
            <CardDescription className="text-gray-300">Create your cosmic profile and start exploring</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-200 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Cosmic Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your cosmic name"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Galactic Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@galaxy.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200 flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Secret Code
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your secret code"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-200 flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Confirm Secret Code
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your secret code"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 focus:border-cyan-400"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Launching...
                  </div>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 mr-2" />
                    Launch into Space
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Already have a cosmic account?{" "}
                <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
