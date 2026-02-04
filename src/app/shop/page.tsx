import Navbar from '../../components/Navbar';
import { ShoppingBag, Lock } from 'lucide-react';

export default function Shop() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="bg-white p-6 pb-4 border-b border-slate-100 sticky top-0 z-10">
        <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <ShoppingBag className="text-indigo-600" /> Loja do Estudante
        </h1>
        <p className="text-sm text-slate-400 mt-1">Use seu XP para personalizar seu perfil.</p>
      </div>

      <div className="max-w-md mx-auto p-5 grid grid-cols-2 gap-4">
        {/* Item da Loja */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="aspect-square bg-slate-50 rounded-2xl mb-3 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Tema Azul Royal</h3>
          <p className="text-xs text-indigo-600 font-black mt-1">500 XP</p>
          <button className="mt-3 w-full bg-indigo-50 text-indigo-600 font-bold py-2 rounded-xl text-xs hover:bg-indigo-100 transition-colors">
            Comprar
          </button>
        </div>

        {/* Item Bloqueado */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden opacity-75">
          <div className="absolute top-3 right-3 bg-slate-900/10 p-1 rounded-full">
            <Lock size={12} />
          </div>
          <div className="aspect-square bg-slate-50 rounded-2xl mb-3 flex items-center justify-center grayscale">
            <div className="w-16 h-16 bg-amber-400 rounded-full border-4 border-white shadow-lg"></div>
          </div>
          <h3 className="font-bold text-slate-800 text-sm">Tema Gold</h3>
          <p className="text-xs text-slate-400 font-black mt-1">Nível 5 Necessário</p>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
