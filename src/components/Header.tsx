import { Trophy, Zap } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-white border-b border-slate-100 p-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* AQUI: Miniatura do Bonequinho */}
          <div className="relative">
             <div className="w-12 h-12 bg-indigo-100 rounded-2xl border-2 border-indigo-200 overflow-hidden">
                <img src="/avatar-default.png" alt="Avatar" className="w-full h-full object-cover" />
             </div>
             {/* Bolinha de Status Online */}
             <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          
          <div>
            <h1 className="font-black text-slate-800 leading-none text-sm">ESTUDANTE</h1>
            <div className="flex items-center gap-1 mt-1">
               <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Nível 1</span>
            </div>
          </div>
        </div>

        {/* XP Total (Placeholder visual, o real vem da page.tsx) */}
        <div className="flex gap-2">
          <div className="bg-slate-50 px-3 py-2 rounded-xl flex items-center gap-2 border border-slate-100">
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
