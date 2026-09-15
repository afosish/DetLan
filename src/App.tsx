import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { CrimeBoard } from './components/CrimeBoard';
import { QuestPlayer } from './components/QuestPlayer';
import { AuthModal } from './components/AuthModal';
import { DossierNotebook } from './components/DossierNotebook';
import { AchievementsModal } from './components/AchievementsModal';
import { DailyTrainingModal } from './components/DailyTrainingModal';
import { DETECTIVE_CASES, type DetectiveCase } from './data/curriculum';
import { getLocalProfile, saveLocalProfile, subscribeToAuthChanges, type DetectiveProfile } from './services/supabase';
import { soundEngine } from './services/soundEngine';
import { registerServiceWorker } from './registerSW';

export const App: React.FC = () => {
  const [profile, setProfile] = useState<DetectiveProfile>(getLocalProfile());
  const [cases, setCases] = useState<DetectiveCase[]>(DETECTIVE_CASES);
  const [currentView, setCurrentView] = useState<'landing' | 'crime_board' | 'quest'>('landing');
  const [activeCase, setActiveCase] = useState<DetectiveCase | null>(null);

  // Modal states
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isDailyOpen, setIsDailyOpen] = useState(false);

  useEffect(() => {
    registerServiceWorker();
    const unsubscribe = subscribeToAuthChanges((newProfile) => {
      setProfile(newProfile);
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
        onNavigateLanding={() => setCurrentView('landing')}
        isInsideCase={currentView === 'quest'}
      />

      {/* Main Views */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <LandingPage
            onStartGame={() => {
              soundEngine.playTypewriter();
              setCurrentView('crime_board');
            }}
            onOpenAuth={() => setIsAuthOpen(true)}
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

      <DossierNotebook
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
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
