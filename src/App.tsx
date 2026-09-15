import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { CrimeBoard } from './components/CrimeBoard';
import { QuestPlayer } from './components/QuestPlayer';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { DossierNotebook } from './components/DossierNotebook';
import { AchievementsModal } from './components/AchievementsModal';
import { DailyTrainingModal } from './components/DailyTrainingModal';
import { DETECTIVE_CASES, type DetectiveCase } from './data/curriculum';
import { 
  getLocalProfile, 
  saveLocalProfile, 
  subscribeToAuthChanges, 
  signOutUser,
  resetUserProfile,
  DEFAULT_GUEST_PROFILE,
  type DetectiveProfile 
} from './services/supabase';
import { soundEngine } from './services/soundEngine';
import { registerServiceWorker } from './registerSW';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<DetectiveProfile>(getLocalProfile());
  const [cases, setCases] = useState<DetectiveCase[]>(DETECTIVE_CASES);
  const [currentView, setCurrentView] = useState<'landing' | 'crime_board' | 'quest'>('landing');
  const [activeCase, setActiveCase] = useState<DetectiveCase | null>(null);

  // Modal states
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isDailyOpen, setIsDailyOpen] = useState(false);

  const isAuthenticated = !profile.isGuest && Boolean(profile.email);

  useEffect(() => {
    registerServiceWorker();

    // Purge any stale mock accounts from previous runs
    try {
      const stored = localStorage.getItem('detlan_detective_profile');
      if (stored && (stored.includes('detlan.app') || stored.includes('investigator.google') || stored.includes('guest-detective-007'))) {
        localStorage.removeItem('detlan_detective_profile');
        setProfile(DEFAULT_GUEST_PROFILE);
      }
    } catch {
      // ignore
    }

    const unsubscribe = subscribeToAuthChanges((newProfile) => {
      setProfile(newProfile);
      if (newProfile && !newProfile.isGuest && newProfile.email) {
        setIsAuthOpen(false);
        setCurrentView('crime_board');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const updateProfile = (newProf: DetectiveProfile) => {
    setProfile(newProf);
    saveLocalProfile(newProf);
  };

  const handleSelectCase = (c: DetectiveCase) => {
    if (!isAuthenticated) {
      soundEngine.playTypewriter();
      setIsAuthOpen(true);
      return;
    }
    setActiveCase(c);
    setCurrentView('quest');
  };

  const handleCompleteCase = (earnedXp: number, rewardItem: string, _badge: string) => {
    const updatedXp = profile.xp + earnedXp;
    const updatedClues = Array.from(new Set([...profile.unlockedClues, rewardItem]));
    const updatedEpisodes = Array.from(new Set([...profile.completedEpisodes, activeCase?.id || 'case-01-missing-key']));
    const updatedAlibis = profile.alibiCount + 1; // Awarded 1 streak freeze

    const updatedProfile: DetectiveProfile = {
      ...profile,
      xp: updatedXp,
      unlockedClues: updatedClues,
      completedEpisodes: updatedEpisodes,
      alibiCount: updatedAlibis,
      streak: profile.streak + 1,
      disarmedTrapsCount: profile.disarmedTrapsCount + 1,
    };

    updateProfile(updatedProfile);

    // Update case status to completed
    setCases(prev => prev.map(cs => {
      if (cs.id === activeCase?.id) {
        return { ...cs, status: 'completed' };
      }
      if (cs.requiredXp <= updatedXp) {
        return { ...cs, status: 'unlocked' };
      }
      return cs;
    }));

    setCurrentView('crime_board');
  };

  const handleAwardDailyXp = (xp: number) => {
    const updated: DetectiveProfile = {
      ...profile,
      xp: profile.xp + xp,
      disarmedTrapsCount: profile.disarmedTrapsCount + 1,
    };
    updateProfile(updated);
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col font-sans antialiased">
      {/* Universal Detective Header */}
      <Header
        profile={profile}
        onOpenNotebook={() => setIsNotebookOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onNavigateLanding={() => setCurrentView('landing')}
        isInsideCase={currentView === 'quest'}
      />

      {/* Main Views */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <LandingPage
            onStartGame={() => {
              if (!isAuthenticated) {
                soundEngine.playTypewriter();
                setIsAuthOpen(true);
              } else {
                soundEngine.playClueFound();
                setCurrentView('crime_board');
              }
            }}
          />
        )}

        {currentView === 'crime_board' && (
          <CrimeBoard
            cases={cases}
            profile={profile}
            onSelectCase={handleSelectCase}
            onDailyTraining={() => setIsDailyOpen(true)}
          />
        )}

        {currentView === 'quest' && activeCase && (
          <QuestPlayer
            detectiveCase={activeCase}
            profile={profile}
            onExit={() => setCurrentView('crime_board')}
            onCompleteCase={handleCompleteCase}
          />
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentProfile={profile}
        onProfileUpdated={updateProfile}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onLogout={async () => {
          await signOutUser();
          setProfile(DEFAULT_GUEST_PROFILE);
          setIsProfileOpen(false);
          setCurrentView('landing');
        }}
        onResetProgress={() => {
          const fresh = resetUserProfile(profile.id);
          setProfile(fresh);
          setCases(DETECTIVE_CASES);
        }}
      />

      <DossierNotebook
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        profile={profile}
      />

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        profile={profile}
      />

      <DailyTrainingModal
        isOpen={isDailyOpen}
        onClose={() => setIsDailyOpen(false)}
        onAwardXp={handleAwardDailyXp}
      />
    </div>
  );
};

export default App;
