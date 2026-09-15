import React, { useState } from 'react';
import { TRAP_WORDS } from '../data/curriculum';
import { soundEngine } from '../services/soundEngine';
import { X, CheckCircle2, XCircle, Volume2 } from 'lucide-react';

interface DailyTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardXp: (xp: number) => void;
}

export const DailyTrainingModal: React.FC<DailyTrainingModalProps> = ({
  isOpen,
  onClose,
  onAwardXp,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [awarded, setAwarded] = useState(false);

  if (!isOpen) return null;

  const word = TRAP_WORDS[currentIndex % TRAP_WORDS.length];

  const options = [
    { text: word.trueMeaning, isCorrect: true },
    { text: word.falseMeaning, isCorrect: false },
    { text: 'зовсім інше значення', isCorrect: false },
  ].sort(() => 0.5 - Math.random());

  const handleSelect = (idx: number, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (isCorrect) {
      soundEngine.playClueFound();
      if (!awarded) {
        onAwardXp(10);
        setAwarded(true);
      }
    } else {
      soundEngine.playTrapError();
    }
  };

  const handleNext = () => {
    soundEngine.playTypewriter();
    setIsAnswered(false);
    setSelectedOpt(null);
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#121927] border-2 border-[#d4af37] text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col font-serif-vintage">
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

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#1e2a3f] border border-[#d4af37]/40 mx-auto mb-2 flex items-center justify-center text-2xl shadow-inner">
            ⚡
          </div>
          <h3 className="text-xl font-bold text-[#f5d77f]">
            Щоденна зачіпка слідчого
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Тренуйте «сірі клітинки» щодня та зберігайте свій слід активності (+10 XP)
          </p>
        </div>

        {/* Challenge Card */}
        <div className="bg-[#0b1019] border border-slate-700/80 rounded-2xl p-4 text-center mb-5">
          <div className="text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-1">
            Як перекладається болгарське слово:
          </div>
          <div className="text-3xl font-bold text-white flex items-center justify-center gap-2 my-2">
            <span>«{word.bulgarian}»</span>
            <button
              onClick={() => soundEngine.speakBulgarian(word.bulgarian)}
              className="p-1.5 rounded-lg bg-[#1a2538] hover:bg-[#25344d] text-[#d4af37]"
              title="Озвучити"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs text-slate-400 italic">
            "{word.exampleSentence}"
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2.5 font-sans mb-5">
          {options.map((opt, idx) => {
            const isChosen = selectedOpt === idx;
            let cls = 'bg-[#182335] hover:bg-[#1f2d44] border-slate-700';

            if (isAnswered) {
              if (opt.isCorrect) {
                cls = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
              } else if (isChosen) {
                cls = 'bg-red-950/50 border-red-500 text-red-200';
              } else {
                cls = 'bg-[#101724] border-slate-800 opacity-40';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx, opt.isCorrect)}
                disabled={isAnswered}
                className={`w-full p-3.5 rounded-xl border-2 text-left text-sm transition-all flex items-center justify-between ${cls}`}
              >
                <span>{opt.text}</span>
                {isAnswered && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isAnswered && isChosen && !opt.isCorrect && <XCircle className="w-4 h-4 text-red-400" />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="space-y-3 animate-in fade-in">
            <p className="text-xs text-slate-300 bg-[#162133] p-3 rounded-xl border border-slate-700 leading-relaxed font-serif">
              💡 {word.explanation}
            </p>

            <button
              onClick={handleNext}
              className="w-full py-3 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-serif-vintage font-bold text-sm shadow-md transition-all active:scale-95"
            >
              Наступне тренування →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
