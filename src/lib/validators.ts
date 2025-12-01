/**
 * Sistema de validação de formulários para CalmaFit
 */

export const validators = {
  name: (value: string): string | null => {
    if (!value.trim()) return "Nome é obrigatório"
    if (value.trim().length < 2) return "Nome muito curto"
    if (value.trim().length > 50) return "Nome muito longo"
    return null
  },

  email: (value: string): string | null => {
    if (!value.trim()) return "E-mail é obrigatório"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return "E-mail inválido"
    return null
  },

  password: (value: string): string | null => {
    if (!value) return "Senha é obrigatória"
    if (value.length < 6) return "Senha deve ter no mínimo 6 caracteres"
    return null
  },

  required: (value: string): string | null => {
    if (!value || !value.trim()) return "Campo obrigatório"
    return null
  },
}

export const formatters = {
  phone: (value: string): string => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  },

  cpf: (value: string): string => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  },

  date: (value: string): string => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
  },
}
