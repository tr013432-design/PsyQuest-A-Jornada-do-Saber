export interface ShopItem {
  id: string;
  type: 'skin' | 'theme';
  name: string;
  cost: number;
  minLevel: number;
  image: string; // URL da imagem ou classe de cor
  description: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  // SKINS (Vamos usar variações de cor do boneco por enquanto ou ícones)
  {
    id: 'skin_default',
    type: 'skin',
    name: 'Iniciante',
    cost: 0,
    minLevel: 1,
    image: '/avatar-default.png',
    description: 'O traje padrão de todo estudante.'
  },
  {
    id: 'skin_blue',
    type: 'skin',
    name: 'Estagiário Azul',
    cost: 500,
    minLevel: 2,
    image: 'https://cdn-icons-png.flaticon.com/512/4825/4825038.png', // Exemplo visual temporário
    description: 'Mostre que você já tem experiência clínica.'
  },
  {
    id: 'skin_gold',
    type: 'skin',
    name: 'Mestre Dourado',
    cost: 2000,
    minLevel: 5,
    image: 'https://cdn-icons-png.flaticon.com/512/4825/4825112.png',
    description: 'Apenas para a elite acadêmica.'
  },

  // TEMAS (Muda a cor de fundo do perfil)
  {
    id: 'theme_royal',
    type: 'theme',
    name: 'Azul Royal',
    cost: 300,
    minLevel: 1,
    image: 'from-blue-600 via-indigo-500 to-purple-500', // Classes do Tailwind
    description: 'Um visual sério e confiável.'
  },
  {
    id: 'theme_nature',
    type: 'theme',
    name: 'Pedagogia Natural',
    cost: 300,
    minLevel: 1,
    image: 'from-emerald-500 via-green-500 to-teal-500',
    description: 'Para quem ama o desenvolvimento natural.'
  }
];
