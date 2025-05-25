"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Rocket, Users, MessageCircle, ImageIcon, Star } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black overflow-hidden relative">
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Planets */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-bounce opacity-70"
          style={{ animationDuration: "6s" }}
        />
        <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse opacity-60" />
        <div
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-spin opacity-50"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="absolute bottom-20 right-1/3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce opacity-70"
          style={{ animationDuration: "4s" }}
        />
      </div>

      {/* Mouse Follower Effect */}
      <div
        className="absolute w-96 h-96 bg-gradient-radial from-purple-500/20 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Rocket className="w-16 h-16 text-cyan-400 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-pulse">
            CosmosChat
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connect across the universe with friends in real-time. Share messages, images, and explore the cosmos
            together.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full">
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300">
            <Users className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Connect with Friends</h3>
            <p className="text-gray-300">Create your cosmic profile and connect with friends across the galaxy.</p>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 border-blue-500/30 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300">
            <MessageCircle className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Messaging</h3>
            <p className="text-gray-300">Chat instantly with friends using our stellar messaging system.</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-pink-500/30 backdrop-blur-sm p-6 hover:scale-105 transition-transform duration-300">
            <ImageIcon className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Share Images</h3>
            <p className="text-gray-300">Send photos and images instantly to share your cosmic adventures.</p>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/auth/signup">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
              <Star className="w-5 h-5 mr-2" />
              Join the Universe
            </Button>
          </Link>

          <Link href="/auth/login">
            <Button
              variant="outline"
              className="border-2 border-purple-500 text-purple-300 hover:bg-purple-500/20 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Launch Mission
            </Button>
          </Link>
        </div>
      </div>

      {/* Orbital Ring Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-purple-500/20 rounded-full animate-spin"
          style={{ animationDuration: "30s" }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full" />
        </div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-pink-500/20 rounded-full animate-spin"
          style={{ animationDuration: "25s", animationDirection: "reverse" }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full" />
        </div>
      </div>
    </div>
  )
}
