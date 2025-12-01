"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, User as UserIcon, Crown, Flame, Trophy, Heart, Target, Dumbbell, Phone, ExternalLink, LogOut, Shield } from "lucide-react"
import type { Screen, UserProfile } from "../page"
import { storage } from "@/lib/storage"
import { emergencyContacts, mentalHealthResources, disclaimers } from "@/lib/emergency"

interface ProfileProps {
  navigateTo: (screen: Screen) => void
  userProfile: UserProfile
  streak: number
  practicesCompleted: number
}

export function Profile({ navigateTo, userProfile, streak, practicesCompleted }: ProfileProps) {
  const [showEmergency, setShowEmergency] = useState(false)
  const [showPremium, setShowPremium] = useState(false)

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair? Seus dados serão mantidos para quando voltar.")) {
      // Não limpa os dados, apenas volta para onboarding
      window.location.reload()
    }
  }

  const handleClearData = () => {
    if (confirm("Tem certeza? Todos os seus dados serão apagados permanentemente.")) {
      storage.clear()
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => navigateTo("home")}
          className="mb-4 flex items-center gap-2 text-white/80 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <UserIcon className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{userProfile.name}</h1>
            <p className="text-purple-100">Objetivo: {userProfile.goal}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6 bg-gradient-to-br from-orange-400 to-red-500 text-white">
            <Flame className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold">{streak}</div>
            <div className="text-sm opacity-90">Dias seguidos</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-400 to-emerald-500 text-white">
            <Trophy className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold">{practicesCompleted}</div>
            <div className="text-sm opacity-90">Práticas feitas</div>
          </Card>
        </div>

        {/* Premium Card */}
        <Card 
          onClick={() => setShowPremium(!showPremium)}
          className="p-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white cursor-pointer hover:scale-[1.02] transition-all shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8" />
              <div>
                <h3 className="font-bold text-lg">CalmaFit Premium</h3>
                <p className="text-sm text-yellow-100">Desbloqueie todo o potencial</p>
              </div>
            </div>
            <div className="text-2xl">{showPremium ? "−" : "+"}</div>
          </div>
          
          {showPremium && (
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Acesso total a todas as trilhas</span>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell className="w-4 h-4" />
                <span>Mais tipos de exercícios e missões</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Uso ilimitado da IA</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span>Relatórios de progresso detalhados</span>
              </div>
              <Button className="w-full mt-4 bg-white text-orange-600 hover:bg-yellow-50 font-bold">
                Assinar por R$ 19,90/mês
              </Button>
            </div>
          )}
        </Card>

        {/* Emergency Contacts */}
        <Card className="p-6 bg-white shadow-lg">
          <button
            onClick={() => setShowEmergency(!showEmergency)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-red-500" />
              <h3 className="font-bold text-gray-800">Contatos de Emergência</h3>
            </div>
            <div className="text-2xl text-gray-400">{showEmergency ? "−" : "+"}</div>
          </button>

          {showEmergency && (
            <div className="mt-6 space-y-4">
              {emergencyContacts.map((contact, idx) => (
                <div key={idx} className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                  <div className="font-bold text-gray-800">{contact.name}</div>
                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-2xl font-bold text-red-600 hover:text-red-700"
                    >
                      {contact.phone}
                    </a>
                  )}
                  <p className="text-sm text-gray-600 mt-1">{contact.description}</p>
                  {contact.website && (
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-2"
                    >
                      Acessar site <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-bold text-gray-800">Quando procurar ajuda?</h4>
                </div>
                <ul className="text-sm text-gray-700 space-y-1">
                  {mentalHealthResources[0].items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-yellow-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Card>

        {/* Profile Info */}
        <Card className="p-6 bg-white shadow-lg space-y-4">
          <h3 className="font-bold text-gray-800 text-lg">Suas Informações</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-600">Preocupação principal:</span>
              <div className="font-semibold text-gray-800 capitalize">{userProfile.mainConcern}</div>
            </div>
            <div>
              <span className="text-gray-600">Frequência de ansiedade:</span>
              <div className="font-semibold text-gray-800">{userProfile.anxietyFrequency}</div>
            </div>
            <div>
              <span className="text-gray-600">Atividade física:</span>
              <div className="font-semibold text-gray-800 capitalize">{userProfile.physicalActivity}</div>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <Card className="p-6 bg-blue-50 border-2 border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold text-gray-800 mb-2">Aviso Importante</p>
              <p>{disclaimers.app}</p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full py-6 text-gray-700 border-2"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair
          </Button>
          <Button
            onClick={handleClearData}
            variant="outline"
            className="w-full py-6 text-red-600 border-2 border-red-200 hover:bg-red-50"
          >
            Apagar todos os dados
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center p-4">
          <button onClick={() => navigateTo("home")} className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-600">
            <Target className="w-6 h-6" />
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
          <button onClick={() => navigateTo("profile")} className="flex flex-col items-center gap-1 text-purple-600">
            <UserIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  )
}
