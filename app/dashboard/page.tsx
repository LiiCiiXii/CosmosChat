"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, Settings, LogOut, Plus, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface User {
  username: string
  email: string
  id: string
}

interface Friend {
  id: string
  username: string
  status: "online" | "offline"
  lastMessage?: string
  unreadCount?: number
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [friends] = useState<Friend[]>([
    {
      id: "1",
      username: "StarGazer42",
      status: "online",
      lastMessage: "Hey! Want to explore the nebula?",
      unreadCount: 2,
    },
    {
      id: "2",
      username: "CosmicWanderer",
      status: "online",
      lastMessage: "Check out this amazing galaxy photo!",
      unreadCount: 1,
    },
    { id: "3", username: "NebulaHunter", status: "offline", lastMessage: "See you in the asteroid belt!" },
    { id: "4", username: "PlanetHopper", status: "online", lastMessage: "Found a new planet to explore!" },
    { id: "5", username: "SpaceExplorer", status: "offline", lastMessage: "Thanks for the cosmic chat!" },
  ])
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("cosmosUser")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("cosmosUser")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
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
      <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse" />
      <div
        className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-30 animate-bounce"
        style={{ animationDuration: "6s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-25 animate-spin"
        style={{ animationDuration: "15s" }}
      />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-12 h-12 border-2 border-cyan-400">
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-black rounded-full" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome back, {user.username}!</h1>
              <p className="text-gray-300">Ready to explore the cosmos?</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-red-500/30 text-red-300 hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Active Chats</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <MessageCircle className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Cosmic Friends</p>
                  <p className="text-2xl font-bold text-white">{friends.length}</p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-pink-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Cosmic Points</p>
                  <p className="text-2xl font-bold text-white">1,247</p>
                </div>
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Friends List */}
        <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-cyan-400" />
                Cosmic Friends
              </CardTitle>
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Friend
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {friends.map((friend) => (
                <Link key={friend.id} href={`/chat/${friend.id}`}>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10 border border-purple-500/30">
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
                            {friend.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-black rounded-full ${
                            friend.status === "online" ? "bg-green-400" : "bg-gray-500"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {friend.username}
                        </p>
                        {friend.lastMessage && (
                          <p className="text-sm text-gray-400 truncate max-w-xs">{friend.lastMessage}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={friend.status === "online" ? "default" : "secondary"}
                        className={
                          friend.status === "online"
                            ? "bg-green-500/20 text-green-300 border-green-500/30"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                        }
                      >
                        {friend.status}
                      </Badge>
                      {friend.unreadCount && <Badge className="bg-cyan-500 text-white">{friend.unreadCount}</Badge>}
                      <MessageCircle className="w-4 h-4 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
