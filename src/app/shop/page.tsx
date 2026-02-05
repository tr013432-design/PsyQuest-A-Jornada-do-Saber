"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { ShoppingBag, Check, Zap, Sparkles, PackageOpen, GraduationCap, Brain, ShieldAlert } from 'lucide-react';
import { SHOP_ITEMS, ShopItem } from '../../lib/shopData';
import { CARDS_DATABASE, Card } from '../../lib/cardsData';

export default function Shop() {
  const [activeTab, setActiveTab] = useState<'packs' | 'skins'>('packs');
  const [xp, setXp] = useState(0);
  const [essence, setEssence] = useState(0);
  
  // Estado para Skins
  const [inventory, setInventory] = useState<string[]>(['skin_default']);
  const [equippedSkin, setEquippedSkin] = useState('skin_default');

  // Estado para Abertura de Pacotes
  const [openingPack, setOpeningPack] = useState<Card[] | null>(null);

  useEffect(() => {
    const savedXp = localStorage.getItem('psyquest_xp');
    const savedEssence = localStorage.getItem('psyquest_essence');
    const savedInv = localStorage.getItem('psyquest_inventory');
    const savedSkin = localStorage.getItem('psyquest_skin');

    if (savedXp) setXp(parseInt(savedXp));
    if (savedEssence) setEssence(parseInt(savedEssence));
    if (savedInv) setInventory(JSON.parse(savedInv));
    if (savedSkin) setEquippedSkin(savedSkin);
  }, []);

  // --- LÓGICA DE COMPRA DE SKINS ---
  const handleBuySkin = (item: ShopItem) => {
    if (xp >= item.cost) {
      const newXp = xp - item.cost;
      setXp(newXp);
      localStorage.setItem('psyquest_xp', newXp.toString());

      const newInv = [...inventory, item.id];
      setInventory(newInv);
      localStorage.setItem('psyquest_inventory', JSON.stringify(newInv));
    }
  };

  const handleEquipSkin = (itemId: string) => {
    setEquippedSkin(itemId);
    localStorage.setItem('psyquest_skin', itemId);
  };

  // --- LÓGICA DE COMPRA DE PACOTES ---
  const buyPack = (cost: number, filterSeries?: string) => {
    if (xp < cost) {
      alert("XP Insuficiente! Vá estudar mais.");
      return;
    }

    // 1. Debita XP
    const newXp = xp - cost;
    setXp(newXp);
    localStorage.setItem('psyquest_xp', newXp.toString());

    // 2. Sorteia 3 Cartas
    const pool = filterSeries 
      ? CARDS_DATABASE.filter(c => c.series === filterSeries)
      : CARDS_DATABASE;
    
    const drawnCards: Card[] = [];
    for(let i=0; i<3; i++) {
       const random = pool[Math.floor(Math.random() * pool.length)];
       drawnCards.push(random);
    }

    // 3. Processa Coleção (Salva novas, converte repetidas)
    const currentCollection = JSON.parse(localStorage.getItem('psyquest_cards') || '[]');
    let currentEssence = parseInt(localStorage.getItem('psyquest_essence') || '0');
    let newCollection = [...currentCollection];

    drawnCards.forEach(card => {
      if (newCollection.includes(card.id)) {
        // Repetida: Vira Essência
        currentEssence += card.disenchantValue;
      } else {
        // Nova: Adiciona
        newCollection.push(card.id);
      }
    });

    localStorage.setItem('psyquest_cards', JSON.stringify(newCollection));
    localStorage.setItem('psyquest_essence', currentEssence.toString());
    setEssence(currentEssence);

    // 4. Mostra Animação
    setOpeningPack(drawnCards);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] pb-28">
      
      {/* HUD Financeiro */}
      <div className="bg-white p-4 sticky top-0 z-20 shadow-sm border-b border-slate-100 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <ShoppingBag className="text-indigo-600" /> Loja
          </h1>
        </div>
        <div className="flex gap-2">
          <div className="bg-amber-50 px-3 py-1 rounded-full border border-amber-100 flex items-center gap-1">
            <Zap size={14} className="text-amber-500 fill-amber-500" />
            <span className="font-black text-amber-700 text-xs">{xp} XP</span>
          </div>
          <div className="bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 flex items-center gap-1">
            <Sparkles size={14} className="text-cyan-500 fill-cyan-500" />
            <span className="font-black text-cyan-700 text-xs">{essence}</span>
          </div>
        </div>
      </div>

      {/* Abas */}
      <div className="p-4 flex gap-2">
        <button 
          onClick={() => setActiveTab('packs')}
          className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all ${activeTab === 'packs' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-400'}`}
        >
          PACOTES
        </button>
        <button 
          onClick={() => setActiveTab('skins')}
          className={`flex-1 py-3 rounded-2xl font-black text-sm transition-all ${activeTab === 'skins' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-400'}`}
        >
          VISUAL
        </button>
      </div>

      {/* --- ABA DE PACOTES --- */}
      {activeTab === 'packs' && (
        <div className="px-4 space-y-4 animate-in slide-in-from-right-4">
           {/* Pacote Básico */}
           <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-slate-100 to-transparent"></div>
              <div className="relative z-10 flex items-center gap-4">
                 <div className="w-16 h-20 bg-slate-800 rounded-xl shadow-lg border-2 border-slate-600 flex items-center justify-center">
                    <PackageOpen className="text-white" />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-black text-slate-800">Pacote Standard</h3>
                    <p className="text-xs text-slate-400 mb-2">3 Cartas aleatórias de qualquer coleção.</p>
                    <button onClick={() => buyPack(200)} className="bg-indigo-600 text-white text-xs font-black px-4 py-2 rounded-lg shadow-indigo-200 shadow-md active:scale-95 transition-transform">
                       COMPRAR (200 XP)
                    </button>
                 </div>
              </div>
           </div>

           {/* Pacote Mestres */}
           <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-3xl shadow-sm border border-orange-100 relative overflow-hidden group">
              <div className="relative z-10 flex items-center gap-4">
                 <div className="w-16 h-20 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl shadow-lg border-2 border-white flex items-center justify-center">
                    <GraduationCap className="text-white" />
                 </div>
                 <div className="flex-1">
                    <div className="flex justify-between items-start">
                       <h3 className="font-black text-amber-900">Pacote Mestres</h3>
                       <span className="bg-orange-200 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded">SÓ TEÓRICOS</span>
                    </div>
                    <p className="text-xs text-amber-700/70 mb-2">Garante 3 cartas da série Mestres da Psicologia.</p>
                    <button onClick={() => buyPack(350, 'mestres')} className="bg-orange-500 text-white text-xs font-black px-4 py-2 rounded-lg shadow-orange-200 shadow-md active:scale-95 transition-transform">
                       COMPRAR (350 XP)
                    </button>
                 </div>
              </div>
           </div>

           {/* Pacote Técnicas */}
           <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-3xl shadow-sm border border-blue-100 relative overflow-hidden group">
              <div className="relative z-10 flex items-center gap-4">
                 <div className="w-16 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl shadow-lg border-2 border-white flex items-center justify-center">
                    <Brain className="text-white" />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-black text-blue-900">Pacote Clínico</h3>
                    <p className="text-xs text-blue-700/70 mb-2">Focado em Técnicas e Transtornos.</p>
                    <button onClick={() => buyPack(300, 'tecnicas')} className="bg-blue-500 text-white text-xs font-black px-4 py-2 rounded-lg shadow-blue-200 shadow-md active:scale-95 transition-transform">
                       COMPRAR (300 XP)
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* --- ABA DE SKINS --- */}
      {activeTab === 'skins' && (
        <div className="px-4 grid grid-cols-2 gap-4 animate-in slide-in-from-left-4">
           {SHOP_ITEMS.filter(i => i.type === 'skin').map((item) => {
              const isOwned = inventory.includes(item.id);
              const isEquipped = equippedSkin === item.id;
              
              return (
                <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                   <div className="w-20 h-20 mb-3">
                      <img src={item.image} className="w-full h-full object-contain" />
                   </div>
                   <h3 className="font-black text-slate-800 text-xs">{item.name}</h3>
                   
                   {isOwned ? (
                     <button 
                       onClick={() => handleEquipSkin(item.id)}
                       disabled={isEquipped}
                       className={`mt-2 w-full py-2 rounded-xl text-[10px] font-black ${isEquipped ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}
                     >
                       {isEquipped ? 'EQUIPADO' : 'EQUIPAR'}
                     </button>
                   ) : (
                     <button 
                       onClick={() => handleBuySkin(item)}
                       disabled={xp < item.cost}
                       className={`mt-2 w-full py-2 rounded-xl text-[10px] font-black ${xp >= item.cost ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'}`}
                     >
                       {item.cost} XP
                     </button>
                   )}
                </div>
              )
           })}
        </div>
      )}

      {/* --- MODAL DE ABERTURA DE PACOTE (O MOMENTO MÁGICO) --- */}
      {openingPack && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in">
           <h2 className="text-white font-black text-2xl mb-8 animate-bounce">PACOTE ABERTO!</h2>
           
           <div className="flex gap-4 mb-8 overflow-x-auto w-full justify-center px-4">
              {openingPack.map((card, idx) => (
                <div key={idx} className={`w-32 aspect-[3/4] bg-white rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-2xl transform transition-all hover:scale-110 animate-in zoom-in slide-in-from-bottom-${idx*4} duration-500`}>
                   <div className={`w-full flex-1 ${getBgColor(card.rarity)} rounded-lg mb-2 flex items-center justify-center`}>
                      <span className="text-2xl font-serif text-white">{card.name[0]}</span>
                   </div>
                   <p className="text-[10px] font-black uppercase leading-tight">{card.name}</p>
                   <span className={`text-[8px] uppercase font-bold mt-1 px-2 rounded-full text-white ${getBgColor(card.rarity)}`}>{card.rarity}</span>
                </div>
              ))}
           </div>

           <button 
             onClick={() => setOpeningPack(null)}
             className="bg-white text-indigo-900 px-8 py-3 rounded-full font-black text-sm hover:scale-105 transition-transform"
           >
             CONTINUAR
           </button>
        </div>
      )}

      <Navbar />
    </div>
  );
}

// Helpers
function getBgColor(rarity: string) {
  switch(rarity) {
    case 'legendary': return 'bg-yellow-500';
    case 'epic': return 'bg-purple-600';
    case 'rare': return 'bg-blue-500';
    default: return 'bg-slate-400';
  }
}
