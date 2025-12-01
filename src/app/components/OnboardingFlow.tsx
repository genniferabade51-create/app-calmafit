"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, Sparkles } from "lucide-react"
import type { UserProfile } from "../page"

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [mainConcern, setMainConcern] = useState("")
  const [anxietyFrequency, setAnxietyFrequency] = useState("")
  const [physicalActivity, setPhysicalActivity] = useState("")

  const concerns = [
    { value: "ansiedade", label: "Ansiedade", emoji: "😰" },
    { value: "sono", label: "Sono", emoji: "😴" },
    { value: "foco", label: "Foco", emoji: "🎯" },
    { value: "estresse", label: "Estresse", emoji: "😓" },
    { value: "outros", label: "Outros", emoji: "💭" },
  ]

  const frequencies = [
    { value: "todo-dia", label: "Praticamente todo dia" },
    { value: "varias-vezes", label: "Várias vezes por semana" },
    { value: "as-vezes", label: "Às vezes" },
    { value: "raramente", label: "Raramente" },
  ]

  const activities = [
    { value: "regularmente", label: "Regularmente" },
    { value: "as-vezes", label: "Às vezes" },
    { value: "nao", label: "Não" },
  ]

  const getGoal = () => {
    if (mainConcern === "ansiedade") return "reduzir crises de ansiedade"
    if (mainConcern === "sono") return "dormir melhor"
    if (mainConcern === "foco") return "melhorar o foco"
    if (mainConcern === "estresse") return "reduzir o estresse"
    return "melhorar o bem-estar"
  }

  const handleComplete = () => {
    const profile: UserProfile = {
      name,
      mainConcern,
      anxietyFrequency,
      physicalActivity,
      goal: getGoal(),
    }
    onComplete(profile)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-white/90 backdrop-blur-sm shadow-2xl">
        {/* Welcome */}
        {step === 0 && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Bem-vindo ao CalmaFit
            </h1>
            <p className="text-lg text-gray-600">
              Seu espaço seguro para cuidar da mente e do corpo
            </p>
            <Input
              placeholder="Como você gostaria de ser chamado?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-lg p-6"
            />
            <Button
              onClick={() => setStep(1)}
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg"
            >
              Continuar
            </Button>
          </div>
        )}

        {/* Question 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-purple-600 mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Passo 1 de 3</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              O que mais está te incomodando hoje, {name}?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {concerns.map((concern) => (
                <button
                  key={concern.value}
                  onClick={() => {
                    setMainConcern(concern.value)
                    setStep(2)
                  }}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    mainConcern === concern.value
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="text-4xl mb-2">{concern.emoji}</div>
                  <div className="font-semibold text-gray-800">{concern.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-purple-600 mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Passo 2 de 3</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Com que frequência você sente ansiedade?
            </h2>
            <div className="space-y-3">
              {frequencies.map((freq) => (
                <button
                  key={freq.value}
                  onClick={() => {
                    setAnxietyFrequency(freq.value)
                    setStep(3)
                  }}
                  className={`w-full p-5 rounded-xl border-2 transition-all hover:scale-[1.02] text-left ${
                    anxietyFrequency === freq.value
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="font-semibold text-gray-800">{freq.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-purple-600 mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Passo 3 de 3</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Você pratica atividade física?
            </h2>
            <div className="space-y-3">
              {activities.map((activity) => (
                <button
                  key={activity.value}
                  onClick={() => {
                    setPhysicalActivity(activity.value)
                    handleComplete()
                  }}
                  className={`w-full p-5 rounded-xl border-2 transition-all hover:scale-[1.02] text-left ${
                    physicalActivity === activity.value
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="font-semibold text-gray-800">{activity.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
