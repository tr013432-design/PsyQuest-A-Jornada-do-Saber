"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { Settings, Award, TrendingUp, Zap } from 'lucide-react'; // Removi o ícone 'User' pois vamos usar a imagem

export default function Profile() {
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const savedXp = localStorage.getItem('psyquest_xp');
    if (savedXp) setXp(parseInt(savedXp));
  }, []);

  const level = Math.floor(xp / 1000) + 1;
  const nextLevelXp = level * 1000;
  const progress = ((xp % 1000) / 1000) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Cabeçalho do Perfil com o BONEQUINHO */}
      <div className="bg-white p-6 pb-12 rounded-b-[2.5rem] shadow-sm border-b border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        {/* AQUI ESTÁ A MUDANÇA: O Avatar do Usuário */}
        <div className="w-32 h-32 bg-indigo-50 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white shadow-xl relative z-10 overflow-hidden">
          {/* A Imagem do Bonequinho */}
          <img 
            src="/avatar-default.png" 
            alt="Avatar do Estudante" 
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badge de Nível */}
          <div className="absolute -bottom-0 bg-indigo-600 text-white text-xs font-black px-4 py-1 rounded-full border-2 border-white z-20 shadow-md">
            NÍVEL {level}
          </div>
        </div>
        
        <h1 className="text-2xl font-black text-slate-800">Estudante</h1>
        <p className="text-slate-400 font-bold text-sm mb-6">Psicologia Clínica</p>

        {/* Barra de Progresso */}
        <div className="max-w-xs mx-auto">
          <div className="flex justify-between text-xs font-black text-slate-400 mb-1">
            <span>{xp} XP</span>
            <span>{nextLevelXp} XP</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="max-w-md mx-auto p-5 -mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-2xl font-black text-slate-800">3</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Dias Seguidos</span>
          </div>
          
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
              <TrendingUp size={20} />
            </div>
            <span className="text-2xl font-black text-slate-800">85%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Precisão</span>
          </div>
        </div>

        {/* Lista de Conquistas */}
        <h3 className="font-black text-slate-800 text-lg mt-8 mb-4 ml-2">Conquistas</h3>
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
          <AchievementItem title="Primeiros Passos" desc="Completou 1 caso" active={xp > 0} />
          <AchievementItem title="Dedicação Total" desc="Atingiu Nível 2" active={level >= 2} />
          <AchievementItem title="Colecionador" desc="Comprou 1 item na loja" active={false} />
        </div>
      </div>

      <Navbar />
    </div>
  );
}

function AchievementItem({ title, desc, active }: any) {
  return (
    <div className={`p-4 flex items-center gap-4 border-b border-slate-50 last:border-0 ${active ? 'opacity-100' : 'opacity-40 grayscale'}`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm ${active ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-slate-200'}`}>
        <Award size={20} />
      </div>
      <div>
        <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </div>
  );
}
