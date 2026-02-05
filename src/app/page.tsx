"use client";
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { CASOS_PSICOLOGIA } from '../lib/database';
import { Play, Star, CheckCircle2, XCircle, Trophy, Sparkles, Loader2, Heart, Flame, ArrowRight } from 'lucide-react';

export default function Home() {
  // --- ESTADOS DO JOGO ---
  const [gameState, setGameState] = useState<'home' | 'playing' | 'feedback'>('home');
  const [xp, setXp] = useState(0);
  const [loadingAI, setLoadingAI] = useState(false);
  const [activeCase, setActiveCase] = useState<any>(CASOS_PSICOLOGIA[0]);
  
  // --- NOVOS ESTADOS DE GAMIFICAÇÃO ---
  const [lives, setLives] = useState(5); // Sistema de Vidas
  const [combo, setCombo] = useState(0); // Sistema de Combo
  const [animationClass, setAnimationClass] = useState(''); // Controla o visual (shake/pop)
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Carrega XP salvo
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
      // Fallback silencioso se der erro na IA
      setActiveCase(CASOS_PSICOLOGIA[Math.floor(Math.random() * CASOS_PSICOLOGIA.length)]);
    } finally {
      setLoadingAI(false);
    }
  };

  // --- LÓGICA DE RESPOSTA ---
  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    const isCorrect = index === activeCase.correctIndex;
    
    // 1. Efeito Visual Imediato
    if (isCorrect) {
      setAnimationClass('animate-pop');
      const newCombo = combo + 1;
      setCombo(newCombo);
      
      // Bônus por combo
      const comboBonus = newCombo > 2 ? 20 : 0;
      const newXp = xp + 50 + comboBonus;
      
      setXp(newXp);
      localStorage.setItem('psyquest_xp', newXp.toString());
    } else {
      setAnimationClass('animate-shake');
      setCombo(0); // Reseta combo
      setLives((prev) => Math.max(0, prev - 1)); // Perde vida
    }

    // 2. Espera a animação acabar para mostrar o feedback
    setTimeout(() => {
      setGameState('feedback');
      setAnimationClass('');
    }, 600);
  };

  // Reiniciar Jogo se perder vidas
  const resetGame = () => {
    setLives(5);
    setGameState('home');
    setCombo(0);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] pb-28 font-sans selection:bg-indigo-100">
      {/* Header Fixo */}
      <Header />
      
      <main className="max-w-md mx-auto p-5">
        
        {/* --- TELA INICIAL (DASHBOARD) --- */}
        {gameState === 'home' && (
          <div className="animate-slide-up space-y-6">
            
            {/* Status de Vidas e Combo */}
            <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 text-rose-500 font-black">
                <Heart className="fill-rose-500 animate-pulse" size={24} />
                <span className="text-xl">{lives}</span>
              </div>
              <div className="flex items-center gap-2 text-orange-500 font-black">
                <Flame className={`${combo > 0 ? 'fill-orange-500' : 'text-slate-300'}`} size={24} />
                <span className="text-xl">{combo}x</span>
              </div>
            </div>

            {/* CARD PRINCIPAL (Estilo Cartão de Jogo) */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-1 shadow-2xl shadow-indigo-200 transform transition-all hover:scale-[1.02]">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.4rem] p-8 text-white relative overflow-hidden">
                {/* Efeito de fundo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-500/50 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-white/20 shadow-sm backdrop-blur-sm">
                    {activeCase.isGenerated ? '✨ IA Gerada' : '🔥 Desafio Diário'}
                  </span>
                  {loadingAI && <Loader2 className="animate-spin text-white opacity-50" />}
                </div>

                <h2 className="text-3xl font-black mb-3 leading-tight tracking-tight drop-shadow-md">
                  {activeCase.title}
                </h2>
                <p className="text-indigo-100 text-sm mb-8 leading-relaxed font-medium opacity-90 min-h-[60px]">
                   {loadingAI ? 'Analisando banco de dados...' : activeCase.context}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setGameState('playing')}
                    disabled={lives === 0 || loadingAI}
                    className="col-span-2 bg-white text-indigo-700 font-black py-4 rounded-2xl shadow-[0_4px_0_#c7d2fe] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 text-lg hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {lives > 0 ? 'JOGAR' : 'SEM VIDAS'} <Play size={20} fill="currentColor" />
                  </button>
                  
                  <button 
                    onClick={generateNewCase}
                    className="col-span-2 bg-indigo-800/40 text-indigo-100 font-bold py-3 rounded-xl hover:bg-indigo-800/60 transition-colors text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-white/10"
                  >
                    <Sparkles size={14} /> Gerar Novo Caso
                  </button>
                </div>
              </div>
            </div>

            {/* TRILHAS (Estilo Botões Grandes) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-3xl border-b-4 border-slate-100 active:border-b-0 active:translate-y-1 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                  <Star size={24} fill="currentColor" />
                </div>
                <h3 className="font-black text-slate-700">Psicologia</h3>
                <p className="text-xs text-slate-400 font-bold">Nível 1</p>
              </div>
              <div className="bg-white p-5 rounded-3xl border-b-4 border-slate-100 active:border-b-0 active:translate-y-1 transition-all cursor-pointer opacity-50 grayscale">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                  <Trophy size={24} fill="currentColor" />
                </div>
                <h3 className="font-black text-slate-700">Pedagogia</h3>
                <p className="text-xs text-slate-400 font-bold">Bloqueado</p>
              </div>
            </div>
          </div>
        )}

        {/* --- TELA DE GAMEPLAY (QUIZ SHOW) --- */}
        {gameState === 'playing' && (
          <div className="animate-slide-up">
            {/* Barra de Progresso do Caso */}
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setGameState('home')} className="text-slate-400 hover:text-slate-600 font-bold text-xs uppercase">Sair</button>
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[80%] rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center gap-1 text-rose-500 font-black">
                <Heart size={16} fill="currentColor" /> {lives}
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border-b-8 border-slate-100 shadow-sm mb-6">
              <h2 className="text-xl font-black text-slate-800 mb-6 leading-tight">
                {activeCase.question}
              </h2>
              <div className="space-y-3">
                {activeCase.options.map((opt: string, i: number) => (
                  <button 
                    key={i} 
                    onClick={() => handleAnswer(i)}
                    disabled={selectedOption !== null}
                    className={`w-full p-5 text-left border-2 rounded-2xl font-bold transition-all transform active:scale-95 duration-200
                      ${selectedOption === i ? animationClass : 'border-slate-100 text-slate-600 hover:border-indigo-400 hover:bg-indigo-50'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-black
                        ${selectedOption === i ? 'border-transparent bg-indigo-600 text-white' : 'border-slate-200 text-slate-400'}
                      `}>
                        {['A', 'B', 'C', 'D'][i]}
                      </div>
                      {opt}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TELA DE FEEDBACK (RESULTADO) --- */}
        {gameState === 'feedback' && (
          <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
             <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
                
                {/* Efeito de Fundo */}
                <div className={`absolute top-0 left-0 w-full h-2 ${selectedOption === activeCase.correctIndex ? 'bg-green-500' : 'bg-rose-500'}`}></div>

                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white
                  ${selectedOption === activeCase.correctIndex ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'}
                `}>
                  {selectedOption === activeCase.correctIndex ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
                </div>

                <h2 className={`text-3xl font-black mb-2 uppercase tracking-tight
                  ${selectedOption === activeCase.correctIndex ? 'text-green-600' : 'text-rose-600'}
                `}>
                  {selectedOption === activeCase.correctIndex ? 'Fantástico!' : 'Que pena!'}
                </h2>
                
                {selectedOption === activeCase.correctIndex && combo > 1 && (
                  <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-black uppercase mb-4 animate-bounce">
                    🔥 Combo {combo}x (+20 XP)
                  </div>
                )}

                <div className="bg-slate-50 p-5 rounded-2xl text-slate-600 font-medium text-sm leading-relaxed mb-8 border border-slate-100 text-left">
                  <span className="block text-xs font-black text-slate-400 uppercase mb-2">Explicação Pedagógica:</span>
                  {activeCase.explanation}
                </div>

                <button 
                  onClick={() => {
                    setGameState('home');
                    setSelectedOption(null);
                    setAnimationClass('');
                    if (lives === 0) resetGame();
                  }} 
                  className={`w-full font-black py-4 rounded-2xl shadow-lg active:translate-y-1 transition-all flex items-center justify-center gap-2
                    ${lives === 0 ? 'bg-slate-800 text-white' : 'bg-indigo-600 text-white shadow-indigo-200'}
                  `}
                >
                  {lives === 0 ? 'REINICIAR TUDO' : 'CONTINUAR'} <ArrowRight size={20} />
                </button>
             </div>
          </div>
        )}
      </main>
      <Navbar />
    </div>
  );
}
