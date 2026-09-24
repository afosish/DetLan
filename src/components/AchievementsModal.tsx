import React from 'react';
import { ACHIEVEMENTS } from '../data/curriculum';
import type { DetectiveProfile } from '../services/supabase';
import { soundEngine } from '../services/soundEngine';
import { X, CheckCircle, Lock, Key } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DetectiveProfile;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#121927] border-2 border-[#d4af37] text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col font-serif-vintage max-h-[90vh] overflow-y-auto">
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

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#916b14] mx-auto mb-3 flex items-center justify-center text-3xl shadow-lg">
            🎖️
          </div>
          <h3 className="text-2xl font-bold text-[#f5d77f]">
            Особисті відзнаки слідчого
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Колекція детективних нагород за уважність, дедукцію та постійність
          </p>
        </div>

        {/* Inventory / Physical Clues */}
        <div className="bg-[#172236] border border-[#2b3c5a] rounded-2xl p-4 mb-6">
          <div className="text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Key className="w-4 h-4 text-[#d4af37]" />
            <span>Знайдені речові докази в інвентарі:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.unlockedClues.length > 0 ? (
              profile.unlockedClues.map((clue, i) => (
                <div 
                  key={i}
                  className="px-3 py-1.5 bg-[#0e1624] border border-[#d4af37]/30 rounded-xl text-xs text-amber-200 flex items-center gap-1.5 shadow-inner"
                >
                  <span>{clue.includes('архів') || clue.includes('валіз') ? '💼' : '🗝️'}</span>
                  <span>{clue === 'hotel_key_note' ? 'Ключ від мансарди готелю' : clue}</span>
                </div>
              ))
            ) : (
              <div className="text-xs text-slate-400 italic font-mono">
                Інвентар речових доказів порожній. Розкрийте справу №1, щоб отримати секретний архів!
              </div>
            )}
          </div>
        </div>

        {/* Achievements List */}
        <div className="space-y-3 font-sans">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = Boolean(
              (ach.id === 'grey-cells' && profile.disarmedTrapsCount >= 5) ||
              (ach.id === 'cold-blooded' && profile.streak >= 7) ||
              (ach.id === 'clean-confession' && profile.completedEpisodes.length >= 1) ||
              (ach.id === 'sharp-eye' && profile.unlockedClues.length >= 1) ||
              (ach.id === 'verdict-delivered' && profile.completedEpisodes.length >= 2) ||
              ach.unlocked
            );

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-[#18253a] border-[#d4af37]/50 shadow-md'
                    : 'bg-[#0f1522] border-slate-800 opacity-60'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0b101a] border border-slate-700 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                  {ach.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif-vintage font-bold text-sm sm:text-base text-[#f5d77f]">
                      {ach.title}
                    </h4>
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>ЗДОБУТО</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" />
                        <span>ЗАБЛОКОВАНО</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed font-serif">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
