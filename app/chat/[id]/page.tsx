"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, ImageIcon, ArrowLeft, Smile, Paperclip, Phone, Video } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Message {
  id: string
  text?: string
  image?: string
  sender: "user" | "friend"
  timestamp: Date
  type: "text" | "image"
}

interface Friend {
  id: string
  username: string
  status: "online" | "offline"
}

export default function ChatPage() {
  const params = useParams()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey! Welcome to the cosmic chat! 🚀",
      sender: "friend",
      timestamp: new Date(Date.now() - 300000),
      type: "text",
    },
    {
      id: "2",
      text: "Thanks! This space theme is amazing!",
      sender: "user",
      timestamp: new Date(Date.now() - 240000),
      type: "text",
    },
    {
      id: "3",
      image: "/placeholder.svg?height=200&width=300",
      sender: "friend",
      timestamp: new Date(Date.now() - 180000),
      type: "image",
    },
    {
      id: "4",
      text: "Check out this nebula I found! Isn't it beautiful?",
      sender: "friend",
      timestamp: new Date(Date.now() - 120000),
      type: "text",
    },
    {
      id: "5",
      text: "Wow! That's incredible! The colors are so vibrant 🌌",
      sender: "user",
      timestamp: new Date(Date.now() - 60000),
      type: "text",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [friend] = useState<Friend>({
    id: params.id as string,
    username: "StarGazer42",
    status: "online",
  })
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
        type: "text",
      }
      setMessages([...messages, message])
      setNewMessage("")

      // Simulate friend typing and response
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const responses = [
          "That's awesome! 🌟",
          "I totally agree with you!",
          "Haha, you're so funny! 😄",
          "Tell me more about that!",
          "That sounds amazing! ✨",
          "I love exploring the cosmos with you! 🚀",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        const friendMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "friend",
          timestamp: new Date(),
          type: "text",
        }
        setMessages((prev) => [...prev, friendMessage])
      }, 2000)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageMessage: Message = {
          id: Date.now().toString(),
          image: e.target?.result as string,
          sender: "user",
          timestamp: new Date(),
          type: "image",
        }
        setMessages([...messages, imageMessage])
      }
      reader.readAsDataURL(file)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
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
      <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse" />
      <div
        className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-30 animate-bounce"
        style={{ animationDuration: "8s" }}
      />

      <div className="relative z-10 flex flex-col h-screen">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm border-b border-purple-500/30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/20"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>

              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-10 h-10 border border-purple-500/30">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
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
                  <h2 className="font-semibold text-white">{friend.username}</h2>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={friend.status === "online" ? "default" : "secondary"}
                      className={
                        friend.status === "online"
                          ? "bg-green-500/20 text-green-300 border-green-500/30 text-xs"
                          : "bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs"
                      }
                    >
                      {friend.status}
                    </Badge>
                    {isTyping && <span className="text-xs text-cyan-400 animate-pulse">typing...</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/20"
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/20"
              >
                <Video className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs lg:max-w-md ${message.sender === "user" ? "order-2" : "order-1"}`}>
                {message.type === "text" ? (
                  <Card
                    className={`p-3 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                        : "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/30 text-white backdrop-blur-sm"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </Card>
                ) : (
                  <Card
                    className={`p-2 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-purple-500"
                        : "bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/30 backdrop-blur-sm"
                    }`}
                  >
                    <img
                      src={message.image || "/placeholder.svg"}
                      alt="Shared image"
                      className="rounded-lg max-w-full h-auto"
                    />
                  </Card>
                )}
                <p className={`text-xs text-gray-400 mt-1 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm border-t border-purple-500/30 p-4">
          <div className="flex items-center space-x-2">
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/20"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="sm" className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/20">
              <Paperclip className="w-4 h-4" />
            </Button>

            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your cosmic message..."
                className="bg-black/20 border-purple-500/30 text-white placeholder-gray-400 focus:border-cyan-400 pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-200 hover:bg-purple-500/20"
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>

            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
