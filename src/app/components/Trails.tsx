"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Heart, Cloud, Zap, BookOpen, Target, CheckCircle2, Lock } from "lucide-react"
import type { Screen } from "../page"

interface TrailsProps {
  navigateTo: (screen: Screen) => void
  onComplete: () => void
}

interface Trail {
  id: string
  title: string
  category: string
  days: number
  description: string
  icon: any
  color: string
  isPremium: boolean
  practices: string[]
}

export function Trails({ navigateTo, onComplete }: TrailsProps) {
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null)
  const [completedDays, setCompletedDays] = useState<number[]>([])

  const trails: Trail[] = [
    {
      id: "anxiety-7",
      title: "7 dias menos ansioso",
      category: "Ansiedade",
      days: 7,
      description: "Técnicas diárias para reduzir a ansiedade e recuperar o controle",
      icon: Heart,
      color: "from-purple-500 to-pink-500",
      isPremium: false,
      practices: [
        "Dia 1: Respiração 4-7-8 (5 min)",
        "Dia 2: Meditação guiada (10 min)",
        "Dia 3: Grounding 5-4-3-2-1",
        "Dia 4: Alongamento consciente",
        "Dia 5: Journaling de gratidão",
        "Dia 6: Caminhada mindful",
        "Dia 7: Revisão e celebração",
      ],
    },
    {
      id: "sleep-10",
      title: "10 dias de sono melhor",
      category: "Sono",
      days: 10,
      description: "Rotina noturna para melhorar a qualidade do seu sono",
      icon: Cloud,
      color: "from-blue-500 to-indigo-500",
      isPremium: false,
      practices: [
        "Dia 1: Higiene do sono",
        "Dia 2: Relaxamento muscular",
        "Dia 3: Meditação para dormir",
        "Dia 4: Rotina noturna",
        "Dia 5: Respiração para sono",
        "Dia 6: Visualização guiada",
        "Dia 7: Sons da natureza",
        "Dia 8: Body scan",
        "Dia 9: Yoga restaurativo",
        "Dia 10: Consolidação",
      ],
    },
    {
      id: "focus-5",
      title: "Foco e produtividade",
      category: "Foco",
      days: 5,
      description: "Técnicas para melhorar concentração e produtividade",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      isPremium: true,
      practices: [
        "Dia 1: Técnica Pomodoro",
        "Dia 2: Meditação de foco",
        "Dia 3: Organização mental",
        "Dia 4: Energia e movimento",
        "Dia 5: Flow state",
      ],
    },
    {
      id: "exam-anxiety",
      title: "Ansiedade em provas",
      category: "Ansiedade",
      days: 5,
      description: "Estratégias para lidar com ansiedade de desempenho",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
      isPremium: true,
      practices: [
        "Dia 1: Respiração pré-prova",
        "Dia 2: Visualização de sucesso",
        "Dia 3: Técnicas de relaxamento",
        "Dia 4: Mindset positivo",
        "Dia 5: Simulação e confiança",
      ],
    },
  ]

  const categories = ["Todos", "Ansiedade", "Sono", "Foco"]
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredTrails = trails.filter(
    (trail) => selectedCategory === "Todos" || trail.category === selectedCategory
  )

  const handleDayComplete = (dayIndex: number) => {
    if (!completedDays.includes(dayIndex)) {
      setCompletedDays([...completedDays, dayIndex])
      onComplete()
    }
  }

  if (selectedTrail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 pb-20">
        <button
          onClick={() => setSelectedTrail(null)}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        <Card className="max-w-2xl mx-auto p-6 bg-white/90 backdrop-blur-sm">
          <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${selectedTrail.color} rounded-full flex items-center justify-center`}>
            <selectedTrail.icon className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
            {selectedTrail.title}
          </h1>
          <p className="text-center text-gray-600 mb-6">{selectedTrail.description}</p>

          <div className="space-y-3">
            {selectedTrail.practices.map((practice, idx) => {
              const isCompleted = completedDays.includes(idx)
              const isLocked = selectedTrail.isPremium && idx > 2

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isCompleted
                      ? "bg-green-50 border-green-500"
                      : isLocked
                      ? "bg-gray-50 border-gray-200 opacity-60"
                      : "bg-white border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6 text-gray-400" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                      )}
                      <span className={`font-medium ${isCompleted ? "text-green-700" : "text-gray-800"}`}>
                        {practice}
                      </span>
                    </div>
                    {!isCompleted && !isLocked && (
                      <Button
                        onClick={() => handleDayComplete(idx)}
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      >
                        Iniciar
                      </Button>
                    )}
                    {isLocked && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {selectedTrail.isPremium && (
            <Card className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-yellow-600" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Desbloqueie a trilha completa</p>
                  <p className="text-sm text-gray-600">Assine o Premium para acesso total</p>
                </div>
                <Button
                  onClick={() => navigateTo("profile")}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                >
                  Ver Premium
                </Button>
              </div>
            </Card>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              💡 <strong>Dica:</strong> Pratique no mesmo horário todos os dias para criar um hábito consistente.
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 pb-20">
      <button
        onClick={() => navigateTo("home")}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Target className="w-8 h-8 text-purple-600" />
            Trilhas Guiadas
          </h1>
          <p className="text-gray-600">Programas estruturados para seu bem-estar</p>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Trails Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTrails.map((trail) => (
            <Card
              key={trail.id}
              onClick={() => setSelectedTrail(trail)}
              className="p-6 cursor-pointer hover:scale-[1.02] transition-all bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${trail.color} rounded-xl flex items-center justify-center`}>
                  <trail.icon className="w-6 h-6 text-white" />
                </div>
                {trail.isPremium && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                    PREMIUM
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{trail.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{trail.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{trail.days} dias</span>
                <span className="text-purple-600 font-medium">Começar →</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
