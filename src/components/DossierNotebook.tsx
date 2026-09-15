import React, { useState } from 'react';
import { TRAP_WORDS } from '../data/curriculum';
import { soundEngine } from '../services/soundEngine';
import { X, Volume2, AlertTriangle, BookOpen, Feather } from 'lucide-react';

interface DossierNotebookProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLLECTED_VOCABULARY = [
  { bg: 'Добър вечер', ua: 'Добрий вечір', context: 'Ввічливе привітання портьє' },
  { bg: 'гостът', ua: 'гість (з артиклем -ът)', context: 'Фігурант справи' },
  { bg: 'стая', ua: 'кімната / готельний номер', context: 'Номер 42' },
  { bg: 'ключът', ua: 'ключ (означений)', context: 'Речовий доказ' },
  { bg: 'напусна', ua: 'покинув, вийшов із', context: 'Дія підозрюваного' },
  { bg: 'девет часа', ua: 'дев\'ята година', context: 'Час скоєння злочину' },
  { bg: 'тридесет минути', ua: 'тридцять хвилин', context: 'Критична різниця в алібі' },
  { bg: 'тръгнете', ua: 'йдіть, рушайте', context: 'Вказівка в записці' },
  { bg: 'надясно', ua: 'праворуч', context: 'Справжній правий поворот' },
  { bg: 'асансьор', ua: 'ліфт', context: 'Шлях до мансарди' },
  { bg: 'под килима', ua: 'під килимом', context: 'Схованка ключа' },
  { bg: 'билетът', ua: 'квиток', context: 'Алібі на залізниці' },
  { bg: 'лъжете', ua: 'ви брешете', context: 'Викриття на допиті' },
];

export const DossierNotebook: React.FC<DossierNotebookProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'traps' | 'vocab' | 'grammar'>('traps');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#fdfaf3] text-slate-900 rounded-3xl shadow-2xl border-4 border-[#3e2723] flex flex-col max-h-[90vh] overflow-hidden font-serif-vintage">
        {/* Notebook Leather Header */}
        <div className="bg-[#2d1b11] text-[#f5d77f] p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#d4af37]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a0f0a] border border-[#d4af37]/40 flex items-center justify-center text-xl shadow-inner">
              📖
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-serif-vintage leading-none">
                Кишеньковий записник Пуаро
              </h3>
              <span className="text-[11px] font-mono text-[#d4af37]/80">
                Зібрані докази, мовні пастки та правила граматики
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playTypewriter();
              onClose();
            }}
            className="p-2 text-[#d4af37] hover:text-white rounded-full hover:bg-black/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#eedfc8] px-4 pt-3 flex gap-2 border-b border-[#c8b394] font-mono text-xs">
          <button
            onClick={() => {
              soundEngine.playTypewriter();
              setActiveTab('traps');
            }}
            className={`px-3 py-2 rounded-t-xl font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'traps'
                ? 'bg-[#fdfaf3] text-red-800 border-t-2 border-x-2 border-[#c8b394] -mb-px'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>Хибні друзі ({TRAP_WORDS.length})</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playTypewriter();
              setActiveTab('vocab');
            }}
            className={`px-3 py-2 rounded-t-xl font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'vocab'
                ? 'bg-[#fdfaf3] text-amber-950 border-t-2 border-x-2 border-[#c8b394] -mb-px'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Словник свідчень ({COLLECTED_VOCABULARY.length})</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playTypewriter();
              setActiveTab('grammar');
            }}
            className={`px-3 py-2 rounded-t-xl font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'grammar'
                ? 'bg-[#fdfaf3] text-amber-950 border-t-2 border-x-2 border-[#c8b394] -mb-px'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Feather className="w-3.5 h-3.5 text-amber-700" />
            <span>Секрети граматики</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: FALSE FRIENDS (TRAPS) */}
          {activeTab === 'traps' && (
            <div className="space-y-4">
              <div className="p-3 bg-red-100 border-l-4 border-red-600 text-xs text-red-950 rounded-r-xl">
                <b>Обережно!</b> Болгарська мова повна слів, які звучать знайомо, але мають протилежне або зовсім інше значення. Не дайте злочинцям збити вас з пантелику!
              </div>

              {TRAP_WORDS.map((trap) => (
                <div 
                  key={trap.id}
                  className="bg-[#f7f0e0] border border-amber-900/20 p-4 rounded-2xl shadow-sm space-y-2 hover:border-amber-700/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold font-serif-vintage text-slate-900">
                        {trap.bulgarian}
                      </span>
                      <button
                        onClick={() => soundEngine.speakBulgarian(trap.bulgarian)}
                        className="p-1 rounded-md bg-amber-200 hover:bg-amber-300 text-amber-900 transition-colors"
                        title="Озвучити болгарською"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="line-through text-red-600">не «{trap.falseMeaning}»</span>
                      <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        = {trap.trueMeaning}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-serif">
                    {trap.explanation}
                  </p>

                  <div className="text-[11px] font-mono text-amber-900 bg-amber-100/70 p-2 rounded-xl">
                    🗣️ Приклад: <i>"{trap.exampleSentence}"</i> — {trap.sentenceTranslation}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: VOCABULARY */}
          {activeTab === 'vocab' && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-100 border-l-4 border-amber-600 text-xs text-amber-950 rounded-r-xl">
                Натискайте на піктограму звуку поруч із кожним словом, щоб відточити чисту вимову для допитів свідків.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COLLECTED_VOCABULARY.map((word, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-[#f7f0e0] border border-amber-900/20 rounded-xl flex items-center justify-between shadow-sm"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        <span>{word.bg}</span>
                        <button
                          onClick={() => soundEngine.speakBulgarian(word.bg)}
                          className="p-1 text-amber-800 hover:text-amber-950 hover:bg-amber-200 rounded"
                          title="Озвучити"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs text-slate-700">{word.ua}</div>
                      <div className="text-[10px] text-slate-500 font-mono italic">{word.context}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GRAMMAR SECRETS */}
          {activeTab === 'grammar' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <div className="p-4 bg-[#f7f0e0] border border-amber-900/30 rounded-2xl">
                <h4 className="font-bold font-serif-vintage text-amber-950 text-base mb-1">
                  1. Відсутність відмінків (Падежи липсват!)
                </h4>
                <p>
                  Болгарська — унікальна слов'янська мова: у ній немає звичних відмінків. Зв'язок між словами формується за допомогою прийменників (наприклад, <b>на</b> вказує на приналежність: <i>книгата на детектива</i> = книга детектива).
                </p>
              </div>

              <div className="p-4 bg-[#f7f0e0] border border-amber-900/30 rounded-2xl">
                <h4 className="font-bold font-serif-vintage text-amber-950 text-base mb-1">
                  2. Означений артикль у кінці слів (Членуване)
                </h4>
                <p>
                  Артикль не ставиться окремо, а «приклеюється» до кінця слова:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-0.5 font-mono text-xs text-amber-950">
                  <li>Чоловічий рід: <b>хотел</b> → <b>хотелът</b> (готель)</li>
                  <li>Жіночий рід: <b>стая</b> → <b>стаята</b> (номер)</li>
                  <li>Середній рід: <b>писмо</b> → <b>писмото</b> (лист)</li>
                  <li>Множина: <b>хора</b> → <b>хората</b> (люди)</li>
                </ul>
              </div>

              <div className="p-4 bg-[#f7f0e0] border border-amber-900/30 rounded-2xl">
                <h4 className="font-bold font-serif-vintage text-amber-950 text-base mb-1">
                  3. Буква «Ъ» — секретний балканський звук
                </h4>
                <p>
                  Буква <b>ъ</b> у болгарській мові — це повноцінний голосний звук! Вона звучить як середнє між [и] та [е], з розслабленими губами. Наприклад: <i>България</i>, <i>път</i> (дорога), <i>дъжд</i> (дощ).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
