import React, { useState, useEffect } from 'react';
import type { DetectiveProfile } from '../services/supabase';
import { RANKS, type Rank } from '../data/curriculum';
import { soundEngine } from '../services/soundEngine';
import { Volume2, VolumeX, Shield, Flame, BookOpen, Award, Download, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  profile: DetectiveProfile;
  onOpenNotebook: () => void;
  onOpenAchievements: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onNavigateLanding: () => void;
  isInsideCase: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenNotebook,
  onOpenAchievements,
  onOpenAuth,
  onOpenProfile,
  onNavigateLanding,
  isInsideCase,
}) => {
  const [soundOn, setSoundOn] = useState(soundEngine.isEnabled());
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      soundEngine.playClueFound();
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundEngine.setEnabled(next);
    if (next) soundEngine.playTypewriter();
  };

  // Find current and next rank
  const currentRankIndex = RANKS.slice().reverse().findIndex(r => profile.xp >= r.minXp);
  const currentRank: Rank = currentRankIndex !== -1 
    ? RANKS.slice().reverse()[currentRankIndex] 
    : RANKS[0];
  
  const nextRank = RANKS.find(r => r.minXp > profile.xp) || RANKS[RANKS.length - 1];
  const prevRankXp = currentRank.minXp;
  const nextRankXp = nextRank.minXp === prevRankXp ? prevRankXp + 500 : nextRank.minXp;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round(((profile.xp - prevRankXp) / (nextRankXp - prevRankXp)) * 100))
  );

  const isAuthenticated = !profile.isGuest && Boolean(profile.email);

  return (
    <header className="sticky top-0 z-40 bg-[#0d1422]/95 backdrop-blur-md border-b border-[#d4af37]/30 shadow-xl px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            soundEngine.playTypewriter();
            onNavigateLanding();
          }}
          className="flex items-center gap-2 cursor-pointer group"
          title="На головну / Промо"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#8b6914] p-0.5 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-[#0a0e17] rounded-[10px] flex items-center justify-center text-xl">
              🕵️‍♂️
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-vintage tracking-wider text-lg sm:text-xl font-bold text-[#d4af37] group-hover:text-[#f3d987] transition-colors">
                DetLan
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Слідство веде детектив
            </div>
          </div>
        </div>

        {/* Gamification Stats: Rank, XP, Streak, Alibi - ONLY FOR AUTHENTICATED USERS */}
        {isAuthenticated && !isInsideCase && (
          <div className="flex items-center gap-2 sm:gap-4 bg-[#141e30] border border-[#2b3c5a] px-2 sm:px-4 py-1.5 rounded-2xl shadow-inner text-xs sm:text-sm">
            {/* Detective Rank & XP */}
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg" title={currentRank.title}>
                {currentRank.badgeIcon}
              </span>
              <div className="hidden md:block text-left">
                <div className="text-[11px] font-semibold text-[#e5c158] leading-none">
                  {currentRank.title}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {profile.xp} / {nextRankXp} XP
                </div>
              </div>
              <div className="w-14 sm:w-20 bg-slate-800 rounded-full h-2 border border-slate-700 overflow-hidden hidden xs:block">
                <div 
                  className="bg-gradient-to-r from-[#d4af37] to-[#e5a93b] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Streak with Fire */}
            <div 
              className="flex items-center gap-1 text-orange-400 font-bold px-1.5 py-0.5 rounded-lg bg-orange-950/30 border border-orange-500/30"
              title={`Серія: ${profile.streak} дн. активності поспіль`}
            >
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>{profile.streak}</span>
            </div>

            {/* Alibi Freeze (Streak Freeze) */}
            <div 
              className="flex items-center gap-1 text-cyan-300 font-bold px-1.5 py-0.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30"
              title={`Запас «Алібі»: ${profile.alibiCount} заморозок серії на випадок пропуску дня`}
            >
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline text-[11px] font-mono">Алібі:</span>
              <span>{profile.alibiCount}</span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* PWA Install Button */}
          {isInstallable && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1 bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] px-2.5 py-1.5 rounded-xl font-semibold text-xs transition-all shadow-md active:scale-95 animate-bounce"
              title="Встановити DetLan як додаток"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Встановити</span>
            </button>
          )}

          {/* Detective Notebook & Achievements - ONLY FOR AUTHENTICATED USERS */}
          {isAuthenticated && (
            <>
              <button
                onClick={() => {
                  soundEngine.playClueFound();
                  onOpenNotebook();
                }}
                className="p-2 sm:px-3 sm:py-1.5 bg-[#172236] hover:bg-[#20304c] text-[#e2e8f0] border border-[#d4af37]/30 rounded-xl flex items-center gap-1.5 text-xs transition-all active:scale-95"
                title="Записник доказів та хибних слів"
              >
                <BookOpen className="w-4 h-4 text-[#d4af37]" />
                <span className="hidden sm:inline font-medium">Записник</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClueFound();
                  onOpenAchievements();
                }}
                className="p-2 sm:px-3 sm:py-1.5 bg-[#172236] hover:bg-[#20304c] text-[#e2e8f0] border border-[#d4af37]/30 rounded-xl flex items-center gap-1.5 text-xs transition-all active:scale-95"
                title="Особиста справа та значки"
              >
                <Award className="w-4 h-4 text-[#e5c158]" />
                <span className="hidden sm:inline font-medium">Значки</span>
              </button>
            </>
          )}

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-[#172236] hover:bg-[#20304c] border border-slate-700 text-slate-300 transition-colors"
            title={soundOn ? 'Вимкнути звук' : 'Увімкнути вінтажні звуки'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-[#d4af37]" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Profile / Auth Button */}
          {isAuthenticated ? (
            <button
              onClick={() => {
                soundEngine.playTypewriter();
                onOpenProfile();
              }}
              className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 bg-[#172236] hover:bg-[#223352] border border-[#d4af37]/40 rounded-xl transition-all"
              title={`Особистий профіль: ${profile.name} (${profile.email})`}
            >
              {profile.avatar.startsWith('http') ? (
                <img src={profile.avatar} alt="avatar" className="w-5 h-5 rounded-full object-cover border border-[#d4af37]" />
              ) : (
                <span className="text-base">{profile.avatar}</span>
              )}
              <span className="text-xs text-[#d4af37] font-medium hidden md:inline max-w-[90px] truncate">
                {profile.name}
              </span>
              <UserIcon className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>
          ) : (
            <button
              onClick={() => {
                soundEngine.playTypewriter();
                onOpenAuth();
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-[#d4af37] to-[#e5a93b] hover:from-[#e5c158] hover:to-[#f0b542] text-[#0a0e17] rounded-xl font-serif-vintage font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Увійти</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
