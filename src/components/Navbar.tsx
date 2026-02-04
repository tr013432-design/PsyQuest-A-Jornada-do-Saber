import Link from 'next/link';
import { Home, Trophy, ShoppingBag, User } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <Link href="/" className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-600 focus:text-indigo-600 transition-colors group">
          <Home size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-wide">Início</span>
        </Link>
        
        <Link href="/ranking" className="flex flex-col items-center gap-1 text-slate-400 hover:text-amber-500 focus:text-amber-500 transition-colors group">
          <Trophy size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-wide">Ranking</span>
        </Link>
        
        <Link href="/shop" className="flex flex-col items-center gap-1 text-slate-400 hover:text-rose-500 focus:text-rose-500 transition-colors group">
          <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-wide">Loja</span>
        </Link>
        
        <Link href="/profile" className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-500 focus:text-blue-500 transition-colors group">
          <User size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-wide">Perfil</span>
        </Link>
      </div>
    </div>
  );
}
