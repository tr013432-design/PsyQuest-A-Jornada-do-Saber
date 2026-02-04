import Navbar from '../../components/Navbar';
import { Trophy, Shield, Crown, Clock } from 'lucide-react';

export default function Ranking() {
  // Dados simulados de outros estudantes (Bots)
  const leaderboard = [
    { id: 1, name: "Ana Silva", xp: 2450, avatar: "bg-pink-200" },
    { id: 2, name: "Carlos M.", xp: 2300, avatar: "bg-blue-200" },
    { id: 3, name: "Beatriz P.", xp: 2150, avatar: "bg-purple-200" },
    { id: 4, name: "Você", xp: 150, avatar: "bg-indigo-600", isMe: true }, // Seu usuário
    { id: 5, name: "João D.", xp: 120, avatar: "bg-green-200" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Cabeçalho da Liga */}
      <div className="bg-indigo-600 p-6 pb-12 pt-12 text-center relative overflow-hidden rounded-b-[3rem] shadow-xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="inline-flex items-center gap-2 bg-indigo-500/50 px-4 py-1 rounded-full text-indigo-100 text-xs font-black uppercase tracking-widest mb-4 border border-indigo-400/30">
          <Clock size={12} /> Termina em 2d 14h
        </div>

        <div className="w-20 h-20 bg-gradient-to-br from-amber-300 to-orange-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg transform rotate-3 mb-4 border-4 border-white/20">
          <Trophy size={32} className="text-white drop-shadow-md" />
        </div>
        
        <h1 className="text-3xl font-black text-white italic">LIGA BRONZE</h1>
        <p className="text-indigo-200 text-sm font-medium">Os 3 primeiros sobem para Prata!</p>
      </div>

      {/* Lista de Classificação */}
      <div className="max-w-md mx-auto p-5 -mt-6">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          {leaderboard.map((user, index) => (
            <div 
              key={user.id} 
              className={`p-4 flex items-center gap-4 border-b border-slate-50 last:border-0 ${user.isMe ? 'bg-indigo-50' : 'bg-white'}`}
            >
              {/* Posição */}
              <div className="w-8 text-center font-black text-slate-300 italic text-lg">
                {index + 1}
              </div>

              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full ${user.avatar} flex items-center justify-center text-xs font-bold text-slate-700 border-2 border-white shadow-sm`}>
                {user.isMe && <img src="/avatar-default.png" className="w-full h-full object-cover rounded-full" />}
                {!user.isMe && user.name.charAt(0)}
              </div>

              {/* Nome e XP */}
              <div className="flex-1">
                <h4 className={`font-bold text-sm ${user.isMe ? 'text-indigo-700' : 'text-slate-700'}`}>
                  {user.name} {user.isMe && '(Eu)'}
                </h4>
                <p className="text-xs text-slate-400 font-medium">Estudante de Psicologia</p>
              </div>

              {/* Ícone de Rank */}
              <div className="text-right">
                <span className="block font-black text-indigo-600 text-sm">{user.xp} XP</span>
                {index < 3 && <Crown size={12} className="ml-auto text-amber-500 fill-amber-500" />}
              </div>
            </div>
          ))}
        </div>

        {/* Aviso Motivacional */}
        <div className="mt-6 bg-slate-100 p-4 rounded-2xl flex items-center gap-3 opacity-70">
          <Shield className="text-slate-400" size={20} />
          <p className="text-xs text-slate-500 font-bold">A zona de rebaixamento começa na posição 15.</p>
        </div>
      </div>

      <Navbar />
    </div>
  );
}
