"use client";
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { CASOS_PSICOLOGIA } from '../lib/database';
import { Play, Star, CheckCircle2, XCircle, Trophy, Sparkles, Loader2 } from 'lucide-react';

export default function Home() {
  // --- ESTADOS DO JOGO (Aqui definimos as variáveis que faltavam) ---
  const [gameState, setGameState] = useState<'home' | 'playing' | 'feedback'>('home');
  const [xp, setXp] = useState(0);
  const [loadingAI, setLoadingAI] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Estado do Caso Ativo (Começa com o primeiro do banco, mas muda com a IA)
  const [activeCase, setActiveCase] = useState<any>(CASOS_PSICOLOGIA[0]);

  // Carrega XP salvo no celular do usuário
  useEffect(() => {
    const savedXp = localStorage.getItem('psyquest_xp');
    if (savedXp) setXp(parseInt(savedXp));
  }, []);

  // --- FUNÇÃO QUE CHAMA A IA ---
  const generateNewCase = async () => {
    setLoadingAI(true);
    try {
      const response = await fetch('/api/generate', { method: 'POST' });
      const newCase = await response.json();
      setActiveCase(newCase);
    } catch (error) {
      alert("Erro ao gerar caso. Tente novamente.");
    } finally {
      setLoadingAI(false);
    }
  };

  // --- LÓGICA DE RESPOSTA ---
  const handleAnswer = (index: number) => {
    // Verifica se o índice clicado é igual ao índice correto do caso ativo
    const correct = index === activeCase.correctIndex;
    setIsCorrect(correct);
    
    if (correct) {
      const newXp = xp + 50;
      setXp(newXp);
      localStorage.setItem('psyquest_xp', newXp.toString());
    }
    setGameState('feedback');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-28">
      {/* Header Personalizado */}
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
            
            {/* BOTÃO DA IA - O "Pulo do Gato" */}
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

            {/* Card do Caso Ativo (Dinâmico) */}
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
            
            {/* Lista de Trilhas */}
            <h3 className="font-black text-slate-400 uppercase text-xs tracking-widest mb-4">Suas Trilhas</h3>
            <div className="bg-white p-5 rounded-3xl border-2 border-slate-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg"><Star size={20}/></div>
               <div>
                 <h4 className="font-black text-slate-800">Psicologia Clínica</h4>
                 <p className="text-[10px] font-bold text-slate-400 uppercase italic">Banco de Dados Ativo</p>
               </div>
            </div>
          </div>
        )}

        {/* Tela de Jogo */}
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

        {/* Tela de Feedback */}
        {gameState === 'feedback' && (
           <div className="text-center py-10 animate-in fade-in duration-500">
             <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isCorrect ? 'bg-green-500' : 'bg-rose-500'} shadow-lg`}>
               {isCorrect ? <CheckCircle2 size={40} color="white" /> : <XCircle size={40} color="white" />}
             </div>
             <h2 className={`text-3xl font-black mb-4 ${isCorrect ? 'text-green-600' : 'text-rose-600'}`}>
               {isCorrect ? 'EXCELENTE!' : 'FOI QUASE!'}
             </h2>
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
