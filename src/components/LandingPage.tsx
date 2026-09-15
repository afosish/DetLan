import React, { useState } from 'react';
import { soundEngine } from '../services/soundEngine';
import { TRAP_WORDS } from '../data/curriculum';
import { ArrowRight, Play } from 'lucide-react';

interface LandingPageProps {
  onStartGame: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartGame, onOpenAuth }) => {
  const [selectedTrapIndex, setSelectedTrapIndex] = useState(0);
  const [revealedTrap, setRevealedTrap] = useState(false);

  const activeTrap = TRAP_WORDS[selectedTrapIndex];

  const handleTestTrap = (isCorrectGuess: boolean) => {
    if (isCorrectGuess) {
      soundEngine.playClueFound();
    } else {
      soundEngine.playTrapError();
    }
    setRevealedTrap(true);
  };

  const handleNextTrap = () => {
    soundEngine.playTypewriter();
    setRevealedTrap(false);
    setSelectedTrapIndex((prev) => (prev + 1) % TRAP_WORDS.length);
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col selection:bg-[#d4af37] selection:text-black">
      {/* Top Banner with Poirot Motto */}
      <div className="bg-[#121926] border-b border-[#d4af37]/20 py-2 px-4 text-center text-xs sm:text-sm font-typewriter text-[#e5c158]/90 tracking-wide flex items-center justify-center gap-2">
        <span>🔎</span>
        <span>«Порядок, метод і маленькі сірі клітинки» — Еркюль Пуаро</span>
        <span className="hidden sm:inline">| A1–A2 Болгарська мова</span>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        {/* Subtle decorative Art Deco background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#d4af37]/15 via-blue-900/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Vintage Stamp Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172236] border border-[#d4af37]/40 shadow-lg text-xs font-mono text-[#f5d77f] mb-6 animate-pulse-glow">
          <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
          <span>СЕКРЕТНИЙ АРХІВ СЛІДЧОГО БЮРО</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-vintage font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#fbf7ee] via-[#d4af37] to-[#e5a93b] max-w-4xl leading-[1.15] mb-6">
          Вивчайте болгарську мову як детектив Агати Крісті
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8">
          Забудьте про сухі підручники та нескінченне зубріння. Кожне нове правило тут — це доказ, кожен діалог — допит свідка, а кожна пастка перекладу — ключ до викриття злочинця.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-md mb-12">
          <button
            onClick={() => {
              soundEngine.playClueFound();
              onStartGame();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c99f2b] hover:from-[#e5c158] hover:to-[#dfab35] text-[#0a0e17] font-serif-vintage font-bold text-base sm:text-lg shadow-xl hover:shadow-[#d4af37]/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Розпочати розслідування</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              soundEngine.playTypewriter();
              onOpenAuth();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#141e30] hover:bg-[#1a2840] border border-[#d4af37]/40 text-[#f5d77f] font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Вхід через Google</span>
          </button>
        </div>

        {/* Interactive Trap Tester: Mini Game directly on landing */}
        <div className="w-full max-w-2xl bg-[#121c2d] border-2 border-[#d4af37]/50 rounded-3xl p-5 sm:p-7 shadow-2xl relative text-left">
          <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              <div>
                <h3 className="text-sm sm:text-base font-serif-vintage font-bold text-[#f5d77f]">
                  Інтерактивний тест: Знешкодьте підступне слово-пастку
                </h3>
                <p className="text-xs text-slate-400">
                  Перевірте ваші «сірі клітинки» перед початком слідства
                </p>
              </div>
            </div>
            <button
              onClick={handleNextTrap}
              className="text-xs text-[#d4af37] hover:underline font-mono"
            >
              Наступне слово →
            </button>
          </div>

          <div className="bg-[#0b111c] border border-slate-700/80 rounded-2xl p-4 mb-4">
            <div className="text-xs font-mono text-[#d4af37] uppercase tracking-wider mb-1">
              Болгарське слово у свідченні свідка:
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-vintage text-white flex items-center gap-3">
              <span>«{activeTrap.bulgarian}»</span>
              <button
                onClick={() => soundEngine.speakBulgarian(activeTrap.bulgarian)}
                className="p-1.5 bg-[#1e2a3f] hover:bg-[#283854] text-[#d4af37] rounded-lg text-xs flex items-center gap-1 border border-[#d4af37]/30 transition-colors"
                title="Озвучити болгарською"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="text-[11px] font-mono">Вимова</span>
              </button>
            </div>
            <div className="text-xs text-slate-400 mt-2 font-mono">
              Приклад: <i>"{activeTrap.exampleSentence}"</i>
            </div>
          </div>

          {!revealedTrap ? (
            <div>
              <p className="text-xs sm:text-sm text-slate-300 mb-3">
                Що насправді має на увазі болгарин, коли вживає це слово?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleTestTrap(false)}
                  className="p-3 rounded-xl bg-[#172236] hover:bg-[#1f2d45] border border-slate-700 hover:border-red-500/50 text-left text-xs sm:text-sm text-slate-200 transition-all active:scale-[0.98] group flex items-start gap-2"
                >
                  <span className="text-slate-400 group-hover:text-red-400 font-bold">A.</span>
                  <span>{activeTrap.falseMeaning} (очевидна схожість)</span>
                </button>

                <button
                  onClick={() => handleTestTrap(true)}
                  className="p-3 rounded-xl bg-[#172236] hover:bg-[#1f2d45] border border-slate-700 hover:border-[#d4af37] text-left text-xs sm:text-sm text-slate-200 transition-all active:scale-[0.98] group flex items-start gap-2"
                >
                  <span className="text-slate-400 group-hover:text-[#d4af37] font-bold">B.</span>
                  <span className="font-semibold text-[#f5d77f]">{activeTrap.trueMeaning} (справжнє значення)</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#18263a] border border-[#d4af37]/40 rounded-2xl p-4 animate-in fade-in zoom-in-95">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <div className="text-sm font-bold text-[#e5c158] mb-1">
                    Розбір дедуктивного доказу:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-2">
                    {activeTrap.explanation}
                  </p>
                  {activeTrap.correctCounterpart && (
                    <div className="text-xs text-amber-300 font-mono bg-amber-950/40 p-2 rounded-lg border border-amber-500/30">
                      ℹ️ Як сказати те, про що ви спершу подумали: <b>{activeTrap.correctCounterpart}</b>
                    </div>
                  )}
                  <button
                    onClick={handleNextTrap}
                    className="mt-3 px-3 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>Спробувати іншу зачіпку</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Feature Pillars: Why DetLan Works */}
      <section className="py-12 bg-[#0c121e] border-y border-[#d4af37]/20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-serif-vintage font-bold text-[#fbf7ee] mb-3">
              Гейміфікація детективного розуму
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Подолання прокрастинації, мовного бар'єру та підступних помилок через логіку та азарт розслідування
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-[#121b2b] border border-[#2b3c5a] hover:border-[#d4af37]/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 text-[#f5d77f] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🕵️‍♂️
                </div>
                <h3 className="text-lg font-serif-vintage font-bold text-white mb-2">
                  Сюжетні епізоди замість уроків
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ви потрапляєте у закритий готель чи нічний експрес. Персонал говорить лише болгарською. Вивчаючи граматику та слова, ви складаєте хронологію злочину та знаходите розбіжності в алібі.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-[#d4af37] flex items-center gap-1">
                <span>+15 XP за кожен розкритий доказ</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-[#121b2b] border border-[#2b3c5a] hover:border-[#d4af37]/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  ⚖️
                </div>
                <h3 className="text-lg font-serif-vintage font-bold text-white mb-2">
                  Фінальні очні ставки (Боси теми)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Наприкінці кожного модуля на вас чекає допит головного підозрюваного на час. Ви повинні болгарською мовою пред'явити речові докази та зловити свідка на брехні.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-red-400 flex items-center gap-1">
                <span>Захист від списування через перекладач</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl bg-[#121b2b] border border-[#2b3c5a] hover:border-[#d4af37]/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-300 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <h3 className="text-lg font-serif-vintage font-bold text-white mb-2">
                  Система «Алібі» проти вигорання
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Пропустили день через життєві справи? Збережіть свою серію (Streak) за допомогою зароблених «Алібі» (заморозок), щоб ніколи не опускати руки й впевнено рухатися вперед.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-1">
                <span>Психологічний захист від розчарування</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ranks & Progression Path */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-serif-vintage font-bold text-[#fbf7ee] mb-2">
            Сходинки детективної майстерності
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Від скромного помічника до визнаного метр-детектива європейського масштабу
          </p>
        </div>

        <div className="space-y-3">
          {[
            { lvl: 1, title: 'Уважний спостерігач', xp: '0 XP', desc: 'Алфавіт, вимова, базові вітання та знайомство з готельним персоналом.', icon: '👁️' },
            { lvl: 2, title: 'Пошуківець зачіпок', xp: '150 XP', desc: 'Орієнтація в просторі, магазини, готельні номери, вказівники напрямку.', icon: '🔍' },
            { lvl: 3, title: 'Молодший слідчий', xp: '350 XP', desc: 'Побутові діалоги: замовлення кави, купівля квитків, розпитування про час і погоду.', icon: '🕵️' },
            { lvl: 4, title: 'Майстер дедукції', xp: '650 XP', desc: 'Минулий та майбутній час, деталі одягу, опис зовнішності та послідовність дій.', icon: '🧠' },
            { lvl: 5, title: 'Метр розслідувань', xp: '1000 XP', desc: 'Вільне побутове мовлення, розбиття хибних алібі, тріумфальне розкриття справи.', icon: '⚖️' },
          ].map((rank) => (
            <div 
              key={rank.lvl}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-[#111927] border border-[#202e47] hover:border-[#d4af37]/40 transition-all"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1a2538] flex items-center justify-center text-xl sm:text-2xl shrink-0">
                {rank.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-serif-vintage font-bold text-sm sm:text-base text-[#e5c158]">
                    {rank.lvl}. {rank.title}
                  </span>
                  <span className="font-mono text-xs text-[#d4af37] bg-[#d4af37]/15 px-2 py-0.5 rounded-full shrink-0">
                    {rank.xp}
                  </span>
                </div>
                <p className="text-xs text-slate-300 truncate sm:whitespace-normal mt-0.5">
                  {rank.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Call to Action */}
      <footer className="mt-auto py-10 bg-[#090d15] border-t border-[#d4af37]/20 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="text-2xl">🕵️‍♂️📜🔍</div>
          <h3 className="font-serif-vintage text-xl sm:text-2xl font-bold text-[#f5d77f]">
            Готові випробувати свої «сірі клітинки»?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Справа про зниклий ключ у Гранд-Готелі Софії вже чекає на ваші дедуктивні висновки.
          </p>
          <button
            onClick={() => {
              soundEngine.playVictory();
              onStartGame();
            }}
            className="mt-2 px-8 py-3 rounded-2xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-serif-vintage font-bold text-base shadow-lg transition-all active:scale-95"
          >
            Увійти до Головного Бюро Слідства
          </button>
          <div className="text-[11px] text-slate-500 font-mono mt-4">
            DetLan © 2026 — Болгарська мова для реального життя та мандрівок
          </div>
        </div>
      </footer>
    </div>
  );
};
