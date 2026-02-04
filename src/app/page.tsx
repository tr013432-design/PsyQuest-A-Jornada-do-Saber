"use client";
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { CASOS_PSICOLOGIA } from '../lib/database';
import { Play, Star, CheckCircle2, XCircle, Trophy, Sparkles, Loader2 } from 'lucide-react'; // Adicionei ícones novos

export default function Home() {
  // ... seus estados anteriores (gameState, xp, etc) ...
  const [loadingAI, setLoadingAI] = useState(false);
  const [activeCase, setActiveCase] = useState<any>(CASOS_PSICOLOGIA[0]);

  // Função que conecta com a API que acabamos de criar
  const generateNewCase = async () => {
    setLoadingAI(true);
    try {
      const response = await fetch('/api/generate', { method: 'POST' });
      const newCase = await response.json();
      setActiveCase(newCase); // Atualiza o caso na tela
    } catch (error) {
      alert("Erro ao gerar caso. Tente novamente.");
    } finally {
      setLoadingAI(false);
    }
  };

  // ... (Mantenha o useEffect do XP) ...

  // Atualize o handleAnswer para usar o activeCase em vez de CASOS_PSICOLOGIA[index]
  const handleAnswer = (index: number) => {
    const correct = index === activeCase.correctIndex; // Mudança aqui
    // ... resto da lógica igual ...
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-28">
      {/* ... Header ... */}
      
      <main className="max-w-md mx-auto p-5">
        {gameState === 'home' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            
            {/* BOTÃO DA IA - NOVIDADE */}
            <div className="flex justify-end mb-4">
              <button 
                onClick={generateNewCase}
                disabled={loadingAI}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-200 transition-all disabled:opacity-50"
              >
                {loadingAI ? <Loader2 className="animate-spin w-4 h-4"/> : <Sparkles className="w-4 h-4" />}
                {loadingAI ? 'Criando...' : 'Gerar Caso IA'}
              </button>
            </div>

            {/* Card do Caso (Agora dinâmico com activeCase) */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl mb-8 relative overflow-hidden transition-all">
              <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-white/10">
                {activeCase.isGenerated ? '✨ Caso Gerado por IA' : 'Caso Curado'}
              </span>
              <h2 className="text-2xl font-black mt-4 mb-2 italic">{activeCase.title}</h2>
              <p className="text-indigo-100 text-sm mb-8 leading-relaxed min-h-[60px]">
                {loadingAI ? 'Consultando banco de dados psicopedagógicos...' : activeCase.context}
              </p>
              <button 
                onClick={() => setGameState('playing')}
                disabled={loadingAI}
                className="w-full bg-white text-indigo-600 font-black py-5 rounded-2xl shadow-[0_6px_0_#CBD5E1] active:translate-y-1 active:shadow-none transition-all disabled:scale-100 disabled:shadow-none"
              >
                {loadingAI ? 'AGUARDE...' : 'ESTUDAR AGORA'}
              </button>
            </div>
            
            {/* ... Resto das trilhas ... */}
          </div>
        )}

        {/* ... Telas de Playing e Feedback (Atualize para usar activeCase) ... */}
        {gameState === 'playing' && (
          <div className="bg-white rounded-[2.5rem] p-8 border-2 border-indigo-100 shadow-xl animate-in zoom-in-95 duration-300">
             <h2 className="text-xl font-black text-slate-800 mb-8">{activeCase.question}</h2>
             <div className="space-y-3">
               {activeCase.options.map((opt: string, i: number) => (
                 <button key={i} onClick={() => handleAnswer(i)} className="w-full p-5 text-left border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                   {opt}
                 </button>
               ))}
             </div>
          </div>
        )}

        {gameState === 'feedback' && (
           /* ... Use activeCase.explanation aqui ... */
           <div className="text-center py-10 animate-in fade-in duration-500">
             {/* ... Ícones de check/erro ... */}
             <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 mb-8 text-slate-600 font-medium text-sm">
               {activeCase.explanation}
             </div>
             <button onClick={() => { setGameState('home'); }} className="bg-indigo-600 text-white font-black px-12 py-4 rounded-2xl shadow-lg">
               VOLTAR
             </button>
           </div>
        )}
      </main>
      <Navbar />
    </div>
  );
}
