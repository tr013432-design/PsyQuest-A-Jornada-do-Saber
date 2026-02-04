import Header from '../components/Header';
import { BookOpen, Play, ChevronRight, LayoutGrid } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      <main className="max-w-md mx-auto p-4 pb-24">
        {/* Banner de XP do Dia */}
        <section className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-black text-slate-400 uppercase italic">Progresso Diário</span>
            <span className="text-xs font-bold text-indigo-600">450 / 1000 XP</span>
          </div>
          <div className="h-4 w-full bg-slate-200 rounded-full p-1 shadow-inner">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[45%] shadow-[0_0_10px_rgba(79,70,229,0.4)]"></div>
          </div>
        </section>

        {/* Card de Missão */}
        <section className="relative group cursor-pointer mb-8">
          <div className="absolute inset-0 bg-indigo-600 rounded-[2.5rem] rotate-2 scale-105 opacity-10 group-hover:rotate-1 transition-transform"></div>
          <div className="relative bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-xl overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-indigo-100 p-3 rounded-2xl text-indigo-600">
                <BookOpen size={24} />
              </div>
              <span className="bg-rose-100 text-rose-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Caso Crítico</span>
            </div>
            
            <h2 className="text-2xl font-black text-slate-800 mb-2 leading-tight">Dificuldade de Alfabetização</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">Lucas, 7 anos, apresenta inversão de letras e desatenção. Qual sua primeira intervenção?</p>
            
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_8px_0_rgb(49,46,129)] active:translate-y-1 active:shadow-none transition-all">
              JOGAR AGORA <Play size={20} fill="currentColor" />
            </button>
          </div>
        </section>

        {/* Categorias */}
        <h3 className="text-slate-800 font-black text-lg mb-4 italic uppercase tracking-tighter">Suas Trilhas</h3>
        <div className="grid grid-cols-1 gap-4">
          <TrilhaCard area="Psicologia" cor="bg-blue-500" casos="12" />
          <TrilhaCard area="Pedagogia" cor="bg-emerald-500" casos="08" />
        </div>
      </main>
    </div>
  );
}

function TrilhaCard({ area, cor, casos }: any) {
  return (
    <div className="bg-white p-5 rounded-3xl flex items-center justify-between border-2 border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className={`${cor} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg`}>
          <LayoutGrid size={20} />
        </div>
        <div>
          <h4 className="font-black text-slate-800">{area}</h4>
          <p className="text-xs font-bold text-slate-400 tracking-wide uppercase">{casos} Casos disponíveis</p>
        </div>
      </div>
      <div className="bg-slate-50 p-2 rounded-xl group-hover:bg-indigo-50 transition-colors">
        <ChevronRight className="text-slate-300 group-hover:text-indigo-500" />
      </div>
    </div>
  );
}
