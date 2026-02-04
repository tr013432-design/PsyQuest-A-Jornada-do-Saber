import React from 'react';
import { BookOpen, Trophy, Target } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 font-sans">
      {/* Header de Status */}
      <div className="max-w-md mx-auto bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-bold">LV 1</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Estudante</p>
              <p className="font-bold text-slate-800">Seu Nome</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-amber-700 font-bold text-sm">150</span>
          </div>
        </div>
        
        {/* Barra de XP */}
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div className="bg-indigo-500 h-full w-1/3 rounded-full"></div>
        </div>
      </div>

      {/* Card Principal de Estudo */}
      <div className="max-w-md mx-auto">
        <h2 className="text-slate-800 font-bold text-lg mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-500" />
          Missão do Dia
        </h2>
        
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Caso: Dificuldade de Alfabetização</h3>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
              Analise o comportamento de um aluno de 7 anos com sinais de dislexia...
            </p>
            <button className="w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl hover:bg-indigo-50 transition-colors shadow-md">
              Começar Desafio
            </button>
          </div>
          {/* Círculo decorativo */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500 rounded-full opacity-50"></div>
        </div>

        {/* Trilhas */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <BookOpen className="w-6 h-6 text-emerald-500 mb-2" />
            <p className="font-bold text-slate-800">Psicologia</p>
            <p className="text-xs text-slate-500">12 casos novos</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <BookOpen className="w-6 h-6 text-rose-500 mb-2" />
            <p className="font-bold text-slate-800">Pedagogia</p>
            <p className="text-xs text-slate-500">8 casos novos</p>
          </div>
        </div>
      </div>
    </main>
  );
}
