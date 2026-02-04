"use client";
import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { BookOpen, Play, Star, CheckCircle2, XCircle } from 'lucide-react';

export default function Home() {
  const [gameState, setGameState] = useState<'home' | 'playing' | 'feedback'>('home');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (correct: boolean) => {
    setIsCorrect(correct);
    setGameState('feedback');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-28">
      <Header />
      
      <main className="max-w-md mx-auto p-5">
        {/* Lógica de Troca de Telas */}
        {gameState === 'home' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <section className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden mb-8">
              <div className="relative z-10">
                <span className="bg-white/20 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-white/30">Caso do Dia</span>
                <h2 className="text-2xl font-black mt-4 mb-2 italic">Dificuldade de Alfabetização</h2>
                <p className="text-indigo-100 text-sm mb-8 leading-relaxed opacity-90">Lucas, 7 anos, apresenta inversão de letras. Qual a conduta inicial?</p>
                <button 
                  onClick={() => setGameState('playing')}
                  className="w-full bg-white text-indigo-600 font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_6px_0_#CBD5E1] active:translate-y-1 active:shadow-none transition-all"
                >
                  ESTUDAR AGORA <Play size={18} fill="currentColor" />
                </button>
              </div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            </section>

            <h3 className="text-slate-800 font-black text-lg mb-4 italic uppercase tracking-tighter">Explorar Trilhas</h3>
            <div className="grid grid-cols-1 gap-4">
              <TrilhaCard title="Psicologia" cases="12" color="bg-blue-500" icon={<BookOpen size={20}/>} />
              <TrilhaCard title="Pedagogia" cases="08" color="bg-emerald-500" icon={<CheckCircle2 size={20}/>} />
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="animate-in zoom-in-95 duration-300">
             <div className="bg-white rounded-[2.5rem] p-8 border-2 border-indigo-100 shadow-xl">
                <div className="flex items-center gap-2 text-indigo-500 font-black text-xs uppercase mb-6">
                   <Star size={14} className="fill-indigo-500" /> Desafio Prático
                </div>
                <h2 className="text-xl font-black text-slate-800 mb-8 leading-tight">
                   Qual o instrumento mais adequado para iniciar a investigação com a família?
                </h2>
                <div className="space-y-4">
                   <OptionButton text="Anamnese detalhada" onClick={() => handleAnswer(true)} />
                   <OptionButton text="Aplicação imediata de TDE" onClick={() => handleAnswer(false)} />
                   <OptionButton text="Encaminhamento médico" onClick={() => handleAnswer(false)} />
                </div>
             </div>
          </div>
        )}

        {gameState === 'feedback' && (
          <div className="animate-in fade-in zoom-in duration-500 text-center py-12">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${isCorrect ? 'bg-green-500 shadow-green-200' : 'bg-rose-500 shadow-rose-200'}`}>
              {isCorrect ? <CheckCircle2 size={48} color="white" /> : <XCircle size={48} color="white" />}
            </div>
            <h2 className={`text-3xl font-black mb-2 ${isCorrect ? 'text-green-600' : 'text-rose-600'}`}>
              {isCorrect ? 'MUITO BEM!' : 'QUASE LÁ!'}
            </h2>
            <p className="text-slate-500 font-bold mb-8 px-8">
              {isCorrect ? 'Você ganhou +50 XP e 10 Moedas de Ouro.' : 'A anamnese é essencial para entender o histórico do desenvolvimento.'}
            </p>
            <button 
              onClick={() => setGameState('home')}
              className="bg-slate-800 text-white font-black px-12 py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
            >
              CONTINUAR
            </button>
          </div>
        )}
      </main>

      <Navbar />
    </div>
  );
}

function OptionButton({ text, onClick }: { text: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="w-full p-5 text-left border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex justify-between items-center group"
    >
      {text}
      <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-indigo-500"></div>
    </button>
  );
}

function TrilhaCard({ title, cases, color, icon }: any) {
  return (
    <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 flex items-center gap-4 hover:border-indigo-200 transition-colors cursor-pointer group">
      <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg`}>{icon}</div>
      <div>
        <h4 className="font-black text-slate-800">{title}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{cases} Casos Ativos</p>
      </div>
    </div>
  );
}
