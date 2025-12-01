/**
 * Utilitários gerais para CalmaFit
 */

export const utils = {
  // Formatar data para exibição
  formatDate: (date: Date | string): string => {
    const d = typeof date === "string" ? new Date(date) : date
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  },

  // Formatar data relativa (ex: "há 2 dias")
  formatRelativeDate: (date: Date | string): string => {
    const d = typeof date === "string" ? new Date(date) : date
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Hoje"
    if (diffDays === 1) return "Ontem"
    if (diffDays < 7) return `Há ${diffDays} dias`
    if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semanas`
    if (diffDays < 365) return `Há ${Math.floor(diffDays / 30)} meses`
    return `Há ${Math.floor(diffDays / 365)} anos`
  },

  // Calcular porcentagem de progresso
  calculateProgress: (current: number, total: number): number => {
    if (total === 0) return 0
    return Math.round((current / total) * 100)
  },

  // Gerar ID único
  generateId: (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  },

  // Debounce para otimizar performance
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | null = null
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  },

  // Truncar texto
  truncate: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  },

  // Capitalizar primeira letra
  capitalize: (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  },

  // Verificar se é mobile
  isMobile: (): boolean => {
    if (typeof window === "undefined") return false
    return window.innerWidth < 768
  },

  // Copiar para clipboard
  copyToClipboard: async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  },

  // Vibrar dispositivo (se suportado)
  vibrate: (pattern: number | number[] = 200): void => {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern)
    }
  },

  // Compartilhar (Web Share API)
  share: async (data: { title?: string; text?: string; url?: string }): Promise<boolean> => {
    if (!navigator.share) return false
    try {
      await navigator.share(data)
      return true
    } catch {
      return false
    }
  },
}

// Constantes úteis
export const constants = {
  APP_NAME: "CalmaFit",
  APP_VERSION: "1.0.0",
  SUPPORT_EMAIL: "suporte@calmafit.com",
  PRIVACY_URL: "https://calmafit.com/privacidade",
  TERMS_URL: "https://calmafit.com/termos",
  
  // Limites
  MAX_NAME_LENGTH: 50,
  MAX_MESSAGE_LENGTH: 500,
  MIN_PASSWORD_LENGTH: 6,
  
  // Tempos (em ms)
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
}
