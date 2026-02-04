"use client";
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { CASOS_PSICOLOGIA } from '../lib/database';
import { Play, Star, CheckCircle2, XCircle, Trophy } from 'lucide-react';

export default function Home() {
  const [gameState, setGameState] = useState<'home' | 'playing' | 'feedback'>('home');
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  // Carrega o XP salvo ao abrir o app
  useEffect(() => {
    const savedXp = localStorage.getItem('psyquest_xp');
    if (savedXp) setXp(parseInt(savedXp));
  }, []);

  const handleAnswer = (index: number) => {
    const correct = index === CASOS_PSICOLOGIA[currentCaseIndex].correctIndex;
    setIsCorrect(correct);
    if (correct) {
      const newXp = xp + 50;
      setXp(newXp);
      localStorage.setItem('psyquest_xp', newXp.toString());
    }
    setGameState('feedback');
  };

  const nextCase = () => {
    setGameState('home');
    if (isCorrect) {
       setCurrentCaseIndex((prev) => (prev + 1) % CASOS_PSICOLOGIA.length);
    }
  };

  const currentCase = CASOS_PSICOLOGIA[currentCaseIndex];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-28">
      {/* Passamos o XP real para o Header */}
      <div className="bg-white border-b border-slate-100 p-4 sticky top-0 z-50">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black">1</div>
            <span className="font-black text-slate-800 text-sm">ESTUDANTE</span>
          </div>
          <div className="bg-amber-50 px-3 py-1 rounded-full border border-amber-100 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-black text-amber-700">{xp} XP</span>
          </div>
        </div>
      </div>
      
      <main className="max-w-md mx-auto p-5">
        {gameState === 'home' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl mb-8 relative overflow-hidden">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase">Caso {currentCase.id}</span>
              <h2 className="text-2xl font-black mt-4 mb-2 italic">{currentCase.title}</h2>
              <p className="text-indigo-100 text-sm mb-8 leading-relaxed">{currentCase.context}</p>
              <button onClick={() => setGameState('playing')} className="w-full bg-white text-indigo-600 font-black py-5 rounded-2xl shadow-[0_6px_0_#CBD5E1] active:translate-y-1 active:shadow-none transition-all">
                ESTUDAR AGORA
              </button>
            </div>
            
            <h3 className="font-black text-slate-400 uppercase text-xs tracking-widest mb-4">Suas Trilhas</h3>
            <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg"><Star size={20}/></div>
               <div>
                 <h4 className="font-black text-slate-800">Psicologia Clínica</h4>
                 <p className="text-[10px] font-bold text-slate-400 uppercase italic">{CASOS_PSICOLOGIA.length} Casos Disponíveis</p>
               </div>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="bg-white rounded-[2.5rem] p-8 border-2 border-indigo-100 shadow-xl animate-in zoom-in-95 duration-300">
            <h2 className="text-xl font-black text-slate-800 mb-8">{currentCase.question}</h2>
            <div className="space-y-3">
              {currentCase.options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(i)} className="w-full p-5 text-left border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'feedback' && (
          <div className="text-center py-10 animate-in fade-in duration-500">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isCorrect ? 'bg-green-500' : 'bg-rose-500'} shadow-lg`}>
              {isCorrect ? <CheckCircle2 size={40} color="white" /> : <XCircle size={40} color="white" />}
            </div>
            <h2 className={`text-3xl font-black mb-4 ${isCorrect ? 'text-green-600' : 'text-rose-600'}`}>
              {isCorrect ? 'EXCELENTE!' : 'FOI QUASE!'}
            </h2>
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 mb-8 text-slate-600 font-medium">
              {currentCase.explanation}
            </div>
            <button onClick={nextCase} className="bg-indigo-600 text-white font-black px-12 py-4 rounded-2xl shadow-lg">
              {isCorrect ? 'PRÓXIMO CASO' : 'TENTAR NOVAMENTE'}
            </button>
          </div>
        )}
      </main>
      <Navbar />
    </div>
  );
}
