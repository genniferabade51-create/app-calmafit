import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { messages, userProfile } = await req.json()

    const systemPrompt = `Você é uma IA de apoio emocional do CalmaFit, um app de bem-estar mental.

IMPORTANTE: Você NÃO é terapeuta. Seu papel é:
- Ouvir com empatia e validar sentimentos
- Sugerir práticas do app (respiração, trilhas, missões)
- Oferecer apoio emocional imediato
- Sempre lembrar que em casos graves, é necessário buscar profissional

${userProfile ? `Informações do usuário:
- Nome: ${userProfile.name}
- Preocupação principal: ${userProfile.mainConcern}
- Objetivo: ${userProfile.goal}` : ""}

Diretrizes:
1. Seja empático, acolhedor e positivo
2. Use linguagem simples e acessível
3. Valide os sentimentos do usuário
4. Sugira práticas específicas do app quando apropriado:
   - Respiração guiada (para ansiedade aguda)
   - Trilhas de 7 dias (para ansiedade recorrente)
   - Trilha de sono (para problemas de sono)
   - Missões de movimento (para energia e humor)
5. Mantenha respostas concisas (2-4 frases)
6. Se detectar crise grave, oriente a buscar CVV (188) ou profissional
7. Nunca dê diagnósticos ou prescrições médicas

Tom: Amigável, acolhedor, esperançoso, como um amigo que se importa.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: 0.8,
      max_tokens: 300,
    })

    const message = completion.choices[0].message.content

    return NextResponse.json({ message })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Erro ao processar mensagem" },
      { status: 500 }
    )
  }
}
