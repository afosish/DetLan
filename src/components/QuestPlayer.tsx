import React, { useState, useEffect, useCallback } from 'react';
import type { DetectiveCase, CrimeSceneHotspot, TimelineEvent } from '../data/curriculum';
import type { DetectiveProfile } from '../services/supabase';
import { soundEngine } from '../services/soundEngine';
import confetti from 'canvas-confetti';
import { getSavedCaseStep, saveCaseStep, clearCaseStep } from '../services/supabase';
import { 
  ArrowLeft, 
  Volume2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  Key, 
  Sparkles,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  Search,
  GripVertical,
  Puzzle,
  Target,
  ArrowUp,
  ArrowDown,
  RotateCcw
} from 'lucide-react';

interface QuestPlayerProps {
  detectiveCase: DetectiveCase;
  profile: DetectiveProfile;
  onExit: () => void;
  onCompleteCase: (earnedXp: number, rewardItem: string, badge: string) => void;
}

export const QuestPlayer: React.FC<QuestPlayerProps> = ({
  detectiveCase,
  profile,
  onExit,
  onCompleteCase,
}) => {
  const calculateCaseXpUpTo = useCallback((stepIdx: number) => {
    return detectiveCase.steps.slice(0, stepIdx).reduce((acc, s) => acc + (s.xpReward || 0), 0);
  }, [detectiveCase.steps]);

  // Persistent Case Level Progress
  const savedStep = getSavedCaseStep(profile.id, detectiveCase.id);
  const initialIndex = (savedStep > 0 && savedStep < detectiveCase.steps.length) ? savedStep : 0;

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(initialIndex);
  const [highestUnlockedStep, setHighestUnlockedStep] = useState<number>(initialIndex);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [totalCaseXp, setTotalCaseXp] = useState<number>(() => calculateCaseXpUpTo(initialIndex));
  const [isCaseFinished, setIsCaseFinished] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Sync state if case or user profile changes
  useEffect(() => {
    const saved = getSavedCaseStep(profile.id, detectiveCase.id);
    const validSaved = (saved > 0 && saved < detectiveCase.steps.length) ? saved : 0;
    setCurrentStepIndex(validSaved);
    setHighestUnlockedStep(validSaved);
    setTotalCaseXp(calculateCaseXpUpTo(validSaved));
  }, [detectiveCase.id, profile.id, calculateCaseXpUpTo]);

  // 3 Attempts Cracking Magnifying Glasses
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [showExhaustedModal, setShowExhaustedModal] = useState(false);
  
  // Sentence Assembly state
  const [assembledWords, setAssembledWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isSentenceCorrect, setIsSentenceCorrect] = useState<boolean | null>(null);
  const [sentenceFeedback, setSentenceFeedback] = useState('');

  // Crime Scene Search state
  const [revealedHotspots, setRevealedHotspots] = useState<Set<string>>(new Set());
  const [foundEvidence, setFoundEvidence] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<CrimeSceneHotspot | null>(null);

  // Matching Pairs state
  const [selectedBulgarianId, setSelectedBulgarianId] = useState<string | null>(null);
  const [selectedUkrainianId, setSelectedUkrainianId] = useState<string | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<string>>(new Set());
  const [shuffledUkrainian, setShuffledUkrainian] = useState<{ id: string; ukrainian: string }[]>([]);
  const [pairMismatch, setPairMismatch] = useState<boolean>(false);

  // Timeline Puzzle state
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [isTimelineSubmitted, setIsTimelineSubmitted] = useState<boolean>(false);
  const [isTimelineCorrect, setIsTimelineCorrect] = useState<boolean | null>(null);
  const [timelineFeedback, setTimelineFeedback] = useState<string>('');

  // Interrogation Timer
  const activeStep = detectiveCase.steps[currentStepIndex];
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (activeStep?.timeLimitSeconds) {
      setTimeLeft(activeStep.timeLimitSeconds);
      soundEngine.playTensionDrone();
    } else {
      setTimeLeft(null);
    }
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setFeedbackText('');
    
    // Reset attempts
    setAttemptsLeft(3);
    setShowExhaustedModal(false);

    // Reset sentence assembly state
    setAssembledWords([]);
    setIsSentenceCorrect(null);
    setSentenceFeedback('');

    // Reset crime scene state
    setRevealedHotspots(new Set());
    setFoundEvidence(false);
    setActiveHotspot(null);

    // Reset matching pairs state
    setSelectedBulgarianId(null);
    setSelectedUkrainianId(null);
    setMatchedPairIds(new Set());
    setPairMismatch(false);
    if (activeStep?.type === 'matching_pairs' && activeStep.matchingPairs) {
      const shuffled = [...activeStep.matchingPairs].map(p => ({ id: p.id, ukrainian: p.ukrainian }));
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setShuffledUkrainian(shuffled);
    }

    // Reset timeline puzzle state
    setIsTimelineSubmitted(false);
    setIsTimelineCorrect(null);
    setTimelineFeedback('');
    if (activeStep?.type === 'timeline_puzzle' && activeStep.timelineEvents) {
      const shuffled = [...activeStep.timelineEvents];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setTimelineEvents(shuffled);
    }
  }, [currentStepIndex, activeStep]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isAnswerSubmitted || isCaseFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswerSubmitted, isCaseFinished]);

  // Initialize sentence assembly words when entering that step type
  useEffect(() => {
    if (activeStep?.type === 'sentence_assembly' && activeStep.sentenceFragments) {
      const { correctOrder, distractorWords = [] } = activeStep.sentenceFragments;
      const allWords = [...correctOrder, ...distractorWords];
      // Fisher-Yates shuffle
      for (let i = allWords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
      }
      setAvailableWords(allWords);
      setAssembledWords([]);
    }
  }, [currentStepIndex, activeStep]);

  const registerMistake = () => {
    soundEngine.playTrapError();
    setAttemptsLeft((prev) => {
      const next = Math.max(0, prev - 1);
      if (next === 0) {
        setShowExhaustedModal(true);
      }
      return next;
    });
  };

  const handleTimeOut = () => {
    registerMistake();
    setIsAnswerSubmitted(true);
    setIsCorrect(false);
    setFeedbackText('Час вичерпано! Підозрюваний встиг знищити докази, поки ви вагалися. Спробуйте ще раз!');
  };

  const handlePlayBulgarianAudio = () => {
    if (!activeStep?.audioText) return;
    setIsPlayingAudio(true);
    soundEngine.playTypewriter();
    soundEngine.speakBulgarian(activeStep.audioText, () => {
      setIsPlayingAudio(false);
    });
  };

  // Sentence Assembly handlers
  const handleAddWord = useCallback((word: string, index: number) => {
    soundEngine.playTypewriter();
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
    setAssembledWords(prev => [...prev, word]);
  }, []);

  const handleRemoveWord = useCallback((word: string, index: number) => {
    soundEngine.playTypewriter();
    setAssembledWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
  }, []);

  const handleCheckSentence = () => {
    if (!activeStep?.sentenceFragments) return;
    const correct = activeStep.sentenceFragments.correctOrder;
    const isCorrectAnswer = assembledWords.length === correct.length && 
      assembledWords.every((w, i) => w === correct[i]);
    
    if (isCorrectAnswer) {
      soundEngine.playStampThud();
      soundEngine.playClueFound();
      setIsSentenceCorrect(true);
      setSentenceFeedback('Бездоганно! Записку відновлено — тепер її зміст кристально ясний!');
      setTotalCaseXp(prev => prev + activeStep.xpReward);
    } else {
      registerMistake();
      setIsSentenceCorrect(false);
      setSentenceFeedback('Порядок слів неправильний. Уважно перечитайте фрагменти та спробуйте знову!');
    }
  };

  const handleResetSentence = () => {
    if (!activeStep?.sentenceFragments) return;
    soundEngine.playPageTurn();
    const { correctOrder, distractorWords = [] } = activeStep.sentenceFragments;
    const allWords = [...correctOrder, ...distractorWords];
    for (let i = allWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
    }
    setAvailableWords(allWords);
    setAssembledWords([]);
    setIsSentenceCorrect(null);
    setSentenceFeedback('');
  };

  // Matching Pairs handlers
  const checkPairMatch = (bgId: string, uaId: string) => {
    if (bgId === uaId) {
      soundEngine.playYarnStretch();
      const newMatched = new Set([...matchedPairIds, bgId]);
      setMatchedPairIds(newMatched);
      setSelectedBulgarianId(null);
      setSelectedUkrainianId(null);
      if (activeStep?.matchingPairs && newMatched.size === activeStep.matchingPairs.length) {
        soundEngine.playStampThud();
        soundEngine.playClueFound();
        setTotalCaseXp(prev => prev + activeStep.xpReward);
      }
    } else {
      setPairMismatch(true);
      registerMistake();
      setTimeout(() => {
        setSelectedBulgarianId(null);
        setSelectedUkrainianId(null);
        setPairMismatch(false);
      }, 500);
    }
  };

  const handleSelectBulgarian = (id: string) => {
    if (matchedPairIds.has(id)) return;
    soundEngine.playTypewriter();
    setSelectedBulgarianId(id);
    if (selectedUkrainianId) {
      checkPairMatch(id, selectedUkrainianId);
    }
  };

  const handleSelectUkrainian = (id: string) => {
    if (matchedPairIds.has(id)) return;
    soundEngine.playTypewriter();
    setSelectedUkrainianId(id);
    if (selectedBulgarianId) {
      checkPairMatch(selectedBulgarianId, id);
    }
  };

  // Timeline Puzzle handlers
  const handleMoveTimelineItem = (idx: number, direction: 'up' | 'down') => {
    if (isTimelineSubmitted && isTimelineCorrect) return;
    soundEngine.playDragSnap();
    setTimelineEvents((prev) => {
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const next = [...prev];
      const temp = next[idx];
      next[idx] = next[targetIdx];
      next[targetIdx] = temp;
      return next;
    });
  };

  const handleCheckTimeline = () => {
    if (!activeStep?.timelineEvents) return;
    const isCorrectOrder = timelineEvents.every((ev, idx) => ev.correctPosition === idx);
    setIsTimelineSubmitted(true);
    if (isCorrectOrder) {
      soundEngine.playStampThud();
      soundEngine.playClueFound();
      setIsTimelineCorrect(true);
      setTimelineFeedback('Чудово! Хронологічний ланцюг подій відновлено без жодної похибки!');
      setTotalCaseXp(prev => prev + activeStep.xpReward);
    } else {
      registerMistake();
      setIsTimelineCorrect(false);
      setTimelineFeedback('Послідовність не сходиться! Зверніть увагу на час та черговість подій.');
    }
  };

  const handleResetTimeline = () => {
    soundEngine.playTypewriter();
    setIsTimelineSubmitted(false);
    setIsTimelineCorrect(null);
    setTimelineFeedback('');
  };

  // Crime Scene handlers
  const handleHotspotClick = (hotspot: CrimeSceneHotspot) => {
    soundEngine.playSearchReveal();
    setRevealedHotspots(prev => new Set([...prev, hotspot.id]));
    setActiveHotspot(hotspot);
    
    if (hotspot.isEvidence && !foundEvidence) {
      setFoundEvidence(true);
      soundEngine.playClueFound();
      setTotalCaseXp(prev => prev + activeStep.xpReward);
    }
  };

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    soundEngine.playTypewriter();
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !activeStep || !activeStep.options) return;

    const chosenOption = activeStep.options.find(o => o.id === selectedOptionId);
    if (!chosenOption) return;

    setIsAnswerSubmitted(true);
    if (chosenOption.isCorrect) {
      soundEngine.playStampThud();
      soundEngine.playClueFound();
      setIsCorrect(true);
      setFeedbackText(chosenOption.feedback);
      setTotalCaseXp(prev => prev + activeStep.xpReward);
    } else {
      registerMistake();
      setIsCorrect(false);
      setFeedbackText(chosenOption.feedback);
    }
  };

  const handleNextStep = () => {
    soundEngine.playTypewriter();
    if (currentStepIndex + 1 < detectiveCase.steps.length) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setHighestUnlockedStep(prev => {
        const updated = Math.max(prev, nextIdx);
        saveCaseStep(profile.id, detectiveCase.id, updated);
        return updated;
      });
      saveCaseStep(profile.id, detectiveCase.id, nextIdx);
      setTotalCaseXp(calculateCaseXpUpTo(nextIdx));
    } else {
      // Finished all stages!
      setIsCaseFinished(true);
      saveCaseStep(profile.id, detectiveCase.id, detectiveCase.steps.length - 1);
      soundEngine.playVictory();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffffff', '#e53e3e', '#1e293b'],
      });
    }
  };

  const handleJumpToLevel = (targetIndex: number) => {
    if (targetIndex === currentStepIndex) return;
    const isLevelUnlocked = profile.completedEpisodes.includes(detectiveCase.id) || targetIndex <= highestUnlockedStep;
    if (!isLevelUnlocked) {
      soundEngine.playTrapError();
      return;
    }
    soundEngine.playTypewriter();
    setCurrentStepIndex(targetIndex);
    saveCaseStep(profile.id, detectiveCase.id, targetIndex);
    setTotalCaseXp(calculateCaseXpUpTo(targetIndex));
  };

  const handleRestartCase = () => {
    if (window.confirm('Почати розслідування цієї справи спочатку (з 1-го рівня)?')) {
      soundEngine.playTypewriter();
      setCurrentStepIndex(0);
      setHighestUnlockedStep(0);
      setTotalCaseXp(0);
      saveCaseStep(profile.id, detectiveCase.id, 0);
    }
  };

  const handleFinishAndClaim = () => {
    soundEngine.playStampThud();
    clearCaseStep(profile.id, detectiveCase.id);
    onCompleteCase(totalCaseXp, detectiveCase.rewardItem, detectiveCase.badgeReward);
  };

  const progressPercent = Math.round(((currentStepIndex + 1) / detectiveCase.steps.length) * 100);

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-3 sm:p-6 flex flex-col justify-between selection:bg-[#d4af37] selection:text-black">
      {/* Top Header / Progress Bar */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 mb-2.5">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundEngine.playTypewriter();
              onExit();
            }}
            className="p-2 sm:px-3 sm:py-2 bg-[#172236] hover:bg-[#20304c] text-slate-300 rounded-xl flex items-center gap-1.5 text-xs font-mono border border-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Дошка справ</span>
          </button>

          <button
            onClick={handleRestartCase}
            title="Почати розслідування цієї справи з 1-го рівня"
            className="p-2 sm:px-2.5 sm:py-2 bg-[#172236] hover:bg-[#20304c] text-slate-400 hover:text-amber-300 rounded-xl flex items-center gap-1 text-xs font-mono border border-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">З початку</span>
          </button>
        </div>

        {/* Progress Bar & Level indicator */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
            <span className="text-[#f5d77f] font-bold">
              Рівень {currentStepIndex + 1} / {detectiveCase.steps.length}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 border border-slate-700 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#d4af37] to-[#e5a93b] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 3 Attempts: Cracking Magnifying Glasses */}
        <div className="flex items-center gap-1 bg-[#172236] border border-amber-900/40 px-2 sm:px-3 py-1.5 rounded-xl shadow-inner">
          <span className="text-[10px] font-mono text-slate-400 mr-1 hidden sm:inline">Спроби:</span>
          {[1, 2, 3].map((num) => {
            const hasAttempt = num <= attemptsLeft;
            return (
              <span
                key={num}
                className={`text-xs sm:text-sm transition-all duration-300 ${
                  hasAttempt
                    ? 'scale-100 opacity-100 filter drop-shadow-[0_0_6px_rgba(212,175,55,0.7)]'
                    : 'scale-90 opacity-25 grayscale'
                }`}
                title={hasAttempt ? 'Активна спроба' : 'Спроба втрачена'}
              >
                {hasAttempt ? '🔍' : '💥'}
              </span>
            );
          })}
        </div>

        {/* Earned XP */}
        <div className="font-mono text-xs text-[#f5d77f] bg-[#d4af37]/15 px-3 py-1.5 rounded-xl border border-[#d4af37]/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+{totalCaseXp} XP</span>
        </div>
      </div>

      {/* Level Rail / Selector - Allows jumping to any unlocked level */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto pb-2 mb-3 px-1 scrollbar-thin scrollbar-thumb-amber-900/40">
        <span className="text-[10px] font-mono text-slate-400 shrink-0 mr-1 hidden sm:inline">Рівні:</span>
        {detectiveCase.steps.map((step, idx) => {
          const isCurrent = idx === currentStepIndex;
          const isPassed = idx < highestUnlockedStep || profile.completedEpisodes.includes(detectiveCase.id);
          const isUnlocked = isPassed || idx <= highestUnlockedStep;

          return (
            <button
              key={step.id}
              onClick={() => isUnlocked && handleJumpToLevel(idx)}
              disabled={!isUnlocked}
              className={`shrink-0 h-7 px-2.5 rounded-lg font-mono text-[10px] sm:text-[11px] font-bold flex items-center gap-1 transition-all ${
                isCurrent
                  ? 'bg-[#d4af37] text-slate-950 shadow-md scale-105 ring-2 ring-amber-400/50'
                  : isUnlocked
                  ? 'bg-[#172236] hover:bg-[#20304c] text-amber-300 border border-amber-900/40 cursor-pointer hover:border-amber-500/50'
                  : 'bg-slate-900/40 text-slate-600 border border-slate-800/40 cursor-not-allowed opacity-40'
              }`}
              title={`${step.title} (${isUnlocked ? 'Відкрито' : 'Заблоковано'})`}
            >
              {isPassed && !isCurrent ? (
                <span className="text-[9px] text-emerald-400">✓</span>
              ) : !isUnlocked ? (
                <span className="text-[8px] opacity-70">🔒</span>
              ) : null}
              <span>{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Main Quest Interaction Body */}
      {!isCaseFinished ? (
        <div className="bg-[#121b2a] border-2 border-[#d4af37]/50 rounded-3xl p-4 sm:p-7 shadow-2xl flex-1 flex flex-col justify-between">
          <div>
            {/* Step Header & Timer */}
            <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3 mb-4">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#d4af37] uppercase">
                  {detectiveCase.title}
                </span>
                <h2 className="text-base sm:text-xl font-serif-vintage font-bold text-white mt-0.5">
                  {activeStep.title}
                </h2>
              </div>

              {/* Countdown Timer for Interrogation */}
              {timeLeft !== null && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-colors ${
                  timeLeft <= 10 
                    ? 'bg-red-950/60 border-red-500 text-red-400 animate-pulse' 
                    : 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                </div>
              )}
            </div>

            {/* COMIC STRIP: Detective Hercule Poirot */}
            <div className="flex items-start gap-3.5 mb-5 bg-gradient-to-r from-[#172338] to-[#101827] border-2 border-[#d4af37]/40 rounded-3xl p-3.5 sm:p-5 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:8px_8px]" />

              {/* Comic Portrait */}
              <div className="relative shrink-0">
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#8c6814] to-[#453106] p-0.5 shadow-xl">
                  <div className="w-full h-full bg-[#0a0f19] rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden border border-amber-900/50">
                    <span className="text-2xl sm:text-3xl filter drop-shadow-md">🕵️‍♂️</span>
                    <span className="text-[8px] font-mono uppercase tracking-wider text-[#d4af37] font-bold">Пуаро</span>
                  </div>
                </div>
                {/* Emotion Badge */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#121927] border border-[#d4af37] flex items-center justify-center text-[10px] sm:text-xs shadow-md">
                  {activeStep.poirotEmotion === 'speaking' ? '🗣️' :
                   activeStep.poirotEmotion === 'alert' ? '⚠️' :
                   activeStep.poirotEmotion === 'pleased' ? '✨' :
                   activeStep.poirotEmotion === 'shocked' ? '😱' : '🧠'}
                </div>
              </div>

              {/* Comic Speech Bubble */}
              <div className="flex-1 relative bg-[#fdfaf3] text-slate-900 rounded-2xl p-3 sm:p-4 shadow-md border-2 border-[#3d2a1d] font-serif">
                <div className="flex items-center justify-between gap-2 mb-1 border-b border-amber-900/20 pb-0.5">
                  <span className="font-serif-vintage font-bold text-xs text-amber-950">
                    Еркюль Пуаро:
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    {activeStep.type === 'theory_intro' ? '📖 Навчання слова' :
                     activeStep.type === 'trap_warning' ? (
                       <span className="text-red-600 font-bold flex items-center gap-0.5">
                         <AlertTriangle className="w-3 h-3 text-red-500 inline" /> Слово-пастка
                       </span>
                     ) :
                     activeStep.type === 'boss_interrogation' ? '⚖️ Фінальний допит' :
                     activeStep.type === 'sentence_assembly' ? '🧩 Відновлення записки' :
                     activeStep.type === 'crime_scene_search' ? '🔦 Обшук локації' :
                     activeStep.type === 'matching_pairs' ? '🧶 Зіставлення пар' :
                     activeStep.type === 'timeline_puzzle' ? '⏳ Хронологія подій' : '🔎 Практика'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                  «{activeStep.poirotCommentary || activeStep.instruction}»
                </p>
              </div>
            </div>

            {/* CASE 1: THEORY INTRO (FLASHCARD LEARNING) */}
            {activeStep.type === 'theory_intro' && activeStep.wordCard && (
              <div className="bg-gradient-to-b from-[#18263e] to-[#0e1626] border-2 border-[#d4af37]/60 rounded-3xl p-5 sm:p-7 shadow-2xl mb-4 font-serif-vintage animate-in fade-in">
                {/* Category & XP tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-amber-950/60 border border-[#d4af37]/40 text-[#f5d77f] rounded-full text-[11px] font-mono uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{activeStep.wordCard.category}</span>
                  </span>
                  <span className="text-xs font-mono text-[#d4af37] font-bold">
                    +{activeStep.xpReward} XP за вивчення
                  </span>
                </div>

                {/* Big Bulgarian Word */}
                <div className="text-center py-4 px-3 bg-[#0a0f18]/80 border border-slate-700/60 rounded-2xl mb-4">
                  <div className="text-2xl sm:text-4xl font-bold text-[#f5d77f] tracking-wide mb-1">
                    {activeStep.wordCard.wordBg}
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-cyan-300 mb-2">
                    {activeStep.wordCard.transcription}
                  </div>
                  <div className="text-sm sm:text-lg font-sans font-semibold text-emerald-400">
                    = {activeStep.wordCard.translationUa}
                  </div>
                </div>

                {/* Audio pronunciation button */}
                <div className="flex justify-center mb-4">
                  <button
                    onClick={handlePlayBulgarianAudio}
                    disabled={isPlayingAudio}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e5a93b] hover:from-[#e5c158] hover:to-[#f0b542] text-[#0a0e17] font-mono text-xs font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                    <span>{isPlayingAudio ? 'Озвучую болгарською...' : 'Слухати чисту вимову'}</span>
                  </button>
                </div>

                {/* Detective Tip */}
                <div className="p-3.5 bg-[#fbf7ee] text-slate-900 rounded-2xl border-2 border-amber-900/30 mb-3 shadow-inner flex items-start gap-2.5 text-xs sm:text-sm font-serif">
                  <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <b className="font-serif-vintage text-amber-950">Порада слідчого:</b> {activeStep.wordCard.detectiveTip}
                  </div>
                </div>

                {/* Example sentence */}
                {activeStep.wordCard.exampleSentence && (
                  <div className="p-3 rounded-xl bg-[#131d2f] border border-slate-700/80 text-xs font-mono text-slate-300">
                    <span className="text-amber-400 font-bold">🗣️ У реченні: </span>
                    <i>«{activeStep.wordCard.exampleSentence}»</i> — <span className="text-slate-200">{activeStep.wordCard.exampleTranslation}</span>
                  </div>
                )}

                {/* Confirm & Move forward */}
                <div className="mt-5 pt-4 border-t border-[#d4af37]/20">
                  <button
                    onClick={() => {
                      soundEngine.playStampThud();
                      soundEngine.playClueFound();
                      setTotalCaseXp(prev => prev + activeStep.xpReward);
                      handleNextStep();
                    }}
                    className="w-full py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-serif-vintage font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                  >
                    <span>Слово вивчено! Перейти до практики ➔</span>
                  </button>
                </div>
              </div>
            )}

            {/* SENTENCE ASSEMBLY (Reconstruct torn evidence) */}
            {activeStep.type === 'sentence_assembly' && activeStep.sentenceFragments && (
              <div className="bg-gradient-to-b from-[#18263e] to-[#0e1626] border-2 border-[#d4af37]/60 rounded-3xl p-5 sm:p-7 shadow-2xl mb-4 animate-in fade-in">
                {/* Instruction */}
                <div className="text-xs sm:text-sm text-slate-200 mb-3 font-sans leading-relaxed flex items-center gap-1.5">
                  <Puzzle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-amber-400 font-bold">Завдання:</span>
                  <span>{activeStep.instruction}</span>
                </div>

                {/* Target Translation Banner */}
                {activeStep.sentenceFragments.targetTranslation && (
                  <div className="mb-4 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3 shadow-inner">
                    <Target className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-semibold">
                        Цільова фраза для складання:
                      </div>
                      <div className="text-sm sm:text-base font-serif-vintage text-amber-100 font-bold mt-0.5">
                        {activeStep.sentenceFragments.targetTranslation}
                      </div>
                    </div>
                  </div>
                )}

                {/* Assembly Drop Zone */}
                <div className="mb-4">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1">📝 Відновлена записка:</span>
                    <span className="text-[10px] text-slate-500">(натисніть на слово, щоб повернути)</span>
                  </div>
                  <div className="min-h-[64px] p-3 bg-[#fbf7ee] border-2 border-amber-800/40 rounded-2xl flex flex-wrap gap-2 items-center shadow-inner rotate-[-0.2deg]">
                    {assembledWords.length === 0 ? (
                      <span className="text-xs italic text-amber-900/60 font-serif">
                        Натискайте на слова нижче у потрібному порядку, щоб зібрати фразу...
                      </span>
                    ) : (
                      assembledWords.map((word, idx) => {
                        const hint = activeStep.sentenceFragments?.wordHints?.[word];
                        return (
                          <button
                            key={`assembled-${idx}`}
                            onClick={() => handleRemoveWord(word, idx)}
                            disabled={isSentenceCorrect === true}
                            className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#d4af37] text-[#0a0e17] rounded-xl text-xs sm:text-sm font-bold font-serif-vintage shadow-md hover:bg-[#e5c158] transition-all active:scale-95 cursor-pointer border border-amber-700/50"
                          >
                            <span>{word}</span>
                            {hint && (
                              <span className="text-[10px] text-amber-950/70 font-mono font-medium">
                                ({hint})
                              </span>
                            )}
                            <span className="text-[10px] text-amber-900/60 group-hover:text-red-700 font-bold ml-0.5">✕</span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Available Word Chips */}
                <div className="mb-4">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <GripVertical className="w-3 h-3 text-amber-400" /> Доступні фрагменти:
                    </span>
                    <span className="text-[10px] text-slate-500">(натискайте по черзі)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availableWords.map((word, idx) => {
                      const hint = activeStep.sentenceFragments?.wordHints?.[word];
                      return (
                        <button
                          key={`available-${idx}`}
                          onClick={() => handleAddWord(word, idx)}
                          disabled={isSentenceCorrect === true}
                          className="group inline-flex flex-col items-center px-3.5 py-2 bg-[#172338] text-slate-200 rounded-xl text-xs sm:text-sm font-serif-vintage border-2 border-slate-600 hover:border-[#d4af37] hover:text-[#f5d77f] hover:bg-[#1d2d48] transition-all active:scale-95 cursor-pointer shadow-sm"
                        >
                          <span className="font-bold text-white group-hover:text-[#f5d77f]">{word}</span>
                          {hint && (
                            <span className="text-[10px] font-mono text-slate-400 group-hover:text-amber-300/90 mt-0.5">
                              {hint}
                            </span>
                          )}
                        </button>
                      );
                    })}
                    {availableWords.length === 0 && assembledWords.length > 0 && (
                      <span className="text-[10px] italic text-slate-500 py-2">Усі фрагменти використано</span>
                    )}
                  </div>
                </div>

                {/* Audio (if present) */}
                {activeStep.audioText && (
                  <div className="flex justify-center mb-4">
                    <button
                      onClick={handlePlayBulgarianAudio}
                      disabled={isPlayingAudio}
                      className="px-4 py-2 rounded-xl bg-[#172338] hover:bg-[#1d2d48] text-slate-300 font-mono text-xs flex items-center gap-2 border border-slate-600 transition-all cursor-pointer"
                    >
                      <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                      <span>{isPlayingAudio ? 'Озвучую...' : 'Послухати оригінал'}</span>
                    </button>
                  </div>
                )}

                {/* Check / Feedback */}
                {isSentenceCorrect === null ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCheckSentence}
                      disabled={assembledWords.length === 0}
                      className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#e5a93b] hover:from-[#e5c158] hover:to-[#f0b542] disabled:opacity-40 disabled:cursor-not-allowed text-[#0a0e17] font-serif-vintage font-bold text-sm shadow-xl transition-all active:scale-98 cursor-pointer"
                    >
                      Перевірити записку
                    </button>
                    <button
                      onClick={handleResetSentence}
                      className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition-all cursor-pointer"
                    >
                      Скинути
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in">
                    <div className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 text-xs sm:text-sm font-serif-vintage ${
                      isSentenceCorrect 
                        ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200' 
                        : 'bg-red-950/50 border-red-500 text-red-200'
                    }`}>
                      {isSentenceCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div className="leading-relaxed">{sentenceFeedback}</div>
                    </div>
                    {isSentenceCorrect ? (
                      <button
                        onClick={handleNextStep}
                        className="w-full py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-serif-vintage font-bold text-sm shadow-xl transition-all active:scale-98 cursor-pointer"
                      >
                        {currentStepIndex + 1 < detectiveCase.steps.length
                          ? 'Перейти до наступного етапу →'
                          : 'Завершити розслідування справи 🏆'}
                      </button>
                    ) : (
                      <button
                        onClick={handleResetSentence}
                        className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition-all cursor-pointer"
                      >
                        Спробувати відновити записку ще раз
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* CRIME SCENE SEARCH (Interactive room investigation) */}
            {activeStep.type === 'crime_scene_search' && activeStep.crimeScene && (
              <div className="bg-gradient-to-b from-[#18263e] to-[#0e1626] border-2 border-[#d4af37]/60 rounded-3xl p-5 sm:p-7 shadow-2xl mb-4 animate-in fade-in">
                {/* Instruction */}
                <div className="text-xs sm:text-sm text-slate-200 mb-4 font-sans leading-relaxed flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-amber-400 font-bold">Обшук:</span>
                  <span>{activeStep.instruction}</span>
                </div>

                {/* Scene Description */}
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-3">
                  📍 {activeStep.crimeScene.sceneDescription}
                </div>

                {/* Interactive Crime Scene Grid */}
                <div className="relative bg-[#0a0f18] border-2 border-[#d4af37]/60 rounded-2xl overflow-hidden mb-4 shadow-2xl" style={{ aspectRatio: '16/9' }}>
                  {/* Background illustration */}
                  {activeStep.crimeScene.backgroundImage && (
                    <img
                      src={activeStep.crimeScene.backgroundImage}
                      alt={activeStep.crimeScene.sceneDescription}
                      className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                    />
                  )}

                  {/* Atmospheric Noir Lighting Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none z-10" />

                  {/* Hotspot objects */}
                  {activeStep.crimeScene.hotspots.map((hotspot) => {
                    const isRevealed = revealedHotspots.has(hotspot.id);
                    const isActive = activeHotspot?.id === hotspot.id;
                    return (
                      <button
                        key={hotspot.id}
                        onClick={() => handleHotspotClick(hotspot)}
                        className={`absolute z-20 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center font-bold ${
                          isRevealed
                            ? hotspot.isEvidence
                              ? 'border-2 border-emerald-400 bg-emerald-950/85 text-emerald-200 shadow-xl shadow-emerald-500/40 ring-2 ring-emerald-300'
                              : 'border-2 border-amber-400/80 bg-[#0f172a]/85 text-amber-200 shadow-lg'
                            : 'border-2 border-dashed border-[#d4af37]/70 bg-black/40 hover:border-[#f5d77f] hover:bg-[#d4af37]/25 text-amber-300 hover:scale-105 shadow-md backdrop-blur-[1px]'
                        } ${isActive ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-105' : ''}`}
                        style={{
                          left: `${hotspot.position.x}%`,
                          top: `${hotspot.position.y}%`,
                          width: `${hotspot.position.width}%`,
                          height: `${hotspot.position.height}%`,
                        }}
                        title={isRevealed ? `${hotspot.wordBg} (${hotspot.translationUa})` : 'Натисніть для огляду'}
                      >
                        {isRevealed ? (
                          <span className="flex flex-col items-center gap-0.5 px-1 text-center">
                            <span className="text-xs sm:text-base">{hotspot.isEvidence ? '🔑' : '🔍'}</span>
                            <span className="text-[9px] sm:text-[11px] font-mono truncate max-w-full font-bold">{hotspot.wordBg}</span>
                          </span>
                        ) : (
                          <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 border border-[#d4af37]/80 text-[#f5d77f] shadow-lg animate-pulse">
                            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Hotspot Detail Card */}
                {activeHotspot && (
                  <div className={`p-4 rounded-2xl border-2 mb-4 animate-in fade-in ${
                    activeHotspot.isEvidence
                      ? 'bg-emerald-950/40 border-emerald-500'
                      : 'bg-[#172338] border-slate-600'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        {activeHotspot.isEvidence ? '🔑 КЛЮЧОВА УЛИКА ЗНАЙДЕНА!' : `🔍 ${activeHotspot.objectName}`}
                      </span>
                      {activeStep.audioText && (
                        <button
                          onClick={() => {
                            setIsPlayingAudio(true);
                            soundEngine.speakBulgarian(activeHotspot.wordBg, () => setIsPlayingAudio(false));
                          }}
                          className="px-2 py-1 rounded-lg bg-[#d4af37] text-[#0a0e17] font-mono text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Volume2 className={`w-3 h-3 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                          Вимова
                        </button>
                      )}
                    </div>
                    <div className="text-center py-2">
                      <div className="text-xl sm:text-2xl font-bold text-[#f5d77f] font-serif-vintage">{activeHotspot.wordBg}</div>
                      <div className="text-xs font-mono text-cyan-300">{activeHotspot.transcription}</div>
                      <div className="text-sm font-semibold text-emerald-400 mt-1">= {activeHotspot.translationUa}</div>
                    </div>
                    {activeHotspot.poirotHint && (
                      <div className="mt-2 p-2 rounded-xl bg-[#0a0f18] border border-slate-700 text-xs text-slate-300 font-serif italic">
                        🕵️♂️ Пуаро: «{activeHotspot.poirotHint}»
                      </div>
                    )}
                  </div>
                )}

                {/* Progress indicator */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-3">
                  <span>Обстежено: {revealedHotspots.size} / {activeStep.crimeScene.hotspots.length} об'єктів</span>
                  {foundEvidence && <span className="text-emerald-400 font-bold">✓ Ключову улику знайдено!</span>}
                </div>

                {/* Proceed button (only after finding evidence) */}
                {foundEvidence && (
                  <button
                    onClick={handleNextStep}
                    className="w-full py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-serif-vintage font-bold text-sm shadow-xl transition-all active:scale-98 cursor-pointer animate-in fade-in"
                  >
                    {currentStepIndex + 1 < detectiveCase.steps.length
                      ? 'Улику здобуто! Перейти далі →'
                      : 'Завершити розслідування справи 🏆'}
                  </button>
                )}
              </div>
            )}

            {/* MATCHING PAIRS (Connect Bulgarian and Ukrainian pairs with red yarn) */}
            {activeStep.type === 'matching_pairs' && activeStep.matchingPairs && (
              <div className="bg-gradient-to-b from-[#18263e] to-[#0e1626] border-2 border-[#d4af37]/60 rounded-3xl p-5 sm:p-7 shadow-2xl mb-4 animate-in fade-in">
                {/* Instruction */}
                <div className="text-xs sm:text-sm text-slate-200 mb-4 font-sans leading-relaxed flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-amber-400 font-bold">З'єднайте пари:</span>
                  <span>{activeStep.instruction}</span>
                </div>

                {/* Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  {/* Left Column: Bulgarian Words */}
                  <div className="space-y-2.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80 mb-1 flex items-center gap-1">
                      <span>🇧🇬 Болгарські поняття:</span>
                    </div>
                    {activeStep.matchingPairs.map((pair) => {
                      const isMatched = matchedPairIds.has(pair.id);
                      const isSelected = selectedBulgarianId === pair.id;

                      let btnStyle = 'border-slate-700 bg-[#152033] hover:border-[#d4af37] text-slate-200';
                      if (isMatched) {
                        btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300 opacity-80 cursor-default';
                      } else if (isSelected) {
                        btnStyle = pairMismatch
                          ? 'border-red-500 bg-red-950/40 text-red-200 ring-2 ring-red-500'
                          : 'border-[#d4af37] bg-[#223352] text-[#f5d77f] ring-2 ring-[#d4af37]';
                      }

                      return (
                        <button
                          key={`bg-${pair.id}`}
                          onClick={() => handleSelectBulgarian(pair.id)}
                          disabled={isMatched}
                          className={`w-full p-3 rounded-2xl border-2 font-serif-vintage text-xs sm:text-sm font-bold flex items-center justify-between transition-all duration-200 cursor-pointer ${btnStyle}`}
                        >
                          <span>{pair.bulgarian}</span>
                          {isMatched && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column: Shuffled Ukrainian Words */}
                  <div className="space-y-2.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/80 mb-1 flex items-center gap-1">
                      <span>🇺🇦 Український переклад:</span>
                    </div>
                    {shuffledUkrainian.map((item) => {
                      const isMatched = matchedPairIds.has(item.id);
                      const isSelected = selectedUkrainianId === item.id;

                      let btnStyle = 'border-slate-700 bg-[#152033] hover:border-[#d4af37] text-slate-200';
                      if (isMatched) {
                        btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-300 opacity-80 cursor-default';
                      } else if (isSelected) {
                        btnStyle = pairMismatch
                          ? 'border-red-500 bg-red-950/40 text-red-200 ring-2 ring-red-500'
                          : 'border-cyan-400 bg-[#1a2f4a] text-cyan-200 ring-2 ring-cyan-400';
                      }

                      return (
                        <button
                          key={`ua-${item.id}`}
                          onClick={() => handleSelectUkrainian(item.id)}
                          disabled={isMatched}
                          className={`w-full p-3 rounded-2xl border-2 font-sans text-xs sm:text-sm transition-all duration-200 cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.ukrainian}</span>
                            {isMatched && <span className="text-xs font-mono text-emerald-400">✓ З'єднано</span>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pairs Progress & Completion */}
                {matchedPairIds.size === activeStep.matchingPairs.length ? (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="p-3.5 rounded-2xl border-2 border-emerald-500 bg-emerald-950/40 text-emerald-200 flex items-center gap-2.5 text-xs sm:text-sm font-serif-vintage">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>Усі пари з'єднані червоною ниткою дедукції! Чудова спостережливість!</span>
                    </div>
                    <button
                      onClick={handleNextStep}
                      className="w-full py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-serif-vintage font-bold text-sm shadow-xl transition-all active:scale-98 cursor-pointer"
                    >
                      {currentStepIndex + 1 < detectiveCase.steps.length
                        ? 'Перейти до наступного етапу →'
                        : 'Завершити розслідування справи 🏆'}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>З'єднано ниткою: {matchedPairIds.size} / {activeStep.matchingPairs.length}</span>
                    <span className="text-[#f5d77f]">Оберіть болгарське слово, потім його переклад</span>
                  </div>
                )}
              </div>
            )}

            {/* TIMELINE PUZZLE (Chronological event reconstruction) */}
            {activeStep.type === 'timeline_puzzle' && activeStep.timelineEvents && (
              <div className="bg-gradient-to-b from-[#18263e] to-[#0e1626] border-2 border-[#d4af37]/60 rounded-3xl p-5 sm:p-7 shadow-2xl mb-4 animate-in fade-in">
                {/* Instruction */}
                <div className="text-xs sm:text-sm text-slate-200 mb-4 font-sans leading-relaxed flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-amber-400 font-bold">Хронологія:</span>
                  <span>{activeStep.instruction}</span>
                </div>

                {/* Timeline Events List */}
                <div className="space-y-3 mb-5">
                  {timelineEvents.map((ev, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === timelineEvents.length - 1;

                    return (
                      <div
                        key={ev.id}
                        className="p-3 sm:p-4 rounded-2xl border-2 border-slate-700 bg-[#152033] flex items-center justify-between gap-3 shadow-md hover:border-[#d4af37]/70 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-7 h-7 rounded-xl bg-slate-800 border border-[#d4af37]/40 font-mono text-xs font-bold text-[#f5d77f] flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="font-serif-vintage font-bold text-xs sm:text-sm text-[#f5d77f]">
                              {ev.textBg}
                            </div>
                            <div className="text-[11px] sm:text-xs text-slate-300 font-sans mt-0.5">
                              {ev.textUa}
                            </div>
                          </div>
                        </div>

                        {/* Up / Down Controls */}
                        {!isTimelineCorrect && (
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleMoveTimelineItem(idx, 'up')}
                              disabled={isFirst}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-colors"
                              title="Перемістити раніше"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleMoveTimelineItem(idx, 'down')}
                              disabled={isLast}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 transition-colors"
                              title="Перемістити пізніше"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Validation Actions */}
                {!isTimelineSubmitted ? (
                  <button
                    onClick={handleCheckTimeline}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#e5a93b] hover:from-[#e5c158] hover:to-[#f0b542] text-[#0a0e17] font-serif-vintage font-bold text-sm sm:text-base shadow-xl transition-all active:scale-98 cursor-pointer"
                  >
                    Звірити хронологію подій
                  </button>
                ) : (
                  <div className="space-y-3 animate-in fade-in">
                    <div className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 text-xs sm:text-sm font-serif-vintage ${
                      isTimelineCorrect
                        ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                        : 'bg-red-950/50 border-red-500 text-red-200'
                    }`}>
                      {isTimelineCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div className="leading-relaxed">{timelineFeedback}</div>
                    </div>

                    {isTimelineCorrect ? (
                      <button
                        onClick={handleNextStep}
                        className="w-full py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-serif-vintage font-bold text-sm shadow-xl transition-all active:scale-98 cursor-pointer"
                      >
                        {currentStepIndex + 1 < detectiveCase.steps.length
                          ? 'Перейти до наступного етапу →'
                          : 'Завершити розслідування справи 🏆'}
                      </button>
                    ) : (
                      <button
                        onClick={handleResetTimeline}
                        className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition-all cursor-pointer"
                      >
                        Спробувати відновити порядок знову
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* WITNESS / SUSPECT DIALOGUE (FOR OTHER STEP TYPES) */}
            {activeStep.type !== 'theory_intro' && activeStep.type !== 'sentence_assembly' && activeStep.type !== 'crime_scene_search' && activeStep.type !== 'matching_pairs' && activeStep.type !== 'timeline_puzzle' && (
              <>
                {/* Character Speech Bar if testimony / interrogation */}
                {activeStep.characterName !== 'Еркюль Пуаро' && (
                  <div className="flex items-start gap-3.5 bg-[#0a0f18] border border-slate-700/80 rounded-2xl p-3.5 sm:p-4 mb-4 shadow-inner">
                    <div className="w-12 h-12 rounded-2xl bg-[#18263a] border border-[#d4af37]/40 flex items-center justify-center text-2xl shrink-0 shadow-md">
                      {activeStep.characterAvatar}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-serif-vintage font-bold text-xs sm:text-sm text-[#e5c158]">
                            {activeStep.characterName}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400">
                            {activeStep.characterRole}
                          </span>
                        </div>

                        {activeStep.audioText && (
                          <button
                            onClick={handlePlayBulgarianAudio}
                            disabled={isPlayingAudio}
                            className="px-2.5 py-1 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-mono text-xs font-bold flex items-center gap-1 shadow-md active:scale-95 transition-all"
                          >
                            <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                            <span>{isPlayingAudio ? 'Звучить...' : 'Слухати'}</span>
                          </button>
                        )}
                      </div>

                      {activeStep.audioText && (
                        <div className="mt-2 p-2.5 rounded-xl bg-[#141d2d] border border-slate-700 text-xs sm:text-sm text-slate-200 font-serif italic leading-relaxed">
                          «{activeStep.audioText}»
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Clue Note Snippet if present */}
                {activeStep.clueSnippet && (
                  <div className="bg-[#fbf7ee] text-slate-900 border-2 border-amber-800/40 rounded-2xl p-3.5 sm:p-5 mb-4 shadow-lg rotate-[-0.5deg] font-serif-vintage">
                    <div className="text-[10px] font-mono text-amber-900 uppercase font-bold tracking-wider mb-1 flex items-center justify-between">
                      <span>📌 {activeStep.clueSnippet.label}</span>
                      <span>Автор: {activeStep.clueSnippet.noteAuthor}</span>
                    </div>
                    <div className="text-xs sm:text-sm italic font-serif text-slate-900 border-l-2 border-amber-800 pl-3 my-1.5 leading-relaxed">
                      {activeStep.clueSnippet.text}
                    </div>
                  </div>
                )}

                {/* Question Instruction */}
                <div className="text-xs sm:text-sm text-slate-200 mb-3 font-sans leading-relaxed flex items-center gap-1.5">
                  <span className="text-amber-400 font-bold">Завдання:</span>
                  <span>{activeStep.instruction}</span>
                </div>

                {/* Multiple Choice Options */}
                {activeStep.options && (
                  <div className="space-y-2.5 font-sans">
                    {activeStep.options.map((opt, idx) => {
                      const isSelected = selectedOptionId === opt.id;
                      let borderClass = 'border-slate-700 hover:border-[#d4af37]';
                      let bgClass = 'bg-[#152033] hover:bg-[#1c2c47]';

                      if (isAnswerSubmitted) {
                        if (opt.isCorrect) {
                          borderClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
                        } else if (isSelected && !opt.isCorrect) {
                          borderClass = 'border-red-500 bg-red-950/40 text-red-200';
                        } else {
                          borderClass = 'border-slate-800 opacity-50';
                        }
                      } else if (isSelected) {
                        borderClass = 'border-[#d4af37] bg-[#1d2d48] text-white shadow-md';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(opt.id)}
                          disabled={isAnswerSubmitted}
                          className={`w-full p-3 sm:p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition-all flex items-start gap-3 active:scale-[0.99] cursor-pointer ${borderClass} ${bgClass}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-[#f5d77f] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="leading-relaxed">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Action Footer for Practice / Interrogation steps */}
          {activeStep.type !== 'theory_intro' && activeStep.type !== 'sentence_assembly' && activeStep.type !== 'crime_scene_search' && activeStep.type !== 'matching_pairs' && activeStep.type !== 'timeline_puzzle' && (
            <div className="mt-5 pt-4 border-t border-[#d4af37]/20">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOptionId}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#e5a93b] hover:from-[#e5c158] hover:to-[#f0b542] disabled:opacity-40 disabled:cursor-not-allowed text-[#0a0e17] font-serif-vintage font-bold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <span>Пред'явити дедуктивний висновок</span>
                </button>
              ) : (
                <div className="space-y-3 animate-in fade-in">
                  {/* Feedback Box */}
                  <div className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 text-xs sm:text-sm font-serif-vintage ${
                    isCorrect 
                      ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200' 
                      : 'bg-red-950/50 border-red-500 text-red-200'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div className="leading-relaxed">
                      {feedbackText}
                    </div>
                  </div>

                  {/* Next Step or Retry */}
                  {isCorrect ? (
                    <button
                      onClick={handleNextStep}
                      className="w-full py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-serif-vintage font-bold text-sm sm:text-base shadow-xl transition-all active:scale-98 cursor-pointer"
                    >
                      {currentStepIndex + 1 < detectiveCase.steps.length 
                        ? 'Перейти до наступного етапу →' 
                        : 'Завершити розслідування справи 🏆'}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        soundEngine.playTypewriter();
                        setIsAnswerSubmitted(false);
                        setSelectedOptionId(null);
                        if (activeStep?.timeLimitSeconds) {
                          setTimeLeft(activeStep.timeLimitSeconds);
                        }
                      }}
                      className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition-all cursor-pointer"
                    >
                      Спробувати ще раз розбити алібі
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Final Victory Dossier */
        <div className="bg-[#fbf7ee] text-slate-900 border-4 border-[#d4af37] rounded-3xl p-6 sm:p-10 shadow-2xl text-center max-w-2xl mx-auto w-full animate-in zoom-in-95 font-serif-vintage">
          <div className="w-16 h-16 rounded-full wax-seal text-amber-200 mx-auto mb-4 flex items-center justify-center text-3xl shadow-xl">
            ⚖️
          </div>

          <div className="text-xs font-mono text-red-800 uppercase tracking-widest font-bold mb-1">
            СПРАВУ РОЗКРИТО ТА ЗАКРИТО
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Тріумф «сірих клітинок» Пуаро!
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto mb-6 leading-relaxed">
            {detectiveCase.id === 'case-01-missing-suitcase' || detectiveCase.id === 'case-01-missing-key'
              ? 'Ви блискуче розкрили таємницю Центральної гари, вивчили болгарські вітання, розклад і час, розгадали пастки «направо = прямо» та «гора = ліс», знайшли дипломатичну валізу та приперли портьє Георгі до стіни!'
              : detectiveCase.id === 'case-02-orient-express'
              ? 'Ви успішно розкрили таємницю Східного Експресу, розібралися у пастках страв і меблів («маса/стол», «диня = кавун»), розкусили алібі в лісі («гора»), розшифрували записку про наречену («булка») та повернули коштовний сапфір пані Даниловій!'
              : `Ви блискуче завершили розслідування справи «${detectiveCase.title}», зібрали всі речові докази та довели перевагу дедуктивного методу Пуаро!`}
          </p>

          <div className="grid grid-cols-3 gap-3 bg-[#f0e6d2] p-4 rounded-2xl border border-amber-900/20 mb-6 text-slate-800 font-mono text-xs">
            <div className="flex flex-col items-center">
              <Sparkles className="w-5 h-5 text-amber-600 mb-1" />
              <span className="font-bold text-sm text-amber-950">+{totalCaseXp} XP</span>
              <span className="text-[10px] text-slate-600">Дедуктивний досвід</span>
            </div>
            <div className="flex flex-col items-center">
              <Key className="w-5 h-5 text-amber-700 mb-1" />
              <span className="font-bold text-xs text-amber-950">{detectiveCase.rewardItem}</span>
              <span className="text-[10px] text-slate-600">Речовий доказ</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-700 mb-1" />
              <span className="font-bold text-xs text-emerald-950">+1 Алібі</span>
              <span className="text-[10px] text-slate-600">Заморозка серії</span>
            </div>
          </div>

          <button
            onClick={handleFinishAndClaim}
            className="w-full py-4 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-serif-vintage font-bold text-base shadow-xl transition-all active:scale-95 cursor-pointer"
          >
            Занести докази до Особистої справи
          </button>
        </div>
      )}

      {/* Exhausted Attempts Modal (Poirot encourages taking a breath) */}
      {showExhaustedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#121a28] border-2 border-[#d4af37] rounded-3xl p-6 max-w-md w-full shadow-2xl text-center font-serif">
            <div className="text-4xl mb-3">🕵️‍♂️🧠</div>
            <h3 className="font-serif-vintage font-bold text-lg text-[#f5d77f] mb-2">
              «Mon cher ami! Сірі клітинки втомилися!»
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              Навіть найвидатніший детектив робить помилки. Зробіть глибокий вдих, прислухайтеся до інтуїції Пуаро та спробуйте ще раз!
            </p>
            <button
              onClick={() => {
                soundEngine.playPageTurn();
                setAttemptsLeft(3);
                setShowExhaustedModal(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#e5a93b] hover:from-[#e5c158] hover:to-[#f0b542] text-[#0a0e17] font-bold text-sm font-serif-vintage shadow-xl transition-all cursor-pointer"
            >
              Перевести подих (+3 спроби) ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
