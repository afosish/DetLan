import React from 'react';
import type { DetectiveCase } from '../data/curriculum';
import type { DetectiveProfile } from '../services/supabase';
import { soundEngine } from '../services/soundEngine';
import { MapPin, Lock, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface CrimeBoardProps {
  cases: DetectiveCase[];
  profile: DetectiveProfile;
  onSelectCase: (c: DetectiveCase) => void;
  onDailyTraining: () => void;
}

export const CrimeBoard: React.FC<CrimeBoardProps> = ({
  cases,
  profile,
  onSelectCase,
  onDailyTraining,
}) => {
  return (
    <div className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col">
      {/* Board Title & Atmosphere */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-[#131d2e] border border-[#d4af37]/30 p-4 sm:p-5 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#090d16] border border-[#d4af37]/50 flex items-center justify-center text-2xl shadow-inner">
            📌
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif-vintage font-bold text-[#f5d77f]">
              Дошка розслідувань Пуаро
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Обирайте справу, збирайте речові докази та розбивайте неправдиві свідчення болгарською
            </p>
          </div>
        </div>

        {/* Daily Streak & Practice Widget */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playClueFound();
              onDailyTraining();
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e5a93b] hover:from-[#e5c158] hover:to-[#f0b542] text-[#0a0e17] font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Щоденна зачіпка (+10 XP)</span>
          </button>
        </div>
      </div>

      {/* Main Corkboard Area */}
      <div className="relative corkboard-pattern p-5 sm:p-8 rounded-3xl border-4 border-[#523315] shadow-2xl min-h-[520px] flex flex-col justify-between overflow-hidden">
        {/* Dynamic SVG Red Yarn strings connecting pins */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <filter id="yarn-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.6"/>
            </filter>
            <filter id="yarn-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#e53e3e" floodOpacity="0.8"/>
            </filter>
          </defs>

          {/* Decorative ambient strings */}
          <line x1="15%" y1="12%" x2="48%" y2="18%" stroke="#b91c1c" strokeWidth="2" strokeDasharray="5,4" filter="url(#yarn-shadow)"/>
          <line x1="48%" y1="18%" x2="85%" y2="15%" stroke="#991b1b" strokeWidth="2" opacity="0.6" filter="url(#yarn-shadow)"/>
          <line x1="85%" y1="15%" x2="52%" y2="85%" stroke="#7f1d1d" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.4"/>

          {/* Dynamic Evidence Yarn connecting Case 1 to Case 2 */}
          {profile.completedEpisodes.includes('case-01-missing-suitcase') || profile.unlockedClues.includes('Секретний архів кур\'єра') || profile.completedEpisodes.includes('case-01-missing-key') || profile.unlockedClues.includes('Ключ від мансарди') ? (
            <g filter="url(#yarn-glow)">
              <line
                x1="25%"
                y1="32%"
                x2="65%"
                y2="32%"
                stroke="#ef4444"
                strokeWidth="3.5"
                filter="url(#yarn-shadow)"
              />
              <circle cx="25%" cy="32%" r="4.5" fill="#dc2626" />
              <circle cx="65%" cy="32%" r="4.5" fill="#dc2626" />
            </g>
          ) : (
            <line
              x1="25%"
              y1="32%"
              x2="65%"
              y2="32%"
              stroke="#f87171"
              strokeWidth="2"
              strokeDasharray="6,4"
              className="opacity-40"
              filter="url(#yarn-shadow)"
            />
          )}
        </svg>

        {/* Cases Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((detCase, idx) => {
            const isCompleted = profile.completedEpisodes.includes(detCase.id) || (profile.xp >= 100 && idx === 0 && profile.completedEpisodes.length > 0);
            const isUnlocked = profile.xp >= detCase.requiredXp || (detCase.requiredClue && profile.unlockedClues.includes(detCase.requiredClue)) || (idx > 0 && profile.completedEpisodes.includes(cases[idx - 1]?.id));

            return (
              <div
                key={detCase.id}
                onClick={() => {
                  if (isUnlocked) {
                    soundEngine.playTypewriter();
                    onSelectCase(detCase);
                  } else {
                    soundEngine.playTrapError();
                  }
                }}
                className={`group relative bg-[#fdfaf3] text-slate-800 p-5 rounded-2xl shadow-xl transition-all duration-300 transform 
                  ${isUnlocked 
                    ? 'cursor-pointer hover:-translate-y-1.5 hover:shadow-2xl hover:rotate-[-0.5deg]' 
                    : 'opacity-70 grayscale-[30%] cursor-not-allowed'
                  }
                  ${idx % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]'}
                `}
                style={{
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Vintage Brass Pin at top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-700 via-amber-400 to-yellow-200 shadow-md border border-amber-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-950 opacity-60" />
                </div>

                {/* Case File Header */}
                <div className="flex items-center justify-between border-b-2 border-dashed border-slate-300 pb-2 mb-3 mt-1 font-mono text-xs">
                  <span className="font-bold text-amber-900 uppercase tracking-wider">
                    СПРАВА № 0{detCase.number}
                  </span>
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>РОЗКРИТО</span>
                    </span>
                  ) : isUnlocked ? (
                    <span className="text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                      АКТИВНЕ
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-600 font-bold bg-slate-200 px-2 py-0.5 rounded-full text-[10px]">
                      <Lock className="w-3 h-3" />
                      <span>{detCase.requiredClue ? `Потрібен ${detCase.requiredClue}` : `${detCase.requiredXp} XP`}</span>
                    </span>
                  )}
                </div>

                {/* Case Title */}
                <h3 className="font-serif-vintage font-bold text-lg text-slate-900 group-hover:text-amber-900 transition-colors mb-1 leading-snug">
                  {detCase.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-slate-600 font-serif-vintage mb-3">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>{detCase.location}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-700 leading-relaxed mb-4 font-serif">
                  {detCase.description}
                </p>

                {/* Rewards & Action */}
                <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-xs">
                  <div className="text-[11px] font-mono text-slate-600">
                    Нагорода: <b className="text-amber-950">{detCase.rewardItem}</b>
                  </div>

                  {isUnlocked ? (
                    <div className="flex items-center gap-1 text-amber-900 font-bold group-hover:translate-x-1 transition-transform">
                      <span>Розслідувати</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="text-slate-500 font-mono text-[10px]">
                      {detCase.requiredClue ? `Потрібна улика: ${detCase.requiredClue}` : `Потрібно ${detCase.requiredXp} XP`}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Inspector Note pinned to board */}
        <div className="relative z-10 mt-8 bg-[#f5eedb] text-slate-900 p-4 rounded-2xl border border-amber-900/30 max-w-xl shadow-lg flex items-start gap-3 rotate-[-0.3deg]">
          <span className="text-2xl">💡</span>
          <div className="text-xs leading-relaxed font-typewriter">
            <b>Порада метра Пуаро:</b> Під час допитів уважно стежте за словами-пастками. Якщо свідок каже <i>«тръгнете направо»</i>, він скеровує вас <b>прямо</b>, а не на правий бік. Помилка у перекладі дасть підозрюваному час утекти!
          </div>
        </div>
      </div>
    </div>
  );
};
