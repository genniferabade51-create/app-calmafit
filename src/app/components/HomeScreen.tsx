"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, MessageCircle, Home, Target, Dumbbell, User, Flame, Heart, Sparkles, Sun, Cloud, CloudRain, Zap, Bell, BellOff } from "lucide-react"
import type { UserProfile, Screen } from "../page"
import { storage } from "@/lib/storage"
import { analytics } from "@/lib/analytics"
import { notifications } from "@/lib/notifications"

interface HomeScreenProps {
  userProfile: UserProfile
  navigateTo: (screen: Screen) => void
  streak: number
}

export function HomeScreen({ userProfile, navigateTo, streak }: HomeScreenProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    typeof window !== "undefined" && Notification.permission === "granted"
  )

  const moods = [
    { value: "great", emoji: "😊", label: "Ótimo", color: "from-green-400 to-emerald-500" },
    { value: "good", emoji: "🙂", label: "Bem", color: "from-blue-400 to-cyan-500" },
    { value: "ok", emoji: "😐", label: "Ok", color: "from-yellow-400 to-orange-400" },
    { value: "bad", emoji: "😟", label: "Mal", color: "from-orange-400 to-red-400" },
    { value: "terrible", emoji: "😰", label: "Péssimo", color: "from-red-500 to-pink-600" },
  ]

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    storage.addMoodEntry(mood)
    analytics.trackMood(mood)
  }

  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false)
    } else {
      const granted = await notifications.requestPermission()
      setNotificationsEnabled(granted)
      if (granted) {
        notifications.send("CalmaFit 💜", {
          body: "Notificações ativadas! Vamos te lembrar de cuidar de você.",
        })
      }
    }
  }

  const getSuggestions = () => {
    if (!selectedMood) return []
    if (selectedMood === "terrible" || selectedMood === "bad") {
      return [
        { title: "Respiração de 2 minutos", icon: Heart, action: () => navigateTo("sos") },
        { title: "Falar com a IA", icon: MessageCircle, action: () => navigateTo("chat") },
      ]
    }
    return [
      { title: "Trilha: 7 dias menos ansioso", icon: Target, action: () => navigateTo("trails") },
      { title: "Missão: Caminhe 5 minutos", icon: Dumbbell, action: () => navigateTo("missions") },
    ]
  }

  const trails = [
    { title: "7 dias menos ansioso", days: 7, icon: Heart, color: "from-purple-500 to-pink-500" },
    { title: "10 dias de sono melhor", days: 10, icon: Cloud, color: "from-blue-500 to-indigo-500" },
    { title: "Foco e produtividade", days: 5, icon: Zap, color: "from-yellow-500 to-orange-500" },
  ]

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Oi, {userProfile.name}! 👋</h1>
            <p className="text-purple-100">Como você está hoje?</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleNotifications}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              title={notificationsEnabled ? "Desativar notificações" : "Ativar notificações"}
            >
              {notificationsEnabled ? (
                <Bell className="w-5 h-5" />
              ) : (
                <BellOff className="w-5 h-5" />
              )}
            </button>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="font-bold">{streak} dias</span>
            </div>
          </div>
        </div>

        {/* SOS Button */}
        <Button
          onClick={() => {
            navigateTo("sos")
            analytics.trackSOS()
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-bold rounded-2xl shadow-xl hover:scale-[1.02] transition-all"
        >
          <AlertCircle className="w-6 h-6 mr-2" />
          Estou em crise - Preciso de ajuda agora
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Mood Check-in */}
        <Card className="p-6 bg-white shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Meu Dia
          </h2>
          <p className="text-gray-600 mb-4">Como está seu humor agora?</p>
          <div className="grid grid-cols-5 gap-2">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all hover:scale-110 ${
                  selectedMood === mood.value
                    ? `bg-gradient-to-br ${mood.color} text-white shadow-lg`
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <span className="text-3xl mb-1">{mood.emoji}</span>
                <span className="text-xs font-medium">{mood.label}</span>
              </button>
            ))}
          </div>

          {/* Suggestions */}
          {selectedMood && (
            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-gray-700">Sugestões para você:</h3>
              {getSuggestions().map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={suggestion.action}
                  className="w-full p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-all hover:scale-[1.02] flex items-center gap-3"
                >
                  <suggestion.icon className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-800">{suggestion.title}</span>
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Trails Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            Trilhas em Destaque
          </h2>
          <div className="space-y-3">
            {trails.map((trail, idx) => (
              <Card
                key={idx}
                onClick={() => navigateTo("trails")}
                className={`p-5 bg-gradient-to-r ${trail.color} text-white cursor-pointer hover:scale-[1.02] transition-all shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <trail.icon className="w-8 h-8" />
                    <div>
                      <h3 className="font-bold text-lg">{trail.title}</h3>
                      <p className="text-sm opacity-90">{trail.days} dias de prática</p>
                    </div>
                  </div>
                  <div className="text-2xl">→</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Chat AI Button */}
        <Card
          onClick={() => navigateTo("chat")}
          className="p-6 bg-gradient-to-br from-cyan-500 to-blue-600 text-white cursor-pointer hover:scale-[1.02] transition-all shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Falar com a IA</h3>
              <p className="text-sm text-cyan-100">Estou aqui para te ouvir</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center p-4">
          <button onClick={() => navigateTo("home")} className="flex flex-col items-center gap-1 text-purple-600">
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Início</span>
          </button>
          <button onClick={() => navigateTo("trails")} className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-600">
            <Target className="w-6 h-6" />
            <span className="text-xs font-medium">Trilhas</span>
          </button>
          <button onClick={() => navigateTo("missions")} className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-600">
            <Dumbbell className="w-6 h-6" />
            <span className="text-xs font-medium">Missões</span>
          </button>
          <button onClick={() => navigateTo("profile")} className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-600">
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  )
}
