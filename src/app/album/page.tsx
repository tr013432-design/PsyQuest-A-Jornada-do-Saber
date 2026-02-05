"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { CARDS_DATABASE, Card, CardSeries } from '../../lib/cardsData';
import { Book, Lock, Star, Filter, Hammer, Sparkles, Scroll, Brain, ShieldAlert, FlaskConical, History, GraduationCap } from 'lucide-react';

export default function Album() {
  const [collection, setCollection] = useState<string[]>([]);
  const [essence, setEssence] = useState(0);
  const [activeSeries, setActiveSeries] = useState<CardSeries>('mestres');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null); // Para o modal de Crafting

  useEffect(() => {
    const savedCards = localStorage.getItem('psyquest_cards');
    const savedEssence = localStorage.getItem('psyquest_essence');
    
    if (savedCards) setCollection(JSON.parse(savedCards));
    if (savedEssence) setEssence(parseInt(savedEssence));
  }, []);

  const craftCard = (card: Card) => {
    if (essence >= card.craftCost) {
      // Deduz essência
      const newEssence = essence - card.craftCost;
      setEssence(newEssence);
      localStorage.setItem('psyquest_essence', newEssence.toString());

      // Adiciona carta
      const newCollection = [...collection, card.id];
      setCollection(newCollection);
      localStorage.setItem('psyquest_cards', JSON.stringify(newCollection));
      
      setSelectedCard(null); // Fecha modal
      // Aqui entraria um som de "Crafting Success"
      alert(`Você forjou a carta: ${card.name}!`);
    }
  };

  // Filtra as cartas da série ativa
  const filteredCards = CARDS_DATABASE.filter(card => card.series === activeSeries);
  
  // Ícones para as abas
  const SeriesIcon = {
    mestres: GraduationCap,
    tecnicas: Brain,
    transtornos: FlaskConical,
    ferramentas: Filter,
    casos: History,
    etica: ShieldAlert,
    cosmeticos: Sparkles
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] pb-28">
      
      {/* HUD de Essência (Fixo no topo) */}
      <div className="bg-indigo-900 p-4 sticky top-0 z-20 shadow-lg flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Book size={20} className="text-amber-400" />
          <span className="font-serif font-black tracking-widest">GRIMÓRIO</span>
        </div>
        <div className="bg-indigo-800 px-3 py-1 rounded-full border border-indigo-600 flex items-center gap-2">
          <Sparkles size={14} className="text-cyan-400 fill-cyan-400 animate-pulse" />
          <span className="font-mono font-bold text-cyan-100">{essence} Essência</span>
        </div>
      </div>

      {/* Navegação de Séries (Scroll Horizontal) */}
      <div className="bg-white border-b border-slate-200 sticky top-[60px] z-10 overflow-x-auto">
        <div className="flex p-2 gap-2 min-w-max">
          {(Object.keys(SeriesIcon) as CardSeries[]).map((series) => {
            const Icon = SeriesIcon[series] || Book;
            const isActive = activeSeries === series;
            return (
              <button
                key={series}
                onClick={() => setActiveSeries(series)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap
                  ${isActive 
                    ? 'bg-indigo-600 text-white shadow-md transform scale-105' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}
                `}
              >
                <Icon size={14} />
                {series}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de Cartas */}
      <div className="max-w-md mx-auto p-4 grid grid-cols-2 gap-4 animate-in fade-in duration-500">
        {filteredCards.length === 0 && (
          <div className="col-span-2 text-center py-10 text-slate-400 text-sm">
            Em breve novos itens nesta série.
          </div>
        )}

        {filteredCards.map((card) => {
          const isOwned = collection.includes(card.id);
          const canCraft = essence >= card.craftCost;

          return (
            <button 
              key={card.id} 
              onClick={() => setSelectedCard(card)}
              className={`relative aspect-[3/4] rounded-2xl p-3 flex flex-col items-center text-center transition-all duration-300 group
                ${isOwned 
                  ? 'bg-white shadow-xl hover:-translate-y-1' 
                  : 'bg-slate-200 shadow-inner opacity-80'}
              `}
            >
              {/* Borda de Raridade */}
              <div className={`absolute inset-0 rounded-2xl border-4 ${isOwned ? getBorderColor(card.rarity) : 'border-slate-300'} pointer-events-none`}></div>

              {isOwned ? (
                <>
                  <div className={`w-full flex-1 rounded-xl ${getBgColor(card.rarity)} mb-3 shadow-inner flex items-center justify-center`}>
                     <span className="text-3xl font-serif text-white drop-shadow-md">{card.name[0]}</span>
                  </div>
                  <h3 className="font-black text-slate-800 text-[10px] uppercase mb-1 leading-tight">{card.name}</h3>
                  
                  {card.rarity === 'legendary' && <div className="absolute top-2 right-2"><Star size={12} className="text-yellow-400 fill-yellow-400" /></div>}
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                   <Lock size={24} className="text-slate-400 mb-2" />
                   {canCraft ? (
                     <div className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-bounce">
                       <Hammer size={10} /> FORJAR
                     </div>
                   ) : (
                     <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                       <Sparkles size={10} /> {card.craftCost}
                     </div>
                   )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* MODAL DE DETALHES / CRAFTING */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative">
            <button onClick={() => setSelectedCard(null)} className="absolute top-4 right-4 text-slate-300 hover:text-slate-600"><XCircle size={24}/></button>
            
            <div className={`w-20 h-20 mx-auto rounded-2xl ${getBgColor(selectedCard.rarity)} flex items-center justify-center mb-4 shadow-lg border-4 border-white`}>
              <span className="text-4xl font-serif text-white">{selectedCard.name[0]}</span>
            </div>

            <h2 className="text-2xl font-black text-slate-800 text-center mb-1">{selectedCard.name}</h2>
            <div className="flex justify-center gap-2 mb-4">
               <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-1 rounded uppercase font-bold tracking-wider">{selectedCard.series}</span>
               <span className={`text-[10px] px-2 py-1 rounded uppercase font-bold tracking-wider text-white ${getBgColor(selectedCard.rarity)}`}>{selectedCard.rarity}</span>
            </div>

            <p className="text-slate-500 text-center text-sm font-medium leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              "{selectedCard.description}"
            </p>

            {collection.includes(selectedCard.id) ? (
              <button disabled className="w-full bg-green-100 text-green-600 font-black py-3 rounded-xl flex items-center justify-center gap-2">
                <CheckCircle2 size={18} /> JÁ POSSUI
              </button>
            ) : (
              <button 
                onClick={() => craftCard(selectedCard)}
                disabled={essence < selectedCard.craftCost}
                className={`w-full font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all
                  ${essence >= selectedCard.craftCost 
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-200' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                `}
              >
                {essence >= selectedCard.craftCost ? (
                   <> <Hammer size={20} /> FORJAR POR {selectedCard.craftCost} </>
                ) : (
                   <> <Lock size={20} /> FALTA {selectedCard.craftCost - essence} ESSÊNCIA </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
}

// Auxiliares visuais
import { XCircle, CheckCircle2 } from 'lucide-react';

function getBorderColor(rarity: string) {
  switch(rarity) {
    case 'legendary': return 'border-yellow-400';
    case 'epic': return 'border-purple-500';
    case 'rare': return 'border-blue-400';
    default: return 'border-slate-100';
  }
}

function getBgColor(rarity: string) {
  switch(rarity) {
    case 'legendary': return 'bg-gradient-to-br from-yellow-400 to-orange-500';
    case 'epic': return 'bg-gradient-to-br from-purple-500 to-indigo-600';
    case 'rare': return 'bg-gradient-to-br from-blue-400 to-cyan-500';
    default: return 'bg-slate-400';
  }
}
