"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Heart, Wind, Eye, Ear, Hand, Headphones, Activity, Shield } from "lucide-react"
import type { Screen } from "../page"
import { analytics } from "@/lib/analytics"
import { disclaimers } from "@/lib/emergency"

interface SOSFlowProps {
  navigateTo: (screen: Screen) => void
  onComplete: () => void
}

export function SOSFlow({ navigateTo, onComplete }: SOSFlowProps) {
  const [step, setStep] = useState(0)
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [breathCount, setBreathCount] = useState(4)
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathCycles, setBreathCycles] = useState(0)
  const [groundingItems, setGroundingItems] = useState({
    seeing: ["", "", ""],
    hearing: ["", "", ""],
    touching: ["", "", ""],
  })

  useEffect(() => {
    if (!isBreathing) return

    const timer = setInterval(() => {
      setBreathCount((prev) => {
        if (prev <= 1) {
          if (breathPhase === "inhale") {
            setBreathPhase("hold")
            return 4
          } else if (breathPhase === "hold") {
            setBreathPhase("exhale")
            return 6
          } else {
            setBreathPhase("inhale")
            setBreathCycles(c => c + 1)
            return 4
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isBreathing, breathPhase])

  const getBreathText = () => {
    if (breathPhase === "inhale") return "Inspire pelo nariz"
    if (breathPhase === "hold") return "Segure o ar"
    return "Expire pela boca"
  }

  const getBreathColor = () => {
    if (breathPhase === "inhale") return "from-blue-400 to-cyan-500"
    if (breathPhase === "hold") return "from-purple-400 to-pink-500"
    return "from-green-400 to-emerald-500"
  }

  const isGroundingComplete = () => {
    return (
      groundingItems.seeing.every(item => item.trim()) &&
      groundingItems.hearing.every(item => item.trim()) &&
      groundingItems.touching.every(item => item.trim())
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <button
        onClick={() => navigateTo("home")}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </button>

      {/* Welcome Message */}
      {step === 0 && (
        <Card className="max-w-2xl mx-auto p-8 text-center space-y-6 bg-white/90 backdrop-blur-sm">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Respira comigo, vai passar
          </h1>
          <p className="text-lg text-gray-600">
            Vamos fazer três passos rápidos para te ajudar agora
          </p>
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Wind className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-semibold text-gray-800">Passo 1: Respiração</div>
                <div className="text-sm text-gray-600">2 minutos de respiração guiada</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <Eye className="w-6 h-6 text-purple-600" />
              <div>
                <div className="font-semibold text-gray-800">Passo 2: Grounding</div>
                <div className="text-sm text-gray-600">Conecte-se com o presente</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg">
              <Headphones className="w-6 h-6 text-pink-600" />
              <div>
                <div className="font-semibold text-gray-800">Passo 3: Escolha</div>
                <div className="text-sm text-gray-600">Áudio ou exercício físico</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-2 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-left">
            <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">{disclaimers.crisis}</p>
          </div>

          <Button
            onClick={() => {
              setStep(1)
              setIsBreathing(true)
              analytics.trackPractice("sos_breathing")
            }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg"
          >
            Começar agora
          </Button>
        </Card>
      )}

      {/* Step 1: Breathing */}
      {step === 1 && (
        <Card className="max-w-2xl mx-auto p-8 text-center space-y-8 bg-white/90 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-800">Respiração Guiada</h2>
          <div className="relative">
            <div
              className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-br ${getBreathColor()} flex items-center justify-center transition-all duration-1000 ${
                breathPhase === "inhale" ? "scale-110" : breathPhase === "exhale" ? "scale-90" : "scale-100"
              }`}
            >
              <div className="text-white">
                <div className="text-6xl font-bold">{breathCount}</div>
                <div className="text-sm mt-2">{getBreathText()}</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              Siga o ritmo da animação. Você está indo muito bem!
            </p>
            <p className="text-sm text-gray-500">
              Ciclos completos: {breathCycles} / 4
            </p>
          </div>
          <Button
            onClick={() => {
              setIsBreathing(false)
              setStep(2)
              onComplete()
            }}
            variant="outline"
            className="w-full py-6"
            disabled={breathCycles < 4}
          >
            {breathCycles < 4 ? "Complete 4 ciclos para continuar" : "Continuar para o próximo passo"}
          </Button>
        </Card>
      )}

      {/* Step 2: Grounding */}
      {step === 2 && (
        <Card className="max-w-2xl mx-auto p-8 space-y-6 bg-white/90 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Técnica de Grounding</h2>
          <p className="text-center text-gray-600">
            Vamos nos conectar com o presente. Liste 3 coisas para cada sentido:
          </p>

          <div className="space-y-6">
            {/* Seeing */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-800">3 coisas que você está vendo</h3>
              </div>
              {[0, 1, 2].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Coisa ${idx + 1}...`}
                  value={groundingItems.seeing[idx]}
                  onChange={(e) => {
                    const newSeeing = [...groundingItems.seeing]
                    newSeeing[idx] = e.target.value
                    setGroundingItems({ ...groundingItems, seeing: newSeeing })
                  }}
                  className="w-full p-3 mb-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              ))}
            </div>

            {/* Hearing */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Ear className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-800">3 coisas que você está ouvindo</h3>
              </div>
              {[0, 1, 2].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Som ${idx + 1}...`}
                  value={groundingItems.hearing[idx]}
                  onChange={(e) => {
                    const newHearing = [...groundingItems.hearing]
                    newHearing[idx] = e.target.value
                    setGroundingItems({ ...groundingItems, hearing: newHearing })
                  }}
                  className="w-full p-3 mb-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              ))}
            </div>

            {/* Touching */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Hand className="w-5 h-5 text-pink-600" />
                <h3 className="font-semibold text-gray-800">3 coisas que você está tocando</h3>
              </div>
              {[0, 1, 2].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Textura ${idx + 1}...`}
                  value={groundingItems.touching[idx]}
                  onChange={(e) => {
                    const newTouching = [...groundingItems.touching]
                    newTouching[idx] = e.target.value
                    setGroundingItems({ ...groundingItems, touching: newTouching })
                  }}
                  className="w-full p-3 mb-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:outline-none"
                />
              ))}
            </div>
          </div>

          <Button
            onClick={() => {
              setStep(3)
              analytics.trackPractice("sos_grounding")
            }}
            disabled={!isGroundingComplete()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6"
          >
            {isGroundingComplete() ? "Continuar" : "Preencha todos os campos"}
          </Button>
        </Card>
      )}

      {/* Step 3: Choose Activity */}
      {step === 3 && (
        <Card className="max-w-2xl mx-auto p-8 space-y-6 bg-white/90 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Você está indo muito bem!</h2>
          <p className="text-center text-gray-600">
            Escolha o que você gostaria de fazer agora:
          </p>

          <div className="space-y-4">
            <button
              onClick={() => {
                onComplete()
                analytics.trackPractice("sos_audio")
                navigateTo("home")
              }}
              className="w-full p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:scale-[1.02] transition-all shadow-lg"
            >
              <div className="flex items-center gap-4">
                <Headphones className="w-8 h-8" />
                <div className="text-left">
                  <div className="font-bold text-lg">Ouvir um áudio curto</div>
                  <div className="text-sm text-blue-100">Meditação guiada de 5 minutos</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                onComplete()
                analytics.trackPractice("sos_exercise")
                navigateTo("missions")
              }}
              className="w-full p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:scale-[1.02] transition-all shadow-lg"
            >
              <div className="flex items-center gap-4">
                <Activity className="w-8 h-8" />
                <div className="text-left">
                  <div className="font-bold text-lg">Fazer um exercício de corpo</div>
                  <div className="text-sm text-green-100">Alongamento ou caminhada leve</div>
                </div>
              </div>
            </button>

            <Button
              onClick={() => navigateTo("home")}
              variant="outline"
              className="w-full py-6"
            >
              Voltar para o início
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            💛 Lembre-se: Se a crise persistir, busque ajuda profissional. CVV: 188
          </div>
        </Card>
      )}
    </div>
  )
}
