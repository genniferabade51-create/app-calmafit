"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Dumbbell, Music, Footprints, Wind, Sparkles, Trophy, CheckCircle2 } from "lucide-react"
import type { Screen } from "../page"

interface MissionsProps {
  navigateTo: (screen: Screen) => void
  onComplete: () => void
}

interface Mission {
  id: string
  title: string
  description: string
  duration: string
  benefit: string
  icon: any
  color: string
  points: number
}

export function Missions({ navigateTo, onComplete }: MissionsProps) {
  const [completedMissions, setCompletedMissions] = useState<string[]>([])
  const [totalPoints, setTotalPoints] = useState(0)

  const missions: Mission[] = [
    {
      id: "walk-5",
      title: "Caminhe 5 minutos",
      description: "Coloque sua música favorita e caminhe por 5 minutos",
      duration: "5 min",
      benefit: "Libera endorfina e reduz cortisol (hormônio do estresse)",
      icon: Footprints,
      color: "from-green-400 to-emerald-500",
      points: 10,
    },
    {
      id: "stretch-3",
      title: "Alongue por 3 minutos",
      description: "Alongamentos suaves para relaxar o corpo",
      duration: "3 min",
      benefit: "Alivia tensão muscular causada pela ansiedade",
      icon: Dumbbell,
      color: "from-blue-400 to-cyan-500",
      points: 10,
    },
    {
      id: "dance-song",
      title: "Dance uma música",
      description: "Escolha sua música favorita e dance livremente",
      duration: "3-4 min",
      benefit: "Movimento libera energia acumulada e melhora o humor",
      icon: Music,
      color: "from-pink-400 to-rose-500",
      points: 15,
    },
    {
      id: "breathe-box",
      title: "Respiração quadrada",
      description: "4 segundos inspirar, 4 segurar, 4 expirar, 4 segurar",
      duration: "2 min",
      benefit: "Ativa o sistema nervoso parassimpático (relaxamento)",
      icon: Wind,
      color: "from-purple-400 to-indigo-500",
      points: 10,
    },
    {
      id: "yoga-sun",
      title: "Saudação ao sol",
      description: "Sequência de yoga para energizar o corpo",
      duration: "5 min",
      benefit: "Combina movimento e respiração para reduzir ansiedade",
      icon: Sparkles,
      color: "from-yellow-400 to-orange-500",
      points: 20,
    },
    {
      id: "walk-nature",
      title: "Caminhada na natureza",
      description: "10 minutos ao ar livre, observando o ambiente",
      duration: "10 min",
      benefit: "Contato com natureza reduz ansiedade em até 30%",
      icon: Footprints,
      color: "from-teal-400 to-green-500",
      points: 25,
    },
  ]

  const handleComplete = (mission: Mission) => {
    if (!completedMissions.includes(mission.id)) {
      setCompletedMissions([...completedMissions, mission.id])
      setTotalPoints(totalPoints + mission.points)
      onComplete()
    }
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
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Dumbbell className="w-8 h-8 text-purple-600" />
            Missões de Movimento
          </h1>
          <p className="text-gray-600">Exercícios leves que ajudam a reduzir a ansiedade</p>
        </div>

        {/* Points Card */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-10 h-10" />
              <div>
                <p className="text-sm opacity-90">Seus pontos</p>
                <p className="text-3xl font-bold">{totalPoints}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Missões completas</p>
              <p className="text-2xl font-bold">{completedMissions.length}/{missions.length}</p>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-4 mb-6 bg-blue-50 border-2 border-blue-200">
          <p className="text-sm text-gray-700">
            💡 <strong>Por que movimento ajuda?</strong> Exercícios físicos liberam endorfina (hormônio do bem-estar) 
            e reduzem cortisol (hormônio do estresse), ajudando a controlar a ansiedade naturalmente.
          </p>
        </Card>

        {/* Missions Grid */}
        <div className="space-y-4">
          {missions.map((mission) => {
            const isCompleted = completedMissions.includes(mission.id)

            return (
              <Card
                key={mission.id}
                className={`p-6 transition-all ${
                  isCompleted
                    ? "bg-green-50 border-2 border-green-500"
                    : "bg-white/90 backdrop-blur-sm hover:scale-[1.02] shadow-lg"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${mission.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <mission.icon className="w-7 h-7 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{mission.title}</h3>
                        <p className="text-sm text-gray-600">{mission.description}</p>
                      </div>
                      {isCompleted && (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium">
                        ⏱️ {mission.duration}
                      </span>
                      <span className="text-xs bg-yellow-100 px-3 py-1 rounded-full text-yellow-700 font-medium">
                        🏆 {mission.points} pontos
                      </span>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 mb-3">
                      <p className="text-sm text-gray-700">
                        <strong className="text-purple-700">Benefício:</strong> {mission.benefit}
                      </p>
                    </div>

                    {!isCompleted ? (
                      <Button
                        onClick={() => handleComplete(mission)}
                        className={`w-full bg-gradient-to-r ${mission.color} hover:opacity-90 text-white`}
                      >
                        Completar missão
                      </Button>
                    ) : (
                      <div className="text-center py-2 text-green-600 font-semibold">
                        ✅ Missão completa! Parabéns!
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Completion Message */}
        {completedMissions.length === missions.length && (
          <Card className="mt-6 p-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Parabéns! 🎉</h2>
            <p className="text-lg">Você completou todas as missões!</p>
            <p className="text-sm opacity-90 mt-2">Continue praticando para manter o bem-estar</p>
          </Card>
        )}
      </div>
    </div>
  )
}
