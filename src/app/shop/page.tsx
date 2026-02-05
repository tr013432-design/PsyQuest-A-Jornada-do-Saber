"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { ShoppingBag, Lock, Check, Zap } from 'lucide-react';
import { SHOP_ITEMS, ShopItem } from '../../lib/shopData';

export default function Shop() {
  const [xp, setXp] = useState(0);
  const [inventory, setInventory] = useState<string[]>(['skin_default']); // Itens que o usuário tem
  const [equippedSkin, setEquippedSkin] = useState('skin_default');

  // 1. CARREGAR DADOS AO ABRIR
  useEffect(() => {
    const savedXp = localStorage.getItem('psyquest_xp');
    const savedInv = localStorage.getItem('psyquest_inventory');
    const savedSkin = localStorage.getItem('psyquest_skin');

    if (savedXp) setXp(parseInt(savedXp));
    if (savedInv) setInventory(JSON.parse(savedInv));
    if (savedSkin) setEquippedSkin(savedSkin);
  }, []);

  // 2. FUNÇÃO DE COMPRA
  const handleBuy = (item: ShopItem) => {
    if (xp >= item.cost) {
      // Deduz XP
      const newXp = xp - item.cost;
      setXp(newXp);
      localStorage.setItem('psyquest_xp', newXp.toString());

      // Adiciona ao Inventário
      const newInv = [...inventory, item.id];
      setInventory(newInv);
      localStorage.setItem('psyquest_inventory', JSON.stringify(newInv));
      
      alert(`Parabéns! Você comprou: ${item.name}`);
    } else {
      alert("XP Insuficiente! Vá estudar mais casos.");
    }
  };

  // 3. FUNÇÃO DE EQUIPAR
  const handleEquip = (itemId: string) => {
    setEquippedSkin(itemId);
    localStorage.setItem('psyquest_skin', itemId);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Cabeçalho Fixo com Saldo */}
      <div className="bg-white p-4 border-b border-slate-100 sticky top-0 z-20 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <ShoppingBag className="text-indigo-600" /> Loja
          </h1>
          <p className="text-xs text-slate-400">Personalize seu avatar</p>
        </div>
        <div className="bg-amber-50 px-3 py-1 rounded-full border border-amber-100 flex items-center gap-1">
          <Zap size={14} className="text-amber-500 fill-amber-500" />
          <span className="font-black text-amber-700 text-sm">{xp} XP</span>
        </div>
      </div>

      <div className="max-w-md mx-auto p-5 grid grid-cols-2 gap-4">
        {SHOP_ITEMS.map((item) => {
          const isOwned = inventory.includes(item.id);
          const isEquipped = equippedSkin === item.id;
          const canAfford = xp >= item.cost;
          const isLevelBlocked = false; // Podemos implementar lógica de nível depois

          return (
            <div key={item.id} className={`bg-white p-4 rounded-3xl border ${isEquipped ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-100'} shadow-sm relative overflow-hidden group transition-all`}>
              
              {/* Imagem do Item */}
              <div className="aspect-square bg-slate-50 rounded-2xl mb-3 flex items-center justify-center p-4 relative">
                {item.type === 'skin' ? (
                   <img src={item.image} alt={item.name} className="w-full h-full object-contain drop-shadow-md" />
                ) : (
                   <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.image} border-4 border-white shadow-lg`}></div>
                )}
                
                {isEquipped && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-sm">
                    <Check size={12} strokeWidth={4} />
                  </div>
                )}
              </div>

              {/* Informações */}
              <h3 className="font-bold text-slate-800 text-sm truncate">{item.name}</h3>
              
              {isOwned ? (
                // BOTÃO: SE JÁ TEM
                <button 
                  onClick={() => handleEquip(item.id)}
                  disabled={isEquipped}
                  className={`mt-3 w-full font-black py-2 rounded-xl text-xs transition-colors ${isEquipped ? 'bg-green-100 text-green-700 cursor-default' : 'bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600'}`}
                >
                  {isEquipped ? 'EQUIPADO' : 'EQUIPAR'}
                </button>
              ) : (
                // BOTÃO: SE PRECISA COMPRAR
                <div>
                   <p className={`text-xs font-black mt-1 ${canAfford ? 'text-indigo-600' : 'text-rose-500'}`}>
                     {item.cost === 0 ? 'GRÁTIS' : `${item.cost} XP`}
                   </p>
                   <button 
                     onClick={() => handleBuy(item)}
                     disabled={!canAfford}
                     className={`mt-3 w-full font-black py-2 rounded-xl text-xs transition-colors ${canAfford ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                   >
                     COMPRAR
                   </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Navbar />
    </div>
  );
}
