export default function CaseCard({ gameCase, onAnswer }: { gameCase: any, onAnswer: Function }) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-xl border-b-4 border-gray-200">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">{gameCase.title}</h2>
      <p className="text-gray-700 leading-relaxed mb-6">{gameCase.narrative}</p>
      
      <div className="space-y-3">
        {gameCase.options.map((option: any) => (
          <button
            key={option.id}
            onClick={() => onAnswer(option)}
            className="w-full p-4 text-left border-2 border-gray-100 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all active:scale-95"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
