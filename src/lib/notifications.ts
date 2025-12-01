/**
 * Sistema de notificações push para CalmaFit
 */

export const notifications = {
  requestPermission: async (): Promise<boolean> => {
    if (!("Notification" in window)) {
      console.log("Este navegador não suporta notificações")
      return false
    }

    if (Notification.permission === "granted") {
      return true
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission()
      return permission === "granted"
    }

    return false
  },

  send: (title: string, options?: NotificationOptions) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        icon: "/icon.svg",
        badge: "/icon.svg",
        ...options,
      })
    }
  },

  scheduleDaily: (hour: number, minute: number, message: string) => {
    // Calcula tempo até próxima notificação
    const now = new Date()
    const scheduled = new Date()
    scheduled.setHours(hour, minute, 0, 0)

    if (scheduled <= now) {
      scheduled.setDate(scheduled.getDate() + 1)
    }

    const timeUntil = scheduled.getTime() - now.getTime()

    setTimeout(() => {
      notifications.send("CalmaFit 💜", {
        body: message,
        tag: "daily-reminder",
      })
      // Reagenda para o próximo dia
      notifications.scheduleDaily(hour, minute, message)
    }, timeUntil)
  },
}

// Mensagens motivacionais para notificações
export const motivationalMessages = [
  "Hora do seu check-in de 2 minutos de calma 🧘",
  "Que tal uma respiração guiada agora? 💨",
  "Lembre-se: você está indo muito bem! 💪",
  "Já fez sua prática de hoje? 🌟",
  "Um momento de autocuidado te espera ✨",
]
