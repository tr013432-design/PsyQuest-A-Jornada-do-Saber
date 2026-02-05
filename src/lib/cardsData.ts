export type CardSeries = 'mestres' | 'tecnicas' | 'transtornos' | 'ferramentas' | 'casos' | 'etica' | 'cosmeticos';
export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Card {
  id: string;
  name: string;
  series: CardSeries;
  rarity: CardRarity;
  description: string;
  craftCost: number;      // Quanto custa para criar (Essência)
  disenchantValue: number;// Quanto ganha se vier repetida
}

export const CARDS_DATABASE: Card[] = [
  // --- SÉRIE: MESTRES DA PSICOLOGIA ---
  { id: 'freud', name: 'Sigmund Freud', series: 'mestres', rarity: 'legendary', description: 'O Pai da Psicanálise. Descobriu o Inconsciente.', craftCost: 1000, disenchantValue: 250 },
  { id: 'skinner', name: 'B.F. Skinner', series: 'mestres', rarity: 'epic', description: 'Behaviorismo Radical. Reforço e Punição.', craftCost: 500, disenchantValue: 100 },
  { id: 'piaget', name: 'Jean Piaget', series: 'mestres', rarity: 'epic', description: 'Construtivismo e fases do desenvolvimento.', craftCost: 500, disenchantValue: 100 },
  { id: 'aaron_beck', name: 'Aaron Beck', series: 'mestres', rarity: 'rare', description: 'Pai da Terapia Cognitiva. O pensamento gera emoção.', craftCost: 200, disenchantValue: 40 },

  // --- SÉRIE: TÉCNICAS & INTERVENÇÕES ---
  { id: 'reestruturacao', name: 'Reestruturação Cognitiva', series: 'tecnicas', rarity: 'rare', description: 'Identificar e desafiar pensamentos distorcidos.', craftCost: 200, disenchantValue: 40 },
  { id: 'exposicao', name: 'Exposição Gradual', series: 'tecnicas', rarity: 'rare', description: 'Enfrentar medos de forma progressiva.', craftCost: 200, disenchantValue: 40 },
  { id: 'escuta_ativa', name: 'Escuta Ativa', series: 'tecnicas', rarity: 'common', description: 'Ouvir com total atenção e empatia.', craftCost: 50, disenchantValue: 10 },
  
  // --- SÉRIE: TRANSTORNOS ---
  { id: 'tag', name: 'TAG', series: 'transtornos', rarity: 'epic', description: 'Transtorno de Ansiedade Generalizada. Preocupação excessiva.', craftCost: 500, disenchantValue: 100 },
  { id: 'tdah', name: 'TDAH', series: 'transtornos', rarity: 'epic', description: 'Déficit de Atenção e Hiperatividade.', craftCost: 500, disenchantValue: 100 },
  { id: 'depressao', name: 'Depressão Maior', series: 'transtornos', rarity: 'rare', description: 'Tristeza persistente e anedonia.', craftCost: 200, disenchantValue: 40 },

  // --- SÉRIE: CASOS ICÔNICOS ---
  { id: 'pequeno_albert', name: 'O Pequeno Albert', series: 'casos', rarity: 'legendary', description: 'O controverso experimento de condicionamento do medo.', craftCost: 1000, disenchantValue: 250 },
  { id: 'phineas_gage', name: 'Phineas Gage', series: 'casos', rarity: 'legendary', description: 'O caso da barra de ferro que mudou a neurociência.', craftCost: 1000, disenchantValue: 250 },

  // --- SÉRIE: ÉTICA ---
  { id: 'sigilo', name: 'Sigilo Profissional', series: 'etica', rarity: 'common', description: 'A base da confiança terapêutica.', craftCost: 50, disenchantValue: 10 },
  { id: 'consentimento', name: 'Consentimento Livre', series: 'etica', rarity: 'common', description: 'O paciente deve concordar com o tratamento.', craftCost: 50, disenchantValue: 10 },
];
