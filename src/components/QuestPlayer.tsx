import React, { useState, useEffect } from 'react';
import type { DetectiveCase } from '../data/curriculum';
import type { DetectiveProfile } from '../services/supabase';
import { soundEngine } from '../services/soundEngine';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Volume2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  Key, 
  Sparkles 
} from 'lucide-react';

interface QuestPlayerProps {
  detectiveCase: DetectiveCase;
  profile: DetectiveProfile;
  onExit: () => void;
  onCompleteCase: (earnedXp: number, rewardItem: string, badge: string) => void;
}

export const QuestPlayer: React.FC<QuestPlayerProps> = ({
  detectiveCase,
  onExit,
  onCompleteCase,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [totalCaseXp, setTotalCaseXp] = useState(0);
  const [isCaseFinished, setIsCaseFinished] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
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

  const handleTimeOut = () => {
    soundEngine.playTrapError();
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

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    soundEngine.playTypewriter();
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !activeStep) return;

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
      soundEngine.playTrapError();
      setIsCorrect(false);
      setFeedbackText(chosenOption.feedback);
    }
  };

  const handleNextStep = () => {
    soundEngine.playTypewriter();
    if (currentStepIndex + 1 < detectiveCase.steps.length) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Finished all stages!
      setIsCaseFinished(true);
      soundEngine.playVictory();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffffff', '#e53e3e', '#1e293b'],
      });
    }
  };

  const handleFinishAndClaim = () => {
    soundEngine.playStampThud();
    onCompleteCase(totalCaseXp, detectiveCase.rewardItem, detectiveCase.badgeReward);
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 flex flex-col justify-between selection:bg-[#d4af37] selection:text-black">
      {/* Top Header / Progress Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => {
            soundEngine.playTypewriter();
            onExit();
          }}
          className="p-2 sm:px-3 sm:py-2 bg-[#172236] hover:bg-[#20304c] text-slate-300 rounded-xl flex items-center gap-1.5 text-xs font-mono border border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Повернутися на дошку</span>
        </button>

        {/* Quest Step Dots */}
        <div className="flex items-center gap-2">
          {detectiveCase.steps.map((step, idx) => (
            <div
              key={step.id}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx < currentStepIndex
                  ? 'w-8 bg-emerald-500'
                  : idx === currentStepIndex
                  ? 'w-10 bg-[#d4af37] ring-2 ring-[#d4af37]/40'
                  : 'w-4 bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Earned XP */}
        <div className="font-mono text-xs text-[#f5d77f] bg-[#d4af37]/15 px-3 py-1.5 rounded-xl border border-[#d4af37]/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+{totalCaseXp} XP</span>
        </div>
      </div>

      {/* Main Quest Interaction Body */}
      {!isCaseFinished ? (
        <div className="bg-[#121b2a] border-2 border-[#d4af37]/50 rounded-3xl p-5 sm:p-8 shadow-2xl flex-1 flex flex-col justify-between">
          <div>
            {/* Step Category & Timer if Interrogation */}
            <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-4 mb-5">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase">
                  {detectiveCase.title}
                </span>
                <h2 className="text-lg sm:text-xl font-serif-vintage font-bold text-white mt-0.5">
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

            {/* Suspect / Witness Card & Speech */}
            <div className="flex items-start gap-4 bg-[#0a0f18] border border-slate-700/80 rounded-2xl p-4 sm:p-5 mb-6 shadow-inner">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#18263a] border border-[#d4af37]/40 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-md">
                {activeStep.characterAvatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif-vintage font-bold text-sm sm:text-base text-[#e5c158]">
                      {activeStep.characterName}
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">
                      {activeStep.characterRole}
                    </span>
                  </div>

                  {/* Audio Playback button */}
                  {activeStep.audioText && (
                    <button
                      onClick={handlePlayBulgarianAudio}
                      disabled={isPlayingAudio}
                      className="px-3 py-1.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-mono text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                    >
                      <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                      <span>{isPlayingAudio ? 'Звучить...' : 'Слухати'}</span>
                    </button>
                  )}
                </div>

                {/* Spoken quote in Bulgarian */}
                {activeStep.audioText && (
                  <div className="mt-3 p-3 rounded-xl bg-[#141d2d] border border-slate-700 text-xs sm:text-sm text-slate-200 font-serif italic leading-relaxed">
                    «{activeStep.audioText}»
                  </div>
                )}
              </div>
            </div>

            {/* Written Evidence / Note Snippet if present */}
            {activeStep.clueSnippet && (
              <div className="bg-[#fbf7ee] text-slate-900 border-2 border-amber-800/40 rounded-2xl p-4 sm:p-5 mb-6 shadow-lg rotate-[-0.5deg] font-serif-vintage">
                <div className="text-[10px] font-mono text-amber-900 uppercase font-bold tracking-wider mb-1 flex items-center justify-between">
                  <span>📌 {activeStep.clueSnippet.label}</span>
                  <span>Автор: {activeStep.clueSnippet.noteAuthor}</span>
                </div>
                <div className="text-sm sm:text-base italic font-serif text-slate-900 border-l-2 border-amber-800 pl-3 my-2 leading-relaxed">
                  {activeStep.clueSnippet.text}
                </div>
              </div>
            )}

            {/* Instruction */}
            <p className="text-xs sm:text-sm text-slate-300 mb-4 font-sans leading-relaxed">
              👉 {activeStep.instruction}
            </p>

            {/* Multiple Choice Deductive Options */}
            <div className="space-y-3 font-sans">
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
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition-all flex items-start gap-3 active:scale-[0.99] ${borderClass} ${bgClass}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-[#f5d77f] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Action Footer */}
          <div className="mt-6 pt-5 border-t border-[#d4af37]/20">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOptionId}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#e5a93b] hover:from-[#e5c158] hover:to-[#f0b542] disabled:opacity-40 disabled:cursor-not-allowed text-[#0a0e17] font-serif-vintage font-bold text-base shadow-xl flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>Пред'явити дедуктивний висновок</span>
              </button>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                {/* Result Feedback Banner */}
                <div className={`p-4 rounded-2xl border-2 flex items-start gap-3 text-xs sm:text-sm font-serif-vintage ${
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

                {/* Continue or Retry button */}
                {isCorrect ? (
                  <button
                    onClick={handleNextStep}
                    className="w-full py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-serif-vintage font-bold text-base shadow-xl transition-all active:scale-98"
                  >
                    {currentStepIndex + 1 < detectiveCase.steps.length 
                      ? 'Перейти до наступного доказу →' 
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
                    className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition-all"
                  >
                    Спробувати ще раз розбити алібі
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Victory & Case Solved Dossier */
        <div className="bg-[#fbf7ee] text-slate-900 border-4 border-[#d4af37] rounded-3xl p-6 sm:p-10 shadow-2xl text-center max-w-2xl mx-auto w-full animate-in zoom-in-95">
          {/* Wax Seal */}
          <div className="w-16 h-16 rounded-full wax-seal text-amber-200 mx-auto mb-4 flex items-center justify-center text-3xl shadow-xl">
            ⚖️
          </div>

          <div className="text-xs font-mono text-red-800 uppercase tracking-widest font-bold mb-1">
            СПРАВУ РОЗКРИТО ТА ЗАКРИТО
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-vintage font-bold text-slate-900 mb-2">
            Тріумф «сірих клітинок» Пуаро!
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto mb-6 font-serif leading-relaxed">
            Ви бездоганно розшифрували показання портьє Бояна болгарською мовою, оминули пастку «направо = прямо» та змусили злочинця капітулювати перед фактами!
          </p>

          {/* Reward Badges Box */}
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
            className="w-full py-4 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-serif-vintage font-bold text-base shadow-xl transition-all active:scale-95"
          >
            Занести докази до Особистої справи
          </button>
        </div>
      )}
    </div>
  );
};
