export interface Question {
  id: number;
  title: string;
  context: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const CASOS_PSICOLOGIA: Question[] = [
  {
    id: 1,
    title: "Dificuldade de Alfabetização",
    context: "Lucas, 7 anos, apresenta inversão de letras e desatenção em sala.",
    question: "Qual o instrumento mais adequado para iniciar a investigação com a família?",
    options: ["Anamnese detalhada", "Aplicação de teste de QI", "Encaminhamento médico"],
    correctIndex: 0,
    explanation: "A anamnese permite colher o histórico do desenvolvimento e identificar fatores ambientais ou hereditários."
  },
  {
    id: 2,
    title: "Ansiedade em Provas",
    context: "Ana, 15 anos, trava completamente durante avaliações de matemática.",
    question: "Qual técnica da TCC (Terapia Cognitivo-Comportamental) é indicada para regulação imediata?",
    options: ["Associação livre", "Técnicas de respiração diafragmática", "Análise de sonhos"],
    correctIndex: 1,
    explanation: "A respiração diafragmática ajuda a baixar a ativação fisiológica do sistema nervoso simpático."
  }
];
