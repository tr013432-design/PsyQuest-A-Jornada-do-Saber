export type Course = 'Psicologia' | 'Pedagogia' | 'Psicopedagogia';

export interface UserStats {
  level: number;
  xp: number;
  coins: number;
  streak: number;
  currentCourse: Course;
}

export interface GameCase {
  id: string;
  title: string;
  narrative: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
}
