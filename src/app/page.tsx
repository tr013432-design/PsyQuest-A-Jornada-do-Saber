"use client"; // Isso permite que o app tenha botões clicáveis
import React, { useState } from 'react';
import Header from '../components/Header';
import { BookOpen, Play, CheckCircle2, Star } from 'lucide-react';

export default function Home() {
  const [showCase, setShowCase] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      
      <main className="max-w-md mx-auto p-5 pb-24">
        {/* Barra de Progresso Superior */}
        <div className="mb-8 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between text-xs font-black text-indigo-600 mb-2 uppercase tracking-widest">
            <span>Missão Semanal</span>
            <span>3/5 Casos</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[60%] rounded-full shadow-[0_0_12px_rgba(79,70,229,0.3)]"></div>
          </div>
        </div>

        {/* Card de Destaque */}
        {!showCase ? (
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden mb-8">
            <div className="relative z-10">
              <span className="bg-indigo-400/30 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-indigo-300/50">
                Novo Caso Disponível
              </span>
              <h2 className="text-2xl font-black mt-4 mb-2 leading-tight">Dificuldade de Alfabetização</h2>
              <p className="text-indigo-100 text-sm mb-8 opacity-90 leading-relaxed">
                Lucas, 7 anos, apresenta inversão de letras e desatenção. Como você agiria?
              </p>
              <button 
                onClick={() => setShowCase(true)}
                className="w-full bg-white text-indigo-600 font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_6px_0_#e2e8f0] active:translate-y-1 active:shadow-none transition-all"
              >
                COMEÇAR <Play size={18} fill="currentColor" />
              </button>
            </div>
          </div>
        ) : (
          /* Mini Jogo de Exemplo */
          <div className="bg-white rounded-[2.5rem] p-8 border-2 border-indigo-100 shadow-xl animate-in fade-in zoom-in duration-300">
            <h3 className="font-black text-indigo-600 mb-4 flex items-center gap-2">
              <Star size={18} className="fill-indigo-600" /> PERGUNTA 1
            </h3>
            <p className="text-slate-700 font-bold mb-6 text-lg">Qual o primeiro passo para o diagnóstico de Lucas?</p>
            <div className="space-y-3">
              {['Avaliação neuropsicológica', 'Entrevista com os pais (Anamnese)', 'Aplicação de teste de QI'].map((opt) => (
                <button 
                  key={opt}
                  onClick={() => { alert('Correto! +50 XP'); setShowCase(false); }}
                  className="w-full p-4 text-left border-2 border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all font-medium text-slate-600"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trilhas Rápidas */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:scale-95 transition-transform cursor-pointer">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                <BookOpen size={20} />
              </div>
              <p className="font-black text-slate-800">Psicologia</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">12 Casos</p>
           </div>
           <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:scale-95 transition-transform cursor-pointer">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
                <CheckCircle2 size={20} />
              </div>
              <p className="font-black text-slate-800">Pedagogia</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">08 Casos</p>
           </div>
        </div>
      </main>
    </div>
  );
}
