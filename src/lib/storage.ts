/**
 * Sistema de persistência local para CalmaFit
 * Salva dados do usuário no localStorage
 */

export interface StoredUserData {
  profile: {
    name: string
    mainConcern: string
    anxietyFrequency: string
    physicalActivity: string
    goal: string
  }
  streak: number
  practicesCompleted: number
  lastAccessDate: string
  completedTrails: string[]
  completedMissions: string[]
  moodHistory: Array<{
    date: string
    mood: string
  }>
}

const STORAGE_KEY = "calmafit_user_data"

export const storage = {
  save: (data: Partial<StoredUserData>) => {
    if (typeof window === "undefined") return
    
    const existing = storage.load()
    const updated = { ...existing, ...data }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  },

  load: (): StoredUserData | null => {
    if (typeof window === "undefined") return null
    
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null
    
    try {
      return JSON.parse(data)
    } catch {
      return null
    }
  },

  clear: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEY)
  },

  updateStreak: () => {
    const data = storage.load()
    if (!data) return

    const today = new Date().toDateString()
    const lastAccess = new Date(data.lastAccessDate).toDateString()
    
    if (today !== lastAccess) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const wasYesterday = yesterday.toDateString() === lastAccess
      
      storage.save({
        streak: wasYesterday ? data.streak + 1 : 1,
        lastAccessDate: new Date().toISOString(),
      })
    }
  },

  addMoodEntry: (mood: string) => {
    const data = storage.load()
    if (!data) return

    const today = new Date().toDateString()
    const moodHistory = data.moodHistory || []
    
    // Remove entrada de hoje se existir
    const filtered = moodHistory.filter(entry => 
      new Date(entry.date).toDateString() !== today
    )
    
    storage.save({
      moodHistory: [...filtered, { date: new Date().toISOString(), mood }],
    })
  },
}
