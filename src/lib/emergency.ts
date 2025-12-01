/**
 * Contatos de emergência e recursos de saúde mental
 */

export const emergencyContacts = [
  {
    name: "CVV - Centro de Valorização da Vida",
    phone: "188",
    description: "Apoio emocional e prevenção do suicídio. Atendimento 24h por telefone, chat e e-mail.",
    website: "https://www.cvv.org.br",
    type: "emergency",
  },
  {
    name: "CAPS - Centro de Atenção Psicossocial",
    phone: "136",
    description: "Atendimento gratuito em saúde mental pelo SUS.",
    type: "health",
  },
  {
    name: "SAMU",
    phone: "192",
    description: "Emergências médicas urgentes.",
    type: "emergency",
  },
  {
    name: "Mapa da Saúde Mental",
    description: "Encontre profissionais e serviços de saúde mental gratuitos ou com preços acessíveis.",
    website: "https://www.mapasaudemental.com.br",
    type: "resource",
  },
]

export const mentalHealthResources = [
  {
    title: "Quando procurar ajuda profissional?",
    items: [
      "Sentimentos persistentes de tristeza ou ansiedade",
      "Dificuldade para realizar atividades diárias",
      "Pensamentos de autolesão ou suicídio",
      "Mudanças drásticas no sono ou apetite",
      "Isolamento social prolongado",
    ],
  },
  {
    title: "Tipos de profissionais",
    items: [
      "Psicólogo: Terapia e acompanhamento psicológico",
      "Psiquiatra: Diagnóstico e medicação quando necessário",
      "Terapeuta ocupacional: Atividades para bem-estar",
      "Assistente social: Apoio em questões sociais",
    ],
  },
]

export const disclaimers = {
  app: "O CalmaFit é uma ferramenta de apoio ao bem-estar e não substitui acompanhamento profissional. Em caso de emergência, procure ajuda imediatamente.",
  ai: "Esta IA oferece apoio emocional baseado em técnicas de bem-estar. Para diagnósticos e tratamentos, consulte um profissional de saúde mental.",
  crisis: "Se você está em crise ou com pensamentos suicidas, ligue para o CVV (188) imediatamente. Você não está sozinho.",
}
