import Link from 'next/link';
import { Home, Trophy, Book, ShoppingBag, User } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-3 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto flex justify-between items-center">
        
        {/* 1. INÍCIO */}
        <Link href="/" className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-600 focus:text-indigo-600 transition-colors group w-12">
          <Home size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-wide">Início</span>
        </Link>
        
        {/* 2. RANKING (Voltou!) */}
        <Link href="/ranking" className="flex flex-col items-center gap-1 text-slate-400 hover:text-amber-500 focus:text-amber-500 transition-colors group w-12">
          <Trophy size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-wide">Ligas</span>
        </Link>
        
        {/* 3. ÁLBUM (No Meio) */}
        <Link href="/album" className="flex flex-col items-center gap-1 text-slate-400 hover:text-purple-600 focus:text-purple-600 transition-colors group w-12">
          <Book size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-wide">Álbum</span>
        </Link>
        
        {/* 4. LOJA */}
        <Link href="/shop" className="flex flex-col items-center gap-1 text-slate-400 hover:text-rose-500 focus:text-rose-500 transition-colors group w-12">
          <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-wide">Loja</span>
        </Link>
        
        {/* 5. PERFIL */}
        <Link href="/profile" className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-500 focus:text-blue-500 transition-colors group w-12">
          <User size={24} className="group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-wide">Perfil</span>
        </Link>

      </div>
    </div>
  );
}
