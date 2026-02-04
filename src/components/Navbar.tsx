import { Home, Trophy, ShoppingBag, User } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <button className="flex flex-col items-center gap-1 text-indigo-600">
          <Home size={24} fill="currentColor" fillOpacity={0.2} />
          <span className="text-[10px] font-black uppercase">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-500 transition-colors">
          <Trophy size={24} />
          <span className="text-[10px] font-black uppercase">Ligas</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-500 transition-colors">
          <ShoppingBag size={24} />
          <span className="text-[10px] font-black uppercase">Loja</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-500 transition-colors">
          <User size={24} />
          <span className="text-[10px] font-black uppercase">Perfil</span>
        </button>
      </div>
    </div>
  );
}
