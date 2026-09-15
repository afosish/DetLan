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
  Sparkles,
  BookOpen,
  Lightbulb,
  AlertTriangle
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
      // Finished all 15 stages!
      setIsCaseFinished(true);
      soundEngine.playVictory();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffffff', '#e53e3e', '#1e293b'],
      });
    }
  };

  const handleFinishAndClaim = () => {
    soundEngine.playStampThud();
    onCompleteCase(totalCaseXp, detectiveCase.rewardItem, detectiveCase.badgeReward);
  };

  const progressPercent = Math.round(((currentStepIndex + 1) / detectiveCase.steps.length) * 100);

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full p-3 sm:p-6 flex flex-col justify-between selection:bg-[#d4af37] selection:text-black">
      {/* Top Header / Progress Bar */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <button
          onClick={() => {
            soundEngine.playTypewriter();
            onExit();
          }}
          className="p-2 sm:px-3 sm:py-2 bg-[#172236] hover:bg-[#20304c] text-slate-300 rounded-xl flex items-center gap-1.5 text-xs font-mono border border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Дошка справ</span>
        </button>

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

        {/* Earned XP */}
        <div className="font-mono text-xs text-[#f5d77f] bg-[#d4af37]/15 px-3 py-1.5 rounded-xl border border-[#d4af37]/30 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>+{totalCaseXp} XP</span>
        </div>
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
                     activeStep.type === 'boss_interrogation' ? '⚖️ Фінальний допит' : '🔎 Практика'}
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

            {/* WITNESS / SUSPECT DIALOGUE (FOR OTHER STEP TYPES) */}
            {activeStep.type !== 'theory_intro' && (
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
          {activeStep.type !== 'theory_intro' && (
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
            Ви пройшли всі 15 рівнів розслідування в Гранд-Готелі «Балкан», вивчили болгарські вітання, номери, час, знешкодили пастку напрямку («направо = прямо») та притиснули портьє до стіни бездоганною дедукцією!
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
    </div>
  );
};
