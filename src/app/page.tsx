"use client"

import { useState, useEffect } from "react"
import { OnboardingFlow } from "./components/OnboardingFlow"
import { HomeScreen } from "./components/HomeScreen"
import { SOSFlow } from "./components/SOSFlow"
import { ChatAI } from "./components/ChatAI"
import { Trails } from "./components/Trails"
import { Missions } from "./components/Missions"
import { Profile } from "./components/Profile"
import { storage, type StoredUserData } from "@/lib/storage"
import { analytics } from "@/lib/analytics"
import { notifications } from "@/lib/notifications"

export type Screen = "onboarding" | "home" | "sos" | "chat" | "trails" | "missions" | "profile"

export interface UserProfile {
  name: string
  mainConcern: string
  anxietyFrequency: string
  physicalActivity: string
  goal: string
}

export default function CalmaFit() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [streak, setStreak] = useState(0)
  const [practicesCompleted, setPracticesCompleted] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar dados salvos ao iniciar
  useEffect(() => {
    const loadData = () => {
      const savedData = storage.load()
      
      if (savedData?.profile) {
        setUserProfile(savedData.profile)
        setStreak(savedData.streak || 0)
        setPracticesCompleted(savedData.practicesCompleted || 0)
        setCurrentScreen("home")
        
        // Atualizar streak
        storage.updateStreak()
        const updatedData = storage.load()
        if (updatedData) {
          setStreak(updatedData.streak)
        }
      }
      
      setIsLoading(false)
    }

    loadData()

    // Solicitar permissão para notificações
    notifications.requestPermission().then(granted => {
      if (granted) {
        // Agendar notificação diária às 20h
        notifications.scheduleDaily(20, 0, "Hora do seu check-in de 2 minutos de calma 🧘")
      }
    })
  }, [])

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    setCurrentScreen("home")
    
    // Salvar perfil
    storage.save({
      profile,
      streak: 1,
      practicesCompleted: 0,
      lastAccessDate: new Date().toISOString(),
      completedTrails: [],
      completedMissions: [],
      moodHistory: [],
    })
    
    analytics.track({
      category: "Onboarding",
      action: "completed",
      label: profile.mainConcern,
    })
  }

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen)
    analytics.trackScreen(screen)
  }

  const incrementPractices = () => {
    setPracticesCompleted(prev => {
      const newCount = prev + 1
      storage.save({ practicesCompleted: newCount })
      return newCount
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Carregando CalmaFit...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {currentScreen === "onboarding" && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
      
      {currentScreen === "home" && userProfile && (
        <HomeScreen 
          userProfile={userProfile} 
          navigateTo={navigateTo}
          streak={streak}
        />
      )}
      
      {currentScreen === "sos" && (
        <SOSFlow 
          navigateTo={navigateTo}
          onComplete={incrementPractices}
        />
      )}
      
      {currentScreen === "chat" && (
        <ChatAI 
          navigateTo={navigateTo}
          userProfile={userProfile}
        />
      )}
      
      {currentScreen === "trails" && (
        <Trails 
          navigateTo={navigateTo}
          onComplete={incrementPractices}
        />
      )}
      
      {currentScreen === "missions" && (
        <Missions 
          navigateTo={navigateTo}
          onComplete={incrementPractices}
        />
      )}
      
      {currentScreen === "profile" && userProfile && (
        <Profile 
          navigateTo={navigateTo}
          userProfile={userProfile}
          streak={streak}
          practicesCompleted={practicesCompleted}
        />
      )}
    </div>
  )
}
