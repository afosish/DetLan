import React from 'react';
import type { DetectiveProfile } from '../services/supabase';
import { RANKS, ACHIEVEMENTS } from '../data/curriculum';
import { soundEngine } from '../services/soundEngine';
import { 
  X, 
  LogOut, 
  Sparkles, 
  Flame, 
  Shield, 
  Award, 
  FolderCheck, 
  RotateCcw,
  UserCheck,
  Key
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DetectiveProfile;
  onLogout: () => void;
  onResetProgress: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onLogout,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  // Rank calculation
  const currentRankIndex = RANKS.slice().reverse().findIndex(r => profile.xp >= r.minXp);
  const currentRank = currentRankIndex !== -1 
    ? RANKS.slice().reverse()[currentRankIndex] 
    : RANKS[0];
  const nextRank = RANKS.find(r => r.minXp > profile.xp) || RANKS[RANKS.length - 1];
  const prevRankXp = currentRank.minXp;
  const nextRankXp = nextRank.minXp === prevRankXp ? prevRankXp + 500 : nextRank.minXp;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round(((profile.xp - prevRankXp) / (nextRankXp - prevRankXp)) * 100))
  );

  const unlockedAchievementsCount = ACHIEVEMENTS.filter(a => {
    if (a.id === 'grey-cells' && profile.disarmedTrapsCount >= 5) return true;
    if (a.id === 'cold-blooded' && profile.streak >= 7) return true;
    if (a.id === 'clean-confession' && profile.completedEpisodes.length >= 1) return true;
    if (a.id === 'sharp-eye' && profile.unlockedClues.length >= 1) return true;
    if (a.id === 'verdict-delivered' && profile.completedEpisodes.length >= 2) return true;
    return a.unlocked;
  }).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#121a28] border-2 border-[#d4af37] text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col font-serif-vintage max-h-[92vh] overflow-y-auto">
        {/* Decorative Confidential stamp */}
        <div className="absolute top-4 right-12 rotate-12 border-2 border-[#d4af37]/30 px-2.5 py-0.5 rounded text-[#d4af37]/40 text-[10px] font-mono tracking-widest uppercase pointer-events-none">
          СЛІДЧЕ ДОСЬЄ
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playTypewriter();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Identity Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-[#d4af37]/20">
          <div className="relative">
            {profile.avatar.startsWith('http') ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#d4af37] shadow-xl"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-[#0b1019] border-2 border-[#d4af37] flex items-center justify-center text-4xl shadow-xl">
                {profile.avatar}
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white rounded-full p-1 border-2 border-[#121a28] shadow" title="Google Акаунт підтверджено">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-center sm:text-left flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-[#f5d77f] truncate">
              {profile.name}
            </h3>
            <div className="text-xs text-slate-400 font-mono mt-0.5 truncate">
              {profile.email}
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1b273b] border border-[#d4af37]/40 text-xs font-mono text-[#d4af37] mt-2">
              <span>{currentRank.badgeIcon}</span>
              <span className="font-bold">{currentRank.title}</span>
            </div>
          </div>
        </div>

        {/* Rank & XP Progress */}
        <div className="py-4 border-b border-[#d4af37]/20">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-slate-300">Досвід розслідувань (XP):</span>
            <span className="font-bold text-[#f5d77f]">{profile.xp} / {nextRankXp} XP</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 border border-slate-700 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#d4af37] to-[#e5a93b] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="py-4">
          <div className="text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Статистика розслідувань:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-sans">
            {/* Stat 1: XP */}
            <div className="p-3 rounded-2xl bg-[#0d1422] border border-[#22334e] flex flex-col items-center text-center">
              <Sparkles className="w-5 h-5 text-amber-400 mb-1" />
              <div className="font-bold text-lg text-white">{profile.xp}</div>
              <div className="text-[10px] text-slate-400 font-mono">Балів XP</div>
            </div>

            {/* Stat 2: Streak */}
            <div className="p-3 rounded-2xl bg-[#0d1422] border border-[#22334e] flex flex-col items-center text-center">
              <Flame className="w-5 h-5 text-orange-500 mb-1 animate-pulse" />
              <div className="font-bold text-lg text-white">{profile.streak} дн.</div>
              <div className="text-[10px] text-slate-400 font-mono">Активна серія</div>
            </div>

            {/* Stat 3: Alibi */}
            <div className="p-3 rounded-2xl bg-[#0d1422] border border-[#22334e] flex flex-col items-center text-center">
              <Shield className="w-5 h-5 text-cyan-400 mb-1" />
              <div className="font-bold text-lg text-white">{profile.alibiCount}</div>
              <div className="text-[10px] text-slate-400 font-mono">Запас Алібі</div>
            </div>

            {/* Stat 4: Cases Solved */}
            <div className="p-3 rounded-2xl bg-[#0d1422] border border-[#22334e] flex flex-col items-center text-center">
              <FolderCheck className="w-5 h-5 text-emerald-400 mb-1" />
              <div className="font-bold text-lg text-white">{profile.completedEpisodes.length} / 2</div>
              <div className="text-[10px] text-slate-400 font-mono">Розкрито справ</div>
            </div>

            {/* Stat 5: Traps Disarmed */}
            <div className="p-3 rounded-2xl bg-[#0d1422] border border-[#22334e] flex flex-col items-center text-center">
              <span className="text-xl mb-0.5">🧠</span>
              <div className="font-bold text-lg text-white">{profile.disarmedTrapsCount} / 7</div>
              <div className="text-[10px] text-slate-400 font-mono">Пасток знешкоджено</div>
            </div>

            {/* Stat 6: Badges */}
            <div className="p-3 rounded-2xl bg-[#0d1422] border border-[#22334e] flex flex-col items-center text-center">
              <Award className="w-5 h-5 text-[#f5d77f] mb-1" />
              <div className="font-bold text-lg text-white">{unlockedAchievementsCount} / 5</div>
              <div className="text-[10px] text-slate-400 font-mono">Значків здобуто</div>
            </div>
          </div>
        </div>

        {/* Inventory Clues */}
        <div className="p-4 rounded-2xl bg-[#0d1422] border border-[#22334e] mb-6">
          <div className="text-xs font-mono text-[#d4af37] mb-2 flex items-center gap-1.5">
            <Key className="w-4 h-4 text-[#d4af37]" />
            <span>Знайдені речові докази:</span>
          </div>
          {profile.unlockedClues.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.unlockedClues.map((clue, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-[#1a2638] text-amber-200 border border-[#d4af37]/30 rounded-xl text-xs font-mono">
                  🗝️ {clue}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-400 italic font-mono">
              Поки що жодного доказу. Розкрийте Справу №1, щоб отримати ключ від мансарди!
            </div>
          )}
        </div>

        {/* Actions: Sign out & Reset Progress */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              soundEngine.playTypewriter();
              onResetProgress();
            }}
            className="text-xs text-slate-400 hover:text-amber-400 font-mono flex items-center gap-1 transition-colors"
            title="Скинути весь прогрес до 0 XP"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Скинути мій прогрес до 0</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playTypewriter();
              onLogout();
            }}
            className="w-full sm:w-auto px-4 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 rounded-xl text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Вийти з акаунта</span>
          </button>
        </div>
      </div>
    </div>
  );
};
