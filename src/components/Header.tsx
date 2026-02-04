import { Trophy, Star, Zap } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-white border-b border-slate-100 p-4 sticky top-0 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
             <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-purple-500 rounded-2xl rotate-3 shadow-lg flex items-center justify-center">
                <span className="text-white font-black -rotate-3 text-lg">1</span>
             </div>
             <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="font-black text-slate-800 leading-none">ESTUDANTE</h1>
            <div className="flex items-center gap-1 mt-1">
               <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
               <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Bronze III</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="bg-slate-50 px-3 py-2 rounded-xl flex items-center gap-2 border border-slate-100">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-black text-slate-700">150</span>
          </div>
        </div>
      </div>
    </div>
  );
}
