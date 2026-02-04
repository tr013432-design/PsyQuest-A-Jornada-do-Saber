import { NextResponse } from 'next/server';

// Banco de Templates (O "DNA" dos casos)
const TEMPLATES = [
  {
    baseTitle: "Dificuldade de Aprendizagem",
    contexts: [
      "em fase de alfabetização apresentando espelhamento de letras",
      "no 5º ano com dificuldade de interpretação de texto",
      "com suspeita de TDAH e agitação motora"
    ],
    questions: [
      "Qual a intervenção inicial mais adequada?",
      "Que instrumento de avaliação deve ser priorizado?",
      "Como orientar a equipe pedagógica neste caso?"
    ],
    corrects: [
      "Investigação fonológica e anamnese",
      "Avaliação psicopedagógica completa",
      "Adaptação curricular e rotina estruturada"
    ]
  },
  {
    baseTitle: "Conflito em Sala de Aula",
    contexts: [
      "após isolamento social prolongado",
      "envolvendo bullying sistemático",
      "com recusa escolar e sintomas de ansiedade"
    ],
    questions: [
      "Qual a abordagem ética recomendada?",
      "Como a escola deve proceder com a família?",
      "Qual o papel do psicólogo escolar nesta demanda?"
    ],
    corrects: [
      "Mediação de conflitos e escuta ativa",
      "Acolhimento sem julgamento e encaminhamento",
      "Mapeamento institucional e intervenção coletiva"
    ]
  }
];

export async function POST() {
  // Simulação de "Thinking Time" da IA (para dar emoção ao usuário)
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 1. Sorteia um Template
  const template = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  
  // 2. Sorteia Variações (Monta o "Frankenstein" lógico)
  const context = template.contexts[Math.floor(Math.random() * template.contexts.length)];
  const question = template.questions[Math.floor(Math.random() * template.questions.length)];
  const correctAnswer = template.corrects[Math.floor(Math.random() * template.corrects.length)];

  // 3. Gera Distratores (Respostas erradas genéricas para preencher)
  const wrongAnswers = [
    "Encaminhamento imediato para medicação",
    "Suspensão do aluno das atividades",
    "Ignorar o comportamento e observar",
    "Solicitar transferência de escola"
  ].sort(() => 0.5 - Math.random()).slice(0, 2);

  // 4. Monta o Objeto Final
  const generatedCase = {
    id: Date.now(), // ID único baseado no tempo
    title: `${template.baseTitle}`,
    context: `Paciente/Aluno ${context}.`,
    question: question,
    options: [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random()), // Embaralha as opções
    correctIndex: -1, // Será calculado no frontend ou aqui. Vamos facilitar:
    explanation: `A conduta "${correctAnswer}" é a mais indicada pois respeita os princípios de intervenção precoce e ética profissional.`,
    isGenerated: true
  };

  // Ajusta o índice correto após embaralhar
  generatedCase.correctIndex = generatedCase.options.indexOf(correctAnswer);

  return NextResponse.json(generatedCase);
}
