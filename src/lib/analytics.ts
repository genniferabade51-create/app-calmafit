/**
 * Sistema de analytics e tracking para CalmaFit
 */

export interface AnalyticsEvent {
  category: string
  action: string
  label?: string
  value?: number
}

export const analytics = {
  track: (event: AnalyticsEvent) => {
    // Log para desenvolvimento
    console.log("📊 Analytics:", event)
    
    // Aqui você pode integrar com Google Analytics, Mixpanel, etc
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      })
    }
  },

  trackScreen: (screenName: string) => {
    analytics.track({
      category: "Navigation",
      action: "screen_view",
      label: screenName,
    })
  },

  trackPractice: (practiceType: string) => {
    analytics.track({
      category: "Engagement",
      action: "practice_completed",
      label: practiceType,
    })
  },

  trackMood: (mood: string) => {
    analytics.track({
      category: "User State",
      action: "mood_logged",
      label: mood,
    })
  },

  trackSOS: () => {
    analytics.track({
      category: "Critical",
      action: "sos_activated",
    })
  },

  trackChatMessage: () => {
    analytics.track({
      category: "Engagement",
      action: "chat_message_sent",
    })
  },
}

// Hook para tracking de tempo na tela
export const useScreenTime = (screenName: string) => {
  if (typeof window === "undefined") return

  const startTime = Date.now()

  return () => {
    const duration = Math.floor((Date.now() - startTime) / 1000)
    analytics.track({
      category: "Engagement",
      action: "screen_time",
      label: screenName,
      value: duration,
    })
  }
}
