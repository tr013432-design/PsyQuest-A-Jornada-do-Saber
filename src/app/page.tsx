"use client";
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { CASOS_PSICOLOGIA } from '../lib/database';
import { CARDS_DATABASE } from '../lib/cardsData'; // IMPORTANTE: Importamos o banco de cartas
import { Play, Star, CheckCircle2, XCircle, Sparkles, Loader2, Heart, Flame, ArrowRight, Brain, Volume2, VolumeX } from 'lucide-react';

export default function Home() {
  const [gameState, setGameState] = useState<'home' | 'playing' | 'feedback'>('home');
  const [xp, setXp] = useState(0);
  const [loadingAI, setLoadingAI] = useState(false);
  const [activeCase, setActiveCase] = useState<any>(CASOS_PSICOLOGIA[0]);
  
  const [lives, setLives] = useState(5);
  const [combo, setCombo] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // --- REFERÊNCIAS DE ÁUDIO ---
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const correctAudioRef = useRef<HTMLAudioElement>(null);
  const wrongAudioRef = useRef<HTMLAudioElement>(null);

  const playSound = (type: 'click' | 'correct' | 'wrong') => {
    if (!soundEnabled) return;
    
    if (clickAudioRef.current) { clickAudioRef.current.pause(); clickAudioRef.current.currentTime = 0; }
    if (correctAudioRef.current) { correctAudioRef.current.pause(); correctAudioRef.current.currentTime = 0; }
    if (wrongAudioRef.current) { wrongAudioRef.current.pause(); wrongAudioRef.current.currentTime = 0; }

    try {
      if (type === 'click' && clickAudioRef.current) clickAudioRef.current.play();
      if (type === 'correct' && correctAudioRef.current) correctAudioRef.current.play();
      if (type === 'wrong' && wrongAudioRef.current) wrongAudioRef.current.play();
    } catch (e) {
      console.log("Erro de áudio:", e);
    }
  };

  useEffect(() => {
    const savedXp = localStorage.getItem('psyquest_xp');
    if (savedXp) setXp(parseInt(savedXp));
  }, []);

  const generateNewCase = async () => {
    playSound('click');
    setLoadingAI(true);
    try {
      const response = await fetch('/api/generate', { method: 'POST' });
      const newCase = await response.json();
      setActiveCase(newCase);
    } catch (error) {
      setActiveCase(CASOS_PSICOLOGIA[Math.floor(Math.random() * CASOS_PSICOLOGIA.length)]);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    const correct = index === activeCase.correctIndex;
    setIsCorrect(correct);
    
    if (correct) {
      playSound('correct');
      setCombo(combo + 1);
      
      // 1. ATUALIZA XP
      const newXp = xp + 50 + (combo * 10);
      setXp(newXp);
      localStorage.setItem('psyquest_xp', newXp.toString());

      // 2. LÓGICA DE DROP DE CARTAS (NOVIDADE)
      // 30% de chance de ganhar uma carta ao acertar
      if (Math.random() < 0.3) {
        const randomCard = CARDS_DATABASE[Math.floor(Math.random() * CARDS_DATABASE.length)];
        
        // Lê o que o usuário já tem
        const currentCollection = JSON.parse(localStorage.getItem('psyquest_cards') || '[]');
        const currentEssence = parseInt(localStorage.getItem('psyquest_essence') || '0');

        if (currentCollection.includes(randomCard.id)) {
          // CARTA REPETIDA -> VIRA ESSÊNCIA
          const essenceGain = randomCard.disenchantValue;
          const newEssence = currentEssence + essenceGain;
          localStorage.setItem('psyquest_essence', newEssence.toString());
          
          // Pequeno delay para o alerta não atropelar o som
          setTimeout(() => {
            alert(`♻️ CARTA REPETIDA: ${randomCard.name}\nConvertida em +${essenceGain} Essência!`);
          }, 500);
          
        } else {
          // CARTA NOVA -> ADICIONA AO ÁLBUM
          const newCollection = [...currentCollection, randomCard.id];
          localStorage.setItem('psyquest_cards', JSON.stringify(newCollection));
          
          setTimeout(() => {
            alert(`🎉 CARTA NOVA DESBLOQUEADA!\n${randomCard.name} (${randomCard.rarity.toUpperCase()})`);
          }, 500);
        }
      }

    } else {
      playSound('wrong');
      setCombo(0);
      setLives((prev) => Math.max(0, prev - 1));
    }
    setGameState('feedback');
  };

  const nextCase = () => {
    playSound('click');
    setGameState('home');
    setSelectedOption(null);
    setIsCorrect(null);
    if (lives === 0) {
      setLives(5);
      setCombo(0);
    }
  };

  return (
    <div className="min-h-screen pb-32 text-slate-800">
      {/* --- ELEMENTOS DE ÁUDIO INVISÍVEIS --- */}
      <audio ref={clickAudioRef} src="/sons/click.mp3" preload="auto" />
      <audio ref={correctAudioRef} src="/sons/correct.mp3" preload="auto" />
      <audio ref={wrongAudioRef} src="/sons/wrong.mp3" preload="auto" />

      <Header />
      
      <main className="max-w-md mx-auto p-4 pt-6">
        
        {/* HUD e Controles */}
        {gameState === 'home' && (
          <div className="flex justify-between items-center mb-8 px-2">
            <div className="flex gap-2">
               <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-2 text-white shadow-lg">
                 <Heart className="fill-rose-500 text-rose-500 animate-pulse" size={24} />
                 <span className="font-black text-xl">{lives}</span>
               </div>
               <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-2 text-white shadow-lg">
                 <Flame className={`${combo > 1 ? 'fill-orange-500 text-orange-500 animate-bounce' : 'text-slate-400'}`} size={24} />
                 <span className="font-black text-xl">{combo}x</span>
               </div>
            </div>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className="bg-white/10 p-3 rounded-full text-white backdrop-blur-md hover:bg-white/20">
               {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} className="text-rose-400" />}
            </button>
          </div>
        )}

        {/* TELA HOME */}
        {gameState === 'home' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
            <div className="relative group">
              <div className="absolute top-4 left-4 right-4 h-full bg-purple-500 rounded-[2.5rem] rotate-3 opacity-60 scale-95 -z-10 transition-transform group-hover:rotate-6"></div>
              <div className="absolute top-2 left-2 right-2 h-full bg-indigo-500 rounded-[2.5rem] -rotate-2 opacity-80 scale-95 -z-10 transition-transform group-hover:-rotate-3"></div>
              
              <div className="bg-white rounded-[2.5rem] p-1.5 shadow-2xl border-b-8 border-slate-200">
                <div className="bg-gradient-to-b from-indigo-50 to-white rounded-[2.2rem] p-6 text-center relative overflow-hidden">
                  <div className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-200">
                    {activeCase.isGenerated ? <Sparkles size={12}/> : <Brain size={12}/>}
                    {activeCase.isGenerated ? 'Gerado por IA' : 'Caso Oficial'}
                  </div>

                  <h2 className="text-3xl font-black text-slate-800 mb-3 leading-tight">
                    {activeCase.title}
                  </h2>
                  <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8 line-clamp-3">
                    {loadingAI ? "A IA está criando um caso único para você..." : activeCase.context}
                  </p>

                  <button 
                    onClick={() => { playSound('click'); setGameState('playing'); }}
                    disabled={loadingAI || lives === 0}
                    className="btn-3d w-full bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-800 p-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                  >
                    <span className="text-xl font-black tracking-wide">
                      {lives > 0 ? 'COMEÇAR MISSÃO' : 'SEM VIDAS'}
                    </span>
                    <Play size={24} fill="currentColor" />
                  </button>

                  <button onClick={generateNewCase} className="mt-4 text-indigo-400 text-xs font-black uppercase tracking-widest hover:text-indigo-600 flex items-center justify-center gap-1 mx-auto transition-colors">
                    {loadingAI ? <Loader2 className="animate-spin w-3 h-3"/> : <Sparkles className="w-3 h-3" />} Gerar Outro Caso
                  </button>
                </div>
              </div>
            </div>

            <h3 className="text-white/80 font-black uppercase text-sm tracking-widest pl-4">Suas Trilhas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div onClick={() => playSound('click')} className="btn-3d bg-white border-slate-200 p-4 rounded-3xl flex flex-col items-center gap-2 cursor-pointer active:scale-95">
                <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center"><Brain size={24} /></div>
                <span className="font-black text-slate-700">Psicologia</span>
              </div>
              <div onClick={() => playSound('click')} className="btn-3d bg-white border-slate-200 p-4 rounded-3xl flex flex-col items-center gap-2 cursor-pointer active:scale-95 grayscale opacity-60">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-2xl flex items-center justify-center"><Star size={24} /></div>
                <span className="font-black text-slate-700">Pedagogia</span>
              </div>
            </div>
          </div>
        )}

        {/* TELA DE JOGO */}
        {gameState === 'playing' && (
          <div className="animate-in zoom-in-95 duration-300">
             <div className="flex items-center gap-4 mb-8">
                <button onClick={() => { playSound('click'); setGameState('home'); }} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white backdrop-blur-sm"><XCircle size={20} /></button>
                <div className="flex-1 h-4 bg-slate-900/30 rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 w-2/3 rounded-full animate-pulse"></div>
                </div>
             </div>
             <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border-b-8 border-slate-200 min-h-[50vh] flex flex-col justify-between">
                <div>
                  <span className="text-indigo-500 font-black text-xs uppercase tracking-widest mb-4 block">Pergunta do Caso</span>
                  <h2 className="text-2xl font-black text-slate-800 leading-tight mb-8">{activeCase.question}</h2>
                </div>
                <div className="space-y-3">
                  {activeCase.options.map((opt: string, i: number) => (
                    <button key={i} onClick={() => handleAnswer(i)} className="btn-3d w-full bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-600 font-bold p-5 rounded-2xl text-left flex items-center gap-4 group active:border-indigo-500">
                      <div className="w-8 h-8 rounded-lg bg-white border-2 border-slate-200 flex items-center justify-center font-black text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">{['A', 'B', 'C', 'D'][i]}</div>
                      <span className="flex-1">{opt}</span>
                    </button>
                  ))}
                </div>
             </div>
          </div>
        )}

        {/* TELA DE FEEDBACK */}
        {gameState === 'feedback' && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
             <div className={`w-full max-w-sm bg-white rounded-[2.5rem] p-8 text-center shadow-2xl animate-in slide-in-from-bottom-10 ${isCorrect ? 'border-b-8 border-green-200' : 'border-b-8 border-rose-200'}`}>
                <div className={`w-24 h-24 mx-auto -mt-20 rounded-full flex items-center justify-center border-8 border-[#f3f4f6] shadow-xl mb-6 ${isCorrect ? 'bg-green-500 text-white' : 'bg-rose-500 text-white'}`}>
                  {isCorrect ? <CheckCircle2 size={48} className="animate-bounce" /> : <XCircle size={48} className="animate-pulse" />}
                </div>
                <h2 className={`text-3xl font-black mb-2 uppercase italic ${isCorrect ? 'text-green-600' : 'text-rose-600'}`}>{isCorrect ? 'Brilhante!' : 'Ops!'}</h2>
                <p className="text-slate-500 font-bold text-sm mb-6 px-4">{isCorrect ? `Você ganhou +${50 + (combo * 10)} XP! Continue o combo!` : 'Não desanime. Analise o feedback abaixo:'}</p>
                <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100 mb-8">
                  <div className="flex items-center gap-2 mb-2 text-indigo-600 font-black text-xs uppercase tracking-widest"><Brain size={14} /> Explicação</div>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">{activeCase.explanation}</p>
                </div>
                <button onClick={nextCase} className={`btn-3d w-full p-4 rounded-2xl font-black text-white flex items-center justify-center gap-2 ${isCorrect ? 'bg-green-500 border-green-700 hover:bg-green-400' : 'bg-slate-800 border-slate-950 hover:bg-slate-700'}`}>
                  {isCorrect ? 'CONTINUAR' : 'TENTAR OUTRO'} <ArrowRight size={20} />
                </button>
             </div>
          </div>
        )}
      </main>
      <Navbar />
    </div>
  );
}
