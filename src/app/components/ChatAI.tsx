"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Bot, User as UserIcon, Sparkles, Shield } from "lucide-react"
import type { Screen, UserProfile } from "../page"
import { analytics } from "@/lib/analytics"
import { disclaimers } from "@/lib/emergency"

interface ChatAIProps {
  navigateTo: (screen: Screen) => void
  userProfile: UserProfile | null
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ChatAI({ navigateTo, userProfile }: ChatAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Olá${userProfile ? `, ${userProfile.name}` : ""}! 👋 Sou uma IA de apoio emocional. Como foi seu dia? O que está te preocupando?`,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    analytics.trackChatMessage()

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
          userProfile,
        }),
      })

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Desculpe, tive um problema ao processar sua mensagem. Tente novamente.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const quickResponses = [
    "Estou me sentindo ansioso",
    "Não consigo dormir",
    "Preciso de ajuda para relaxar",
    "Como lidar com estresse?",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo("home")}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Assistente CalmaFit</h1>
              <p className="text-xs text-cyan-100">Sempre aqui para te ouvir</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "user"
                  ? "bg-gradient-to-br from-purple-500 to-pink-500"
                  : "bg-gradient-to-br from-cyan-500 to-blue-600"
              }`}
            >
              {message.role === "user" ? (
                <UserIcon className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
            <Card
              className={`p-4 max-w-[80%] ${
                message.role === "user"
                  ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                  : "bg-white"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </Card>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <Card className="p-4 bg-white">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Responses */}
      {messages.length <= 2 && (
        <div className="p-4 space-y-2">
          <p className="text-xs text-gray-600 font-medium">Sugestões rápidas:</p>
          <div className="flex flex-wrap gap-2">
            {quickResponses.map((response, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(response)
                }}
                className="px-4 py-2 bg-white border-2 border-purple-200 rounded-full text-sm text-gray-700 hover:border-purple-400 hover:bg-purple-50 transition-all"
              >
                {response}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <p className="text-xs text-gray-600">{disclaimers.ai}</p>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Digite sua mensagem..."
            className="flex-1"
            disabled={isLoading}
            maxLength={500}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-center text-gray-500 mt-3">
          💙 Para emergências, ligue CVV: 188
        </p>
      </div>
    </div>
  )
}
