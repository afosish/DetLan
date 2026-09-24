// DetLan Curriculum, Ranks, Deceptive Words (False Friends) and Detective Cases

export interface Rank {
  level: number;
  title: string;
  minXp: number;
  description: string;
  badgeIcon: string;
}

export const RANKS: Rank[] = [
  {
    level: 1,
    title: 'Уважний спостерігач',
    minXp: 0,
    description: 'Вивчення алфавіту, вимови, ввічливих фраз для першого знайомства з персоналом.',
    badgeIcon: '👁️',
  },
  {
    level: 2,
    title: 'Пошуківець зачіпок',
    minXp: 150,
    description: 'Орієнтація в просторі, назви предметів побуту, готельних номерів, вказівники напрямку.',
    badgeIcon: '🔍',
  },
  {
    level: 3,
    title: 'Молодший слідчий',
    minXp: 350,
    description: 'Побутові діалоги (замовлення їжі, купівля квитків, розпитування про час і погоду).',
    badgeIcon: '🕵️',
  },
  {
    level: 4,
    title: 'Майстер дедукції',
    minXp: 650,
    description: 'Розуміння минулого й майбутнього часу, опис зовнішності, деталей одягу та хронології подій.',
    badgeIcon: '🧠',
  },
  {
    level: 5,
    title: 'Метр розслідувань',
    minXp: 1000,
    description: 'Вільне побутове мовлення, проведення фінальної очної ставки, повне закриття справи.',
    badgeIcon: '⚖️',
  },
];

export interface TrapWord {
  id: string;
  bulgarian: string;
  falseMeaning: string; // What a Ukrainian/Slavic speaker falsely assumes
  trueMeaning: string; // The actual meaning
  explanation: string;
  exampleSentence: string;
  sentenceTranslation: string;
  correctCounterpart?: string; // How to actually say what they thought
}

export const TRAP_WORDS: TrapWord[] = [
  {
    id: 'trap-napravo',
    bulgarian: 'направо',
    falseMeaning: 'праворуч (направо)',
    trueMeaning: 'прямо',
    explanation: 'Найпідступніша пастка для туристів! Коли болгарин каже «Вървете направо», він скеровує вас суворо вперед (прямо). Якщо потрібно повернути праворуч — скажуть «надясно».',
    exampleSentence: 'Вървете само направо до края на улицата.',
    sentenceTranslation: 'Ідіть лише прямо до кінця вулиці.',
    correctCounterpart: 'надясно (праворуч)',
  },
  {
    id: 'trap-gora',
    bulgarian: 'гора',
    falseMeaning: 'гірська вершина, гора',
    trueMeaning: 'ліс',
    explanation: '«Гора» болгарською означає ліс! А справжня гора зі скелями та вершинами називається «планина».',
    exampleSentence: 'Вчера се разхождахме в красивата гора.',
    sentenceTranslation: 'Вчора ми гуляли в гарному лісі.',
    correctCounterpart: 'планина (гора)',
  },
  {
    id: 'trap-dinya',
    bulgarian: 'диня',
    falseMeaning: 'жовта ароматна диня',
    trueMeaning: 'кавун',
    explanation: 'Якщо замовите «диня» на ринку у Варні — вам викотять здоровенний зелений кавун! А справжня солодка диня болгарською — «пъпеш».',
    exampleSentence: 'Искам едно парче сладка студена диня.',
    sentenceTranslation: 'Хочу один шматок солодкого холодного кавуна.',
    correctCounterpart: 'пъпеш (диня)',
  },
  {
    id: 'trap-stol',
    bulgarian: 'стол',
    falseMeaning: 'обідній або письмовий стіл',
    trueMeaning: 'стілець',
    explanation: '«Стол» — це стілець, на ньому сидять. А стіл, за яким їдять чи пишуть — це «маса»!',
    exampleSentence: 'Моля, седнете на този удобен стол.',
    sentenceTranslation: 'Будь ласка, сідайте на цей зручний стілець.',
    correctCounterpart: 'маса (стіл)',
  },
  {
    id: 'trap-mayka',
    bulgarian: 'майка',
    falseMeaning: 'предмет білизни, майка',
    trueMeaning: 'мама, матір',
    explanation: '«Майка» — це найрідніша мама! А предмет одягу без рукавів болгари називають «потник».',
    exampleSentence: 'Майка ми готви вкусна баница.',
    sentenceTranslation: 'Моя мама готує смачну баницю.',
    correctCounterpart: 'потник (майка)',
  },
  {
    id: 'trap-zhivot',
    bulgarian: 'живот',
    falseMeaning: 'живіт (частина тіла)',
    trueMeaning: 'життя',
    explanation: '«Живот» — це людське буття чи життя. Частина тіла (живіт) болгарською зветься «корем».',
    exampleSentence: 'Детективът има интересен и опасен живот.',
    sentenceTranslation: 'У детектива цікаве та небезпечне життя.',
    correctCounterpart: 'корем (живіт)',
  },
  {
    id: 'trap-bulka',
    bulgarian: 'булка',
    falseMeaning: 'хлібобулочний виріб, булочка',
    trueMeaning: 'наречена (молода)',
    explanation: '«Булка» — це чарівна наречена у білій сукні! А хлібна булочка — це «питка» або «кифла».',
    exampleSentence: 'Красивата булка влезе в църквата.',
    sentenceTranslation: 'Красива наречена зайшла до церкви.',
    correctCounterpart: 'питка / кифла (булочка)',
  },
];

export type QuestStepType = 
  | 'theory_intro' 
  | 'word_practice' 
  | 'trap_warning' 
  | 'audio_testimony' 
  | 'clue_analysis' 
  | 'boss_interrogation'
  | 'sentence_assembly'
  | 'crime_scene_search'
  | 'matching_pairs'
  | 'timeline_puzzle';

export interface WordCard {
  wordBg: string;
  transcription: string;
  translationUa: string;
  category: string;
  detectiveTip: string;
  exampleSentence?: string;
  exampleTranslation?: string;
}

export interface QuestStep {
  id: string;
  type: QuestStepType;
  title: string;
  instruction: string;
  characterName: string;
  characterRole: string;
  characterAvatar: string;
  poirotCommentary?: string;
  poirotEmotion?: 'thinking' | 'speaking' | 'pleased' | 'alert' | 'shocked';
  wordCard?: WordCard;
  audioText?: string;
  clueSnippet?: {
    label: string;
    text: string;
    noteAuthor: string;
  };
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  timeLimitSeconds?: number;
  sentenceFragments?: SentenceFragment;
  crimeScene?: CrimeSceneData;
  matchingPairs?: MatchingPair[];
  timelineEvents?: TimelineEvent[];
  xpReward: number;
}

export interface SentenceFragment {
  correctOrder: string[];      // Words in correct order
  distractorWords?: string[];  // Extra wrong words to increase difficulty
}

export interface CrimeSceneHotspot {
  id: string;
  objectName: string;          // What the object is (for display)
  position: { x: number; y: number; width: number; height: number }; // % based
  wordBg: string;
  transcription: string;
  translationUa: string;
  isEvidence: boolean;         // Is this the clue to find?
  poirotHint?: string;
}

export interface CrimeSceneData {
  sceneName: string;           // Scene identifier for rendering
  sceneDescription: string;    // Detective context description
  backgroundImage?: string;    // Realistic illustration asset path
  hotspots: CrimeSceneHotspot[];
}

export interface MatchingPair {
  id: string;
  bulgarian: string;
  ukrainian: string;
}

export interface TimelineEvent {
  id: string;
  textBg: string;
  textUa: string;
  correctPosition: number;     // 0-based index in correct order
}

export interface DetectiveCase {
  id: string;
  number: number;
  title: string;
  location: string;
  status: 'locked' | 'unlocked' | 'completed';
  description: string;
  rewardItem: string;
  badgeReward: string;
  requiredXp: number;
  requiredClue?: string;
  steps: QuestStep[];
}

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: 'case-01-missing-suitcase',
    number: 1,
    title: 'Таємниця зниклої валізи на Центральній гарі',
    location: 'Централна гара, София (Перон №2)',
    status: 'unlocked',
    description: 'На Центральному вокзалі Софії за загадкових обставин зникла валіза кур\'єра з секретним дипломатичним архівом. Усі свідки, оголошення диктора та знайдені записки звучать виключно болгарською. Опитайте чергового, огляньте Перон №2, перехопіть вокзальне оголошення розкладу, знешкодьте пастки «направо» та «гора» і притисніть портьє Георгі на фінальній очній ставці!',
    rewardItem: 'Секретний архів кур\'єра',
    badgeReward: 'Метр дедукції',
    requiredXp: 0,
    steps: [
      // === АКТ I: ВХІДНИЙ КОНТАКТ ТА ПЕРША ЗАЧІПКА ===
      // 1. Теорія: Привітання та ввічливий контакт
      {
        id: 'step-01-intro-greeting',
        type: 'theory_intro',
        title: 'Рівень 1: Вітання та контакт на вокзалі',
        instruction: 'Перед початком офіційного розслідування детектив має володіти формулами ввічливості та вміти пояснити мету візиту. Прослухайте та запам\'ятайте ключову болгарську фразу:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'Mon cher ami! Ввічливість — це перша відмичка детектива. Черговий станції допоможе нам лише тоді, коли ми звернемося до нього бездоганно!',
        wordCard: {
          wordBg: 'Добър ден / Търся...',
          transcription: '[до́бър ден / тъ́рся]',
          translationUa: 'Добрий день / Я шукаю...',
          category: 'Етикет та звернення',
          detectiveTip: 'Дієслово «търся» (шукаю) — головна зброя слідчого. А в слові «добър» пам\'ятайте про глухий голосний «ъ»!',
          exampleSentence: 'Добър ден! Търся изгубения багаж на един дипломат.',
          exampleTranslation: 'Добрий день! Я шукаю загублений багаж одного дипломата.',
        },
        audioText: 'Добър ден! Търся изгубения багаж на един дипломат.',
        xpReward: 10,
      },

      // 2. Практика: Діалог із черговим по станції (Практична 2, Завдання 1)
      {
        id: 'step-02-station-dialogue',
        type: 'word_practice',
        title: 'Рівень 2: Діалог із черговим по станції',
        instruction: 'Ви підійшли до скляного віконця чергового по станції. Службовець підвів погляд і ввічливо звернувся: «Добър ден! Как мога да ви помогна?». Оберіть правильну детективну репліку для відкриття розслідування:',
        characterName: 'Стефан Димитров',
        characterRole: 'Черговий по станції Софія',
        characterAvatar: '👮‍♂️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Обережно з вибором слів! Від нашої легенди залежить, чи надасть черговий доступ до записів перону та камер схову.',
        options: [
          {
            id: 'opt-2-1',
            text: '«Добър ден! Търся изгубен багаж на един дипломат.»',
            isCorrect: true,
            feedback: 'Блискуче! Черговий одразу занепокоївся: дипломатичний скандал станції не потрібен. Він пропускає вас на Перон №2 та показує журнал чергування! (+15 XP)',
          },
          {
            id: 'opt-2-2',
            text: '«Довиждане, аз искам кафе и сладолед.»',
            isCorrect: false,
            feedback: 'Ви сказали «До побачення, я хочу каву і морозиво». Черговий вирішив, що ви просто заблукалий турист, і вказав на буфет.',
          },
          {
            id: 'opt-2-3',
            text: '«Лека нощ, господине!»',
            isCorrect: false,
            feedback: '«Лека нощ» — це «На добраніч» перед сном, а зараз полудень! Черговий підозріло дивиться на вас поверх окулярів.',
          },
        ],
        xpReward: 15,
      },

      // 3. Теорія: Просторова суперпастка «Направо»
      {
        id: 'step-03-intro-spatial-trap',
        type: 'theory_intro',
        title: 'Рівень 3: Просторова пастка «Направо»',
        instruction: 'Увага, критична лінгвістична пастка! Болгарські вказівники напрямку збивають з пантелику навіть досвідчених агентів:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'alert',
        poirotCommentary: 'Затямте раз і назавжди, mon ami: оманлива спорідненість слів тут підступна, як змія! Не дозвольте злочинцю збити нас зі сліду!',
        wordCard: {
          wordBg: 'направо vs надясно',
          transcription: '[напра́во vs надя́сно]',
          translationUa: 'ПРЯМО (вперед!) vs ПРАВОРУЧ',
          category: 'Слова-пастки (Хибні друзі)',
          detectiveTip: '«Направо» болгарською означає СУВОРО ПРЯМО (вперед)! Якщо вам потрібно повернути праворуч — скажуть «надясно». А ліворуч — «наляво».',
          exampleSentence: 'Вървете само направо след изхода.',
          exampleTranslation: 'Ідіть тільки прямо після виходу.',
        },
        audioText: 'направо означава право напред, а надясно означава вдясно',
        xpReward: 10,
      },

      // 4. Пастка: Записка з перону (Практична 2, Завдання 2)
      {
        id: 'step-04-trap-direction-note',
        type: 'trap_warning',
        title: 'Рівень 4: Записка з перону (Слово-пастка)',
        instruction: 'Біля колони знайдено брудний папірець з інструкцією для спільника: «Тръгнете само направо след изхода». Ваш молодий помічник Гастінгс вигукує: «Швидше, біжімо праворуч у провулок!». Куди насправді веде слід?',
        characterName: 'Капітан Гастінгс',
        characterRole: 'Недосвідчений помічник',
        characterAvatar: '🏃‍♂️',
        poirotEmotion: 'alert',
        poirotCommentary: 'Mon cher Гастінгс знову біжить не туди! Включіть «сірі клітинки», детективе: не повторюйте фатальних помилок аматорів!',
        clueSnippet: {
          label: 'Клаптик інструкції зі слідами вугільної сажі',
          text: '«Тръгнете само направо след изхода»',
          noteAuthor: 'Невідомий спільник',
        },
        options: [
          {
            id: 'opt-4-1',
            text: 'Йти суворо ПРЯМО вперед через головні ворота до колій (болг. «направо» = прямо)',
            isCorrect: true,
            feedback: 'Браво! Ви врятували розслідування від хибного сліду. Напрямок — тільки прямо за станційні платформи! (+20 XP)',
          },
          {
            id: 'opt-4-2',
            text: 'Повернути праворуч у вузький глухий кут із багажними ящиками',
            isCorrect: false,
            feedback: 'Фатальна помилка! «Направо» болгарською не означає праворуч. Праворуч — це «надясно»! У провулку лише глухий кут.',
          },
          {
            id: 'opt-4-3',
            text: 'Розвернутися і повернути ліворуч до каси квитків',
            isCorrect: false,
            feedback: 'Ліворуч — це «наляво». Ви втрачаєте дорогоцінний час, поки злочинець віддаляється!',
          },
        ],
        xpReward: 20,
      },

      // 5. Конструктор речення: Розірвана записка кур\'єра
      {
        id: 'step-05-sentence-note',
        type: 'sentence_assembly',
        title: 'Рівень 5: Зібрати розірвану записку кур\'єра',
        instruction: 'Під лавкою виявлено розірвану записку кур\'єра дипломатичної пошти. Відновіть первинний зміст фрази, розставивши болгарські слова в правильному порядку:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Зберіть ці фрагменти докупи, як мозаїку. Порядок слів відкриє нам останній наказ кур\'єра!',
        sentenceFragments: {
          correctOrder: ['Вземете', 'куфара', 'и', 'вървете', 'само', 'направо'],
          distractorWords: ['надясно', 'стая'],
        },
        xpReward: 20,
      },

      // === АКТ II: ОБШУК ПЕРОНУ ТА ВОКЗАЛЬНЕ АУДІОПЕРЕХОПЛЕННЯ ===
      // 6. Огляд місця злочину: Перон №2 Центральної гари
      {
        id: 'step-06-station-search',
        type: 'crime_scene_search',
        title: 'Рівень 6: Огляд місця злочину (Перон №2)',
        instruction: 'Ви на Пероні №2 Центрального вокзалу Софії. Навколо клубочиться пара від локомотива, стоять валізи та пасажири. Дослідіть підозрілі об\'єкти на пероні через детективну лупу та знайдіть вирішальний речовий доказ!',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'Огляньте кожен куточок перону: годинник, колію, багажний візок і дерев\'яну лавку. Справжній доказ прихований там, де його найменше чекають!',
        crimeScene: {
          sceneName: 'Перон №2 Центральної гари Софії',
          sceneDescription: 'Перон №2 Центрального вокзалу Софії. Димовий локомотив чекає на відправлення, на чавунній колоні висить станційний годинник, а під лавкою щось біліє.',
          backgroundImage: '/images/crime-scenes/sofia-station.jpg',
          hotspots: [
            {
              id: 'hotspot-clock',
              objectName: 'Станційний годинник',
              position: { x: 42, y: 14, width: 14, height: 16 },
              wordBg: 'часовник',
              transcription: '[часо́вник]',
              translationUa: 'годинник (показує рівно 10:30)',
              isEvidence: false,
              poirotHint: 'Великий залізничний годинник показує рівно 10:30. Запам\'ятайте цей час, він розіб\'є алібі підозрюваного!',
            },
            {
              id: 'hotspot-cart',
              objectName: 'Багажний візок',
              position: { x: 12, y: 64, width: 22, height: 26 },
              wordBg: 'количка за багаж',
              transcription: '[коли́чка за бага́ж]',
              translationUa: 'візок для валіз',
              isEvidence: false,
              poirotHint: 'Тут стоять шкіряні валізи пасажирів, але дипломатичної валізи з червоною сургучною печаткою немає. Її вже встигли поцупити!',
            },
            {
              id: 'hotspot-track',
              objectName: 'Вказівник колії',
              position: { x: 74, y: 28, width: 16, height: 18 },
              wordBg: 'втори коловоз',
              transcription: '[вто́ри колово́з]',
              translationUa: 'друга колія (Перон 2)',
              isEvidence: false,
              poirotHint: 'Табличка засвідчує: саме з цієї другої колії (втори коловоз) відходить експрес до Варни.',
            },
            {
              id: 'hotspot-exit',
              objectName: 'Вихід зі станції',
              position: { x: 2, y: 38, width: 14, height: 24 },
              wordBg: 'изход',
              transcription: '[и́зход]',
              translationUa: 'вихід / шлях назовні',
              isEvidence: false,
              poirotHint: 'Стрілка вказує на вихід. Але знайдена записка веліла йти «направо» — тобто прямо за станційні склади!',
            },
            {
              id: 'hotspot-ticket',
              objectName: 'Лавка з газетою «Зора»',
              position: { x: 44, y: 70, width: 24, height: 22 },
              wordBg: 'билет за влак',
              transcription: '[биле́т за влак]',
              translationUa: 'квиток на потяг (РЕЧОВИЙ ДОКАЗ!)',
              isEvidence: true,
              poirotHint: 'Mon Dieu! Під ранковою газетою на лавці лежить розірваний квиток на потяг до Варни! На ньому вказано час відправлення: 10:30!',
            },
          ],
        },
        xpReward: 25,
      },

      // 7. Теорія: Час і залізничні терміни
      {
        id: 'step-07-intro-railway-time',
        type: 'theory_intro',
        title: 'Рівень 7: Час та залізнична термінологія',
        instruction: 'Щоб розібратися у вокзальних оголошеннях і перевірити алібі підозрюваних, детектив зобов\'язаний розуміти позначення часу та залізничні терміни:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'Точність до хвилини — ось що відрізняє справжнього майстра від аматора! Вивчіть, як звучать хвилини та залізничні колії:',
        wordCard: {
          wordBg: 'десет и трийсет / втори коловоз',
          transcription: '[де́сет и три́йсет / вто́ри колово́з]',
          translationUa: 'десята тридцять (10:30) / друга колія',
          category: 'Розклад та навігація',
          detectiveTip: '«Влак» — це потяг, «бърз влак» — швидкий експрес, а «коловоз» — залізнична колія. 10:30 кажуть «десет и трийсет» або «десет и половина».',
          exampleSentence: 'Бързият влак заминава в десет часа и трийсет минути от втори коловоз.',
          exampleTranslation: 'Швидкий потяг відправляється о десятій годині тридцять хвилин з другої колії.',
        },
        audioText: 'десет часа и трийсет минути, втори коловоз',
        xpReward: 10,
      },

      // 8. Аудіоперехоплення: Оголошення диктора станції (Практична 2, Завдання 3)
      {
        id: 'step-08-audio-announcement',
        type: 'audio_testimony',
        title: 'Рівень 8: Аудіоперехоплення вокзального оголошення',
        instruction: 'Гучномовець вокзалу зашипів. Прослухайте офіційне оголошення диктора станції болгарською мовою та заповніть детективний протокол: о котрій годині та з якої колії відправляється потяг?',
        characterName: 'Диктор станції Софія',
        characterRole: 'Вокзальний гучномовець',
        characterAvatar: '📢',
        poirotEmotion: 'alert',
        poirotCommentary: 'Слухайте кожне слово диктора! Це ключова ланка в ланцюжку алібі злочинця!',
        audioText: 'Внимание! Бързият влак за Варна заминава в десет часа и трийсет минути от втори коловоз.',
        options: [
          {
            id: 'opt-8-1',
            text: 'О 10:30 (десет и трийсет) з другої колії (втори коловоз) до Варни',
            isCorrect: true,
            feedback: 'Ідеально зафіксовано в протоколі! Потяг на Варну рушає рівно о 10:30 з другої колії. Це безповоротно руйнує версію злодія! (+25 XP)',
          },
          {
            id: 'opt-8-2',
            text: 'О 12:00 (дванадесет часа) з першої колії (първи коловоз) до Пловдива',
            isCorrect: false,
            feedback: 'Невірно. Диктор чітко оголосив «десет часа и трийсет минути» (10:30) та «втори коловоз» (колія №2).',
          },
          {
            id: 'opt-8-3',
            text: 'О 09:15 (девет и петнадесет) з третьої колії до Бургаса',
            isCorrect: false,
            feedback: 'Помилка слуху. Уважно прослухайте запис ще раз: 10:30, колія 2!',
          },
        ],
        xpReward: 25,
      },

      // 9. Зіставлення доказів (Червона нитка Пуаро)
      {
        id: 'step-09-matching-evidence',
        type: 'matching_pairs',
        title: 'Рівень 9: Дедуктивне зіставлення доказів',
        instruction: 'Пуаро натягує червону нитку на детективній дошці. З\'єднайте болгарські терміни з вокзалу з їхніми точними значеннями, щоб зв\'язати розрізнені докази в єдину картину злочину:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'pleased',
        poirotCommentary: 'Коли кожен доказ знаходить своє точне місце, картина злочину стає кришталево чистою!',
        matchingPairs: [
          { id: 'm1', bulgarian: 'куфар', ukrainian: 'валіза' },
          { id: 'm2', bulgarian: 'гара', ukrainian: 'вокзал' },
          { id: 'm3', bulgarian: 'коловоз', ukrainian: 'колія' },
          { id: 'm4', bulgarian: 'направо', ukrainian: 'прямо' },
          { id: 'm5', bulgarian: 'билет', ukrainian: 'квиток' },
          { id: 'm6', bulgarian: 'часовник', ukrainian: 'годинник' },
        ],
        xpReward: 20,
      },

      // === АКТ III: ПАСТКА «ГОРА» ТА ФІНАЛЬНИЙ BOSS FIGHT ===
      // 10. Теорія: Пастка «Гора»
      {
        id: 'step-10-intro-gora-trap',
        type: 'theory_intro',
        title: 'Рівень 10: Ландшафтна пастка «Гора»',
        instruction: 'Детектив зобов\'язаний розпізнавати найнебезпечніші лексичні омани. Як болгари називають ліс і гори?',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'О, скільки агентів загубилося у скелях через це одне слово! Зверніть увагу:',
        wordCard: {
          wordBg: 'гора vs планина',
          transcription: '[гора́ vs планина́]',
          translationUa: 'ЛІС vs ГОРА (скеляста вершина)',
          category: 'Слова-пастки (Хибні друзі)',
          detectiveTip: 'Болгарське «гора» — це ЛІС (дерева, хащі)! А справжня кам\'яна гора з вершиною зветься «планина» (як гірський масив Стара Планина або Вітоша).',
          exampleSentence: 'Видях човека с куфара в гората зад гарата.',
          exampleTranslation: 'Я бачив людину з валізою в лісі за вокзалом.',
        },
        audioText: 'Гора означава гора с дървета, тоест лес, а планина означава скали и върхове.',
        xpReward: 10,
      },

      // 11. Пастка: Хибний слід свідка (Практична 2, Завдання 4)
      {
        id: 'step-11-trap-false-lead',
        type: 'trap_warning',
        title: 'Рівень 11: Хибний слід свідка (Аналіз суперечності)',
        instruction: 'Свідок (старий залізничний стрілочник) запевняє поліцію: «Видях заподозрения с черния куфар в гората зад гарата!». Недосвідчений помічник Гастінгс уже викликає загін альпіністів зі спорядженням, щоб дертися на скелі гори Вітоша. Яка фатальна помилка допущена?',
        characterName: 'Капітан Гастінгс',
        characterRole: 'Помічник із альпіністськими мотузками',
        characterAvatar: '🧗‍♂️',
        poirotEmotion: 'alert',
        poirotCommentary: 'Стривайте, Гастінгсе! Не ганьбіть детективне бюро перед міською поліцією! Згадайте, що таке «гора»!',
        clueSnippet: {
          label: 'Свідчення старого стрілочника',
          text: '«Видях заподозрения с черния куфар в гората зад гарата!»',
          noteAuthor: 'Стрілочник Перону №2',
        },
        options: [
          {
            id: 'opt-11-1',
            text: '«Гора» болгарською означає «ліс»! Шукати втікача треба в лісосмузі за депо вокзалу, а не на скелях Вітоші.',
            isCorrect: true,
            feedback: 'Блискуче викриття! Ви вчасно зупинили безглузду експедицію на скелі й спрямували поліцію в лісопарк за коліями, де й знайшли сліди втікача! (+20 XP)',
          },
          {
            id: 'opt-11-2',
            text: 'Свідок мав на увазі підземні катакомби та бомбосховища під вокзалом.',
            isCorrect: false,
            feedback: 'Ні, катакомби не мають жодного відношення до слова «гора».',
          },
          {
            id: 'opt-11-3',
            text: 'Помічник має рацію: треба терміново штурмувати пік Вітоша.',
            isCorrect: false,
            feedback: 'Помилка! Скеляста гора болгарською — «планина». У лісі біля вокзалу злочинець би просто зник, поки ви лізете на скелі.',
          },
        ],
        xpReward: 20,
      },

      // 12. Хронологія злочину
      {
        id: 'step-12-timeline-reconstruction',
        type: 'timeline_puzzle',
        title: 'Рівень 12: Реконструкція хронології злочину',
        instruction: 'Перед фінальним допитом розставте події залізничного ранку в строгій хронологічній послідовності. Це зламає захист підозрюваного на очній ставці:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Час не бреше, брешуть лише люди! Відтворіть точний ланцюжок хвилин:',
        timelineEvents: [
          { id: 't1', textBg: '10:00 — Дипломатичният куриер пристига на Централна гара', textUa: '10:00 — Дипломатичний кур\'єр прибуває на Центральний вокзал', correctPosition: 0 },
          { id: 't2', textBg: '10:15 — Куфарът изчезва от количката за багаж', textUa: '10:15 — Валіза зникає з багажного візка', correctPosition: 1 },
          { id: 't3', textBg: '10:30 — Бързият влак за Варна заминава от втори коловоз', textUa: '10:30 — Швидкий потяг до Варни відправляється з другої колії', correctPosition: 2 },
          { id: 't4', textBg: '10:35 — Свидетелят вижда беглеца с куфара в гората зад гарата', textUa: '10:35 — Свідок бачить утікача з валізою в лісі за вокзалом', correctPosition: 3 },
          { id: 't5', textBg: '10:45 — Заподозреният портиер Георги се връща във фоайето на хотела', textUa: '10:45 — Підозрюваний портьє Георгі повертається у хол готелю', correctPosition: 4 },
        ],
        xpReward: 25,
      },

      // 13. Фінальний допит: Очна ставка з портьє Георгі (Практична 2, Завдання 5)
      {
        id: 'step-13-boss-interrogation',
        type: 'boss_interrogation',
        title: 'Рівень 13: Очна ставка — Допит портьє Георгі (Boss Fight)',
        instruction: 'Фінал розслідування! Головний підозрюваний — портьє Георгі, який супроводжував дипломата з готелю на вокзал. Георгі зухвало заявляє: «Лъжете! В десет и трийсет бях във фоайето на хотела и пиех кафе!». У вас є 45 секунд, щоб пред\'явити докази болгарською мовою та приперти його до стіни!',
        characterName: 'Портьє Георгі',
        characterRole: 'Головний підозрюваний у викраденні',
        characterAvatar: '🤵',
        poirotEmotion: 'alert',
        timeLimitSeconds: 45,
        poirotCommentary: 'Ударте його фактами, детективе! Квиток на 10:30, напрямок прямо через вихід і сліди в лісі за гарою!',
        clueSnippet: {
          label: 'Сфабриковане алібі Георгі',
          text: '«В десет и трийсет бях във фоайето на хотела и пиех кафе!»',
          noteAuthor: 'Портьє Георгі',
        },
        options: [
          {
            id: 'boss-opt-1',
            text: '«Лъжете, Георги! В десет и трийсет вашият влак замина от втори коловоз, а свидетелят ви видя в гората зад гарата с куфара!»',
            isCorrect: true,
            feedback: 'БРАВО, ДЕТЕКТИВЕ! Портьє зблід, упав на коліна та в усьому зізнався: він сховав дипломатичний архів у лісосмузі біля депо й планував сісти на вечірній потяг до Варни! Справу закрито з тріумфом! (+50 XP)',
          },
          {
            id: 'boss-opt-2',
            text: '«Аз мисля, че вие сте невинен, защото в гората има високи планини със сняг.»',
            isCorrect: false,
            feedback: 'Ви знову сплутали ліс із горами! Портьє глузливо посміхається і відкидає ваші безпорадні підозри.',
          },
          {
            id: 'boss-opt-3',
            text: '«Моля, донесете ми чаша чай и едно парче торта в стаята.»',
            isCorrect: false,
            feedback: 'Абсурд! Замість обвинувачення ви замовили чай із тортом! Час вичерпано, спільник встиг знищити докази.',
          },
        ],
        xpReward: 50,
      },
    ],
  },
  {
    id: 'case-02-orient-express',
    number: 2,
    title: 'Таємниця Східного Експресу',
    location: 'Вагон-ресторан поїзда «Софія — Варна»',
    status: 'locked',
    description: 'Квиток на потяг до Варни, знайдений на Центральній гарі, привів нас у розкішний експрес. Під час вечері у вагоні-ресторані зник коштовний сапфір пані Данилової. Офіціант нервує, плутаючи «стол» (стілець) та «диня» (кавун).',
    rewardItem: 'Залізничний розклад кондуктора',
    badgeReward: 'Чисте зізнання',
    requiredXp: 70,
    requiredClue: 'Секретний архів кур\'єра',
    steps: [
      // === АКТ I: ІНТЕРМЕЦО У ВАГОНІ-РЕСТОРАНІ ===
      // 1. Теорія: Сервірування у вагоні-ресторані (маса)
      {
        id: 'step-2-01-intro-dining',
        type: 'theory_intro',
        title: 'Рівень 1: Сервірування у вагоні-ресторані',
        instruction: 'Запам\'ятайте базове слово для орієнтації у вагоні-ресторані:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'Mon cher ami! Перш ніж розкрити крадіжку сапфіра пані Данилової, вивчімо мову цього розкішного експреса. Почнімо зі столика!',
        wordCard: {
          wordBg: 'маса',
          transcription: '[ма́-са]',
          translationUa: 'стіл (обідній або письмовий)',
          category: 'Ресторан та меблі',
          detectiveTip: 'У болгарській мові стіл — це завжди «маса»! Не плутайте зі словом «стол», яке насправді означає стілець!',
          exampleSentence: 'Моля, седнете на маса номер четири.',
          exampleTranslation: 'Будь ласка, сідайте за стіл номер чотири.',
        },
        audioText: 'Моля, седнете на маса номер четири.',
        xpReward: 15,
      },

      // 2. Пастка: «Стол» (стілець) vs «Маса» (стіл)
      {
        id: 'step-2-02-trap-stol',
        type: 'trap_warning',
        title: 'Рівень 2: Пастка «Стол» — де лежала сумочка?',
        instruction: 'Офіціант Радослав нервово стверджує: «Сложих дамската чанта на стола». Де насправді була сумочка пані Данилової?',
        characterName: 'Радослав',
        characterRole: 'Офіціант вагона-ресторану',
        characterAvatar: '🧑‍🍳',
        poirotEmotion: 'alert',
        poirotCommentary: 'Стійте! Якщо ви подумали про обідній стіл — ви втрапите в пастку злодія! Згадайте різницю між «маса» та «стол»!',
        audioText: 'Сложих дамската чанта на стола до прозореца.',
        options: [
          {
            id: 'opt-chair',
            text: 'На стільці біля вікна (бо «стол» — це стілець!)',
            isCorrect: true,
            feedback: 'Блискуче! «Стол» болгарською — це стілець. Сумочка стояла саме на ньому, де її було легко підхопити під час метушні!',
          },
          {
            id: 'opt-table',
            text: 'На обідньому столі серед тарілок і приборів',
            isCorrect: false,
            feedback: 'Помилка! Стіл болгарською — це «маса». «Стол» — це стілець!',
          },
          {
            id: 'opt-shelf',
            text: 'На верхній багажній полиці купе',
            isCorrect: false,
            feedback: 'Хибно. Радослав говорив про меблі у вагоні-ресторані.',
          },
        ],
        xpReward: 20,
      },

      // 3. Теорія: «Диня» — солодкий кавун
      {
        id: 'step-2-03-intro-fruits',
        type: 'theory_intro',
        title: 'Рівень 3: Солодкий десерт: пастка «Диня»',
        instruction: 'Вивчіть найвідомішу гастрономічну пастку болгарської мови:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Sacré bleu! Слідчий, який замовить «диня» і чекатиме жовтого плоду, буде шокований. У Болгарії все навпаки!',
        wordCard: {
          wordBg: 'диня',
          transcription: '[ди́-ня]',
          translationUa: 'кавун (великий, смугастий і зелений!)',
          category: 'Фальшиві друзі перекладача',
          detectiveTip: '«Диня» — це кавун! А якщо ви хочете жовту ароматну диню — замовляйте «пъпеш» [пи́пеш]!',
          exampleSentence: 'Искам едно парче студена сладка диня.',
          exampleTranslation: 'Хочу один шматок солодкого холодного кавуна.',
        },
        audioText: 'Искам едно парче студена сладка диня.',
        xpReward: 15,
      },

      // 4. Практика: Замовлення десерту пані Данилової
      {
        id: 'step-2-04-practice-dessert',
        type: 'word_practice',
        title: 'Рівень 4: Дивний десерт пані Данилової',
        instruction: 'Пані Данилова сказала поліції: «Поръчах диня, но сервитьорът донесе празна чиния и сметката». Що вона хотіла з\'їсти?',
        characterName: 'Олена Данилова',
        characterRole: 'Потерпіла графиня',
        characterAvatar: '👒',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Зверніть увагу на кожну деталь її замовлення! Чи міг офіціант сховати камінь у посуді?',
        audioText: 'Поръчах диня, но сервитьорът донесе празна чиния и сметката.',
        options: [
          {
            id: 'opt-watermelon',
            text: 'Солодкий соковитий кавун',
            isCorrect: true,
            feedback: 'Правильно! Вона чекала кавун («диня»). Офіціант навмисне приніс порожню тарілку, щоб відволікти її увагу!',
          },
          {
            id: 'opt-melon',
            text: 'Жовту диню',
            isCorrect: false,
            feedback: 'Пастка спрацювала! Жовта диня — це «пъпеш». «Диня» — це кавун!',
          },
          {
            id: 'opt-bread',
            text: 'Шматок теплого хліба з маслом',
            isCorrect: false,
            feedback: 'Невірно. Вона чітко замовила «диня».',
          },
        ],
        xpReward: 20,
      },

      // 5. Аналіз доказу: Заява пані Данилової
      {
        id: 'step-2-05-clue-danilova',
        type: 'clue_analysis',
        title: 'Рівень 5: Протокол заяви про крадіжку',
        instruction: 'Уважно прочитайте протокол свідчень. Який підозрілий маневр вчинив злодій?',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'alert',
        poirotCommentary: 'Маленькі деталі розкривають великі злочини! Проаналізуймо запис слідчого.',
        clueSnippet: {
          label: 'Протокол допиту №14',
          text: '«Когато влакът намали скоростта, лампите изгаснаха. Непознат мъж блъсна стола ми, взе чантата и изтича към изхода.»',
          noteAuthor: 'Інспектор залізничної варти Стоянов',
        },
        options: [
          {
            id: 'opt-bumped-chair',
            text: 'Чоловік штовхнув її стілець («блъсна стола ми») і вихопив сумку',
            isCorrect: true,
            feedback: 'Вірно! Злодій знав, що сумка на стільці («на стола»), скористався темрявою і завдав удару!',
          },
          {
            id: 'opt-table-crash',
            text: 'Злодій перекинув обідній стіл з келихами',
            isCorrect: false,
            feedback: 'У протоколі чітко сказано «блъсна стола» (штовхнув стілець), а не стіл («маса»).',
          },
          {
            id: 'opt-window-break',
            text: 'Злодій розбив вікно вагона каменем',
            isCorrect: false,
            feedback: 'У протоколі немає згадок про розбите вікно.',
          },
        ],
        xpReward: 25,
      },

      // 6. Зіставлення пар: Посуд та предмети вагона-ресторану (matching_pairs)
      {
        id: 'step-2-06-matching-dishes',
        type: 'matching_pairs',
        title: 'Рівень 6: Речові докази на столі (Зіставлення)',
        instruction: 'З\'єднайте болгарські назви предметів сервірування з їхніми українськими перекладами за допомогою червоної нитки дедукції:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'На столі залишилися речові докази. З\'єднаймо кожну назву з її значенням, щоб відтворити картину вечері!',
        matchingPairs: [
          { id: 'pair-masa', bulgarian: 'маса', ukrainian: 'стіл' },
          { id: 'pair-stol', bulgarian: 'стол', ukrainian: 'стілець' },
          { id: 'pair-dinya', bulgarian: 'диня', ukrainian: 'кавун' },
          { id: 'pair-chashia', bulgarian: 'чаша', ukrainian: 'келих / склянка' },
          { id: 'pair-chinia', bulgarian: 'чиния', ukrainian: 'тарілка' },
          { id: 'pair-smetka', bulgarian: 'сметка', ukrainian: 'рахунок' },
        ],
        xpReward: 30,
      },

      // === АКТ II: ОГЛЯД ВАГОНА ТА ДОПИТ КОНДУКТОРА ===
      // 7. Обшук локації: Вагон-ресторан та столик №4 (crime_scene_search)
      {
        id: 'step-2-07-crime-scene-train',
        type: 'crime_scene_search',
        title: 'Рівень 7: Огляд місця злочину у вагоні-ресторані',
        instruction: 'Огляньте столик №4 та підозрілі предмети. Знайдіть приховану розірвану телеграму!',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Нічого не вислизне від очей Пуаро. Дослідіть стілець, келих, фіранку та кошик з хлібом!',
        crimeScene: {
          sceneName: 'train_dining_car',
          sceneDescription: 'Вагон-ресторан Східного Експресу: оксамитові стільці, фіранки на вікнах та накриті столики.',
          backgroundImage: '/images/crime-scenes/orient-express-dining.jpg',
          hotspots: [
            {
              id: 'hs-chair-left',
              objectName: 'Стол (оксамитовий стілець)',
              position: { x: 30, y: 50, width: 16, height: 26 },
              wordBg: 'стол',
              transcription: '[стол]',
              translationUa: 'стілець (оксамитовий)',
              isEvidence: false,
              poirotHint: 'Розкішний оксамитовий стілець («стол»). Сумочки графині тут уже немає, злодій діяв блискавично!',
            },
            {
              id: 'hs-bread-basket',
              objectName: 'Кошница с хляб (кошик із хлібом)',
              position: { x: 44, y: 64, width: 14, height: 16 },
              wordBg: 'кошница с хляб',
              transcription: '[ко́ш-ни-ца с хляб]',
              translationUa: 'кошик із хлібом',
              isEvidence: true,
              poirotHint: 'Mon Dieu! Під лляною серветкою на дні кошика заховано клаптик розірваної телеграми!',
            },
            {
              id: 'hs-glass',
              objectName: 'Чаша за вино (келих)',
              position: { x: 39, y: 56, width: 7, height: 22 },
              wordBg: 'чаша за вино',
              transcription: '[ча́-ша за ви́-но]',
              translationUa: 'келих для вина',
              isEvidence: false,
              poirotHint: 'Келих для вина. Відбитків пальців немає — офіціант працював у білих рукавичках.',
            },
            {
              id: 'hs-curtain',
              objectName: 'Перде (фіранка)',
              position: { x: 65, y: 2, width: 10, height: 60 },
              wordBg: 'перде',
              transcription: '[пер-де́]',
              translationUa: 'фіранка',
              isEvidence: false,
              poirotHint: 'Важка оксамитова фіранка з золотими китицями.',
            },
            {
              id: 'hs-window',
              objectName: 'Прозорец на влака (вікно)',
              position: { x: 74, y: 6, width: 22, height: 55 },
              wordBg: 'прозорец',
              transcription: '[прозо́рец]',
              translationUa: 'вікно поїзда',
              isEvidence: false,
              poirotHint: 'За вікном лише темний ліс біля Карнобата. На склі немає жодних слідів зламу.',
            },
          ],
        },
        audioText: 'кошница с хляб',
        xpReward: 30,
      },

      // 8. Відновлення записки: Розірвана телеграма (sentence_assembly)
      {
        id: 'step-2-08-assembly-telegram',
        type: 'sentence_assembly',
        title: 'Рівень 8: Розшифрування порізаної телеграми',
        instruction: 'Складіть знайдені в кошику з хлібом клаптики телеграми у правильному порядку:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'alert',
        poirotCommentary: 'Злочинці переписувалися короткими кодованими фразами. Відновіть повідомлення!',
        sentenceFragments: {
          correctOrder: ['Сапфирът', 'е', 'скрит', 'близо', 'до', 'прозореца'],
          distractorWords: ['надясно', 'планината'],
        },
        audioText: 'Сапфирът е скрит близо до прозореца.',
        xpReward: 25,
      },

      // 9. Теорія: «Гора» (ліс!) vs «Планина»
      {
        id: 'step-2-09-intro-landscape',
        type: 'theory_intro',
        title: 'Рівень 9: Географія та пастка «Гора»',
        instruction: 'Вивчіть ще одне підступне слово болгарського ландшафту:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'Кондуктор стверджує, що поїзд стояв «в гората». Якщо ви шукатимете скелі та вершини — ви опинитеся не там!',
        wordCard: {
          wordBg: 'гора',
          transcription: '[го-ра́]',
          translationUa: 'ліс (густий бір дерев)',
          category: 'Природа та фальшиві друзі',
          detectiveTip: '«Гора» болгарською — це ЛІС! А справжня гора з вершинами зветься «планина» (наприклад, Стара планина).',
          exampleSentence: 'Влакът спря за пет минути в тъмната гора.',
          exampleTranslation: 'Поїзд зупинився на п\'ять хвилин у темному лісі.',
        },
        audioText: 'Влакът спря за пет минути в тъмната гора.',
        xpReward: 15,
      },

      // 10. Пастка: Алібі кондуктора: гора чи ліс?
      {
        id: 'step-2-10-trap-gora',
        type: 'trap_warning',
        title: 'Рівень 10: Свідчення кондуктора: де стояв поїзд?',
        instruction: 'Кондуктор Димитр заявляє: «Спряхме за техническа проверка в гората близо до Карнобат». Де саме стояли вагони?',
        characterName: 'Димитр',
        characterRole: 'Старший кондуктор поїзда',
        characterAvatar: '👨‍✈️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Зверніть увагу на його слова. Чи намагається він ввести слідство в оману?',
        audioText: 'Спряхме за техническа проверка в гората близо до Карнобат.',
        options: [
          {
            id: 'opt-forest',
            text: 'У лісі біля Карнобата (бо «гора» — це ліс!)',
            isCorrect: true,
            feedback: 'Чудово! Ви не дали обдурити себе. Поїзд стояв серед дерев у лісі, де спільник міг підійти до вікна вагона!',
          },
          {
            id: 'opt-mountain',
            text: 'Високо на гірському перевалі серед скель',
            isCorrect: false,
            feedback: 'Пастка! Гора болгарською — «планина». А «гора» — це ліс!',
          },
          {
            id: 'opt-station',
            text: 'На освітленій платформі вокзалу Карнобат',
            isCorrect: false,
            feedback: 'Ні, поїзд не заходив на платформу, він зупинився «в гората».',
          },
        ],
        xpReward: 20,
      },

      // 11. Аудіосвідчення: Кондуктор про зупинку та світло
      {
        id: 'step-2-11-audio-conductor',
        type: 'audio_testimony',
        title: 'Рівень 11: Голос кондуктора: точний час темряви',
        instruction: 'Послухайте аудіозапис кондуктора та визначте точний час, коли згасло світло у вагонах:',
        characterName: 'Димитр',
        characterRole: 'Старший кондуктор поїзда',
        characterAvatar: '👨‍✈️',
        poirotEmotion: 'alert',
        poirotCommentary: 'Час — це ключ до алібі. Слухайте уважно болгарські числівники!',
        audioText: 'В осем и четиридесет и пет светлината изгасна за две минути.',
        options: [
          {
            id: 'opt-845',
            text: 'О 20:45 (осем и четиридесет и пет)',
            isCorrect: true,
            feedback: 'Точно! О 20:45 світло згасло рівно на дві хвилини («две минути»). Саме в цей проміжок зник сапфір!',
          },
          {
            id: 'opt-815',
            text: 'О 20:15 (осем и петнадесет)',
            isCorrect: false,
            feedback: 'Невірно. О 20:15 пасажири лише сідали за стіл.',
          },
          {
            id: 'opt-900',
            text: 'О 21:00 (девет часа)',
            isCorrect: false,
            feedback: 'Ні, о 21:00 пані Данилова вже виявила крадіжку.',
          },
        ],
        xpReward: 25,
      },

      // 12. Хронологічний ланцюг: Відновлення подій вечора (timeline_puzzle)
      {
        id: 'step-2-12-timeline-train',
        type: 'timeline_puzzle',
        title: 'Рівень 12: Хронологія злочину у Східному Експресі',
        instruction: 'Розташуйте події фатального вечора у правильній хронологічній послідовності (від найранішої до найпізнішої):',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'Мої «сірі клітинки» вимагають суворого порядку! Розставмо події вечора за часом!',
        timelineEvents: [
          {
            id: 'ev-1',
            textBg: 'Влакът потегли от София',
            textUa: 'Поїзд вирушив зі станції Софія (18:00)',
            correctPosition: 0,
          },
          {
            id: 'ev-2',
            textBg: 'Госпожа Данилова седна на маса номер четири',
            textUa: 'Пані Данилова сіла за стіл №4 у вагоні-ресторані (20:15)',
            correctPosition: 1,
          },
          {
            id: 'ev-3',
            textBg: 'Влакът спря за кратко в гората',
            textUa: 'Поїзд коротко зупинився в лісі біля Карнобата (20:40)',
            correctPosition: 2,
          },
          {
            id: 'ev-4',
            textBg: 'Светлината във вагона изгасна',
            textUa: 'Світло у вагоні-ресторані згасло на дві хвилини (20:45)',
            correctPosition: 3,
          },
          {
            id: 'ev-5',
            textBg: 'Сапфирът изчезна от стола',
            textUa: 'Сапфір зник із сумочки на стільці (20:46)',
            correctPosition: 4,
          },
        ],
        xpReward: 30,
      },

      // === АКТ III: ТАЄМНИЙ ШИФР ТА ОЧНА СТАВКА ===
      // 13. Теорія: «Булка» (наречена!) та «Майка» (мама!)
      {
        id: 'step-2-13-intro-people',
        type: 'theory_intro',
        title: 'Рівень 13: Таємнича «Булка» та «Майка»',
        instruction: 'Вивчіть ще дві вражаючі пастки болгарської мови:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'alert',
        poirotCommentary: 'У перехопленій записці згадується «булка». Якщо ви подумаєте про хліб — ви пропустите живого свідка!',
        wordCard: {
          wordBg: 'булка',
          transcription: '[бу́л-ка]',
          translationUa: 'наречена (молода у весільній сукні)',
          category: 'Люди та фальшиві друзі',
          detectiveTip: '«Булка» — це наречена! А хлібобулочний виріб болгари називають «питка» або «кифла». Слово «майка» означає рідну маму, а не спідню білизну (яка зветься «потник»).',
          exampleSentence: 'Красивата булка пътува с влака за своята сватба.',
          exampleTranslation: 'Красива наречена їде поїздом на своє весілля.',
        },
        audioText: 'Красивата булка пътува с влака за своята сватба.',
        xpReward: 15,
      },

      // 14. Пастка: Розшифрування записки про наречену
      {
        id: 'step-2-14-trap-family',
        type: 'trap_warning',
        title: 'Рівень 14: Таємний шифр спільника',
        instruction: 'У кишені офіціанта знайдено записку: «Предай пакета на булката в купе седем. Тя ще го даде на своята майка». Що це означає?',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Розшифруйте інструкцію зловмисників. Кому призначався пакунок з краденим?',
        clueSnippet: {
          label: 'Записка олівцем на серветці',
          text: '«Предай пакета на булката в купе седем. Тя ще го даде на своята майка във Варна.»',
          noteAuthor: 'Невідомий спільник',
        },
        options: [
          {
            id: 'opt-bride-mother',
            text: 'Передати пакунок нареченій у купе №7, яка віддасть його своїй мамі',
            isCorrect: true,
            feedback: 'Блискуче дешифрування! «Булка» — наречена, а «майка» — її мати. Пасажирка у купе №7 — спільниця злочинця!',
          },
          {
            id: 'opt-bread-shirt',
            text: 'Сховати пакунок у здобну булку та загорнути в майку',
            isCorrect: false,
            feedback: 'Класична пастка! «Булка» — не хліб, а «майка» — не одяг!',
          },
          {
            id: 'opt-waiter-pocket',
            text: 'Залишити пакунок під столом офіціанта',
            isCorrect: false,
            feedback: 'Ні, у записці чітко сказано «на булката в купе седем».',
          },
        ],
        xpReward: 25,
      },

      // 15. Теорія: «Живот» (життя!) vs «Корем» (живіт)
      {
        id: 'step-2-15-intro-life',
        type: 'theory_intro',
        title: 'Рівень 15: Питання життя: пастка «Живот»',
        instruction: 'Вивчіть останнє ключове слово для фінального викриття:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'Коли болгарин говорить про «живот», він говорить про найцінніше — людське буття!',
        wordCard: {
          wordBg: 'живот',
          transcription: '[жи-во́т]',
          translationUa: 'життя (людське буття та доля)',
          category: 'Поняття та фальшиві друзі',
          detectiveTip: '«Живот» — це ЖИТТЯ! Анатомічний живіт (частина тіла) болгарською зветься «корем».',
          exampleSentence: 'Този скъп сапфир струва цял един живот.',
          exampleTranslation: 'Цей коштовний сапфір коштує ціле людське життя.',
        },
        audioText: 'Този скъп сапфир струва цял един живот.',
        xpReward: 15,
      },

      // 16. Практика: Звіт лікаря Петкова
      {
        id: 'step-2-16-practice-doctor',
        type: 'word_practice',
        title: 'Рівень 16: Довідка лікаря з купе №2',
        instruction: 'Лікар Петков записав: «Пациентът твърди, че има болка в корема, но неговият живот не е в опасност». Що сталося з пацієнтом?',
        characterName: 'Д-р Петков',
        characterRole: 'Лікар-пасажир поїзда',
        characterAvatar: '👨‍⚕️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Чи дійсно пасажир хворий, чи він лише вдає, щоб мати алібі?',
        audioText: 'Пациентът има болка в корема, но неговият живот не е в опасност.',
        options: [
          {
            id: 'opt-stomach-life',
            text: 'У нього болить живіт («корем»), але його життю («живот») ніщо не загрожує',
            isCorrect: true,
            feedback: 'Правильно! «Корем» — це живіт, а «живот» — життя. Пасажир симулював напад болю в животі, щоб відволікти провідника!',
          },
          {
            id: 'opt-life-danger',
            text: 'Його життя («живот») у небезпеці через травму спини',
            isCorrect: false,
            feedback: 'Ні, лікар зазначив «не е в опасност» (не в небезпеці).',
          },
          {
            id: 'opt-melon-poison',
            text: 'Він отруївся кавуном («диня») у ресторані',
            isCorrect: false,
            feedback: 'У звіті немає згадки про отруєння.',
          },
        ],
        xpReward: 20,
      },

      // 17. Відновлення зізнання: Чорновик каяття офіціанта (sentence_assembly)
      {
        id: 'step-2-17-assembly-confession',
        type: 'sentence_assembly',
        title: 'Рівень 17: Зібрати чорновик зізнання офіціанта',
        instruction: 'Офіціант Радослав почав писати зізнання на серветці, але порвав його. Відновіть ключове речення:',
        characterName: 'Радослав',
        characterRole: 'Офіціант вагона-ресторану',
        characterAvatar: '🧑‍🍳',
        poirotEmotion: 'alert',
        poirotCommentary: 'Усі шматки головоломки сходяться! Відновіть його слова, перш ніж висунути звинувачення!',
        sentenceFragments: {
          correctOrder: ['Аз', 'взех', 'сапфира', 'и', 'го', 'скрих', 'в', 'кошницата'],
          distractorWords: ['чинията', 'купето'],
        },
        audioText: 'Аз взех сапфира и го скрих в кошницата.',
        xpReward: 25,
      },

      // 18. Фінальний допит: Бос-очна ставка з офіціантом Радославом (45 сек)
      {
        id: 'step-2-18-boss-interrogation',
        type: 'boss_interrogation',
        title: 'Рівень 18: Очна ставка з офіціантом Радославом',
        instruction: 'У вас є 45 секунд, щоб розбити брехню офіціанта! Який дедуктивний висновок остаточно доводить його провину?',
        characterName: 'Радослав',
        characterRole: 'Головний офіціант поїзда',
        characterAvatar: '🧑‍🍳',
        poirotEmotion: 'shocked',
        poirotCommentary: 'Час настав! «Сірі клітинки» готові завдати вирішального удару. Притисніть його до стіни фактами!',
        timeLimitSeconds: 45,
        audioText: 'Вие нямате доказателства! Аз просто сервирах диня и почиствах масата!',
        options: [
          {
            id: 'opt-deduction-win',
            text: '«Ви сказали, що сумка була на столі, але насправді вона стояла на стільці (стол). Ви викрали сапфір у темряві під час зупинки в лісі (гора), сховали його в кошик з хлібом і мали передати нареченій (булка) у купе №7!»',
            isCorrect: true,
            feedback: 'Блискучий тріумф дедукції Пуаро! Офіціант Радослав упав на коліна, дістав із кошика з хлібом сяючий сапфір «Сълзата на Черно море» і видав усю банду контрабандистів!',
          },
          {
            id: 'opt-deduction-fail-1',
            text: '«Ви просто погано приготували кавун (диня) для пані Данилової.»',
            isCorrect: false,
            feedback: 'Радослав лише насміхається над таким звинуваченням! Час спливає, а сапфір зникає!',
          },
          {
            id: 'opt-deduction-fail-2',
            text: '«Я знайшов ваш квиток на поїзд, і він виявився простроченим.»',
            isCorrect: false,
            feedback: 'Це не стосується крадіжки коштовності. Злочинець скористався вашим ваганням!',
          },
        ],
        xpReward: 50,
      },
    ],
  },
];

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
  category: 'logic' | 'streak' | 'speech' | 'accuracy';
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'grey-cells',
    icon: '🧠',
    title: '«Сірі клітинки»',
    description: 'Розкрити 5 підступних слів-пасток у розмовах свідків без помилок.',
    unlocked: false,
    category: 'logic',
  },
  {
    id: 'cold-blooded',
    icon: '⏳',
    title: '«Холоднокровний детектив»',
    description: '7 днів щоденної практики поспіль (знищення ліні та прокрастинації).',
    unlocked: false,
    category: 'streak',
  },
  {
    id: 'clean-confession',
    icon: '🎙️',
    title: '«Чисте зізнання»',
    description: 'Пройти розмовний етап допиту без помилок та чернеток.',
    unlocked: false,
    category: 'speech',
  },
  {
    id: 'sharp-eye',
    icon: '🔎',
    title: '«Увага до деталей»',
    description: 'Знайти всі приховані розбіжності в розкладі та свідченнях під час квесту.',
    unlocked: false,
    category: 'accuracy',
  },
  {
    id: 'verdict-delivered',
    icon: '⚖️',
    title: '«Вердикт винесено»',
    description: 'Успішно висунути обвинувачення босу-підозрюваному з першої спроби.',
    unlocked: false,
    category: 'logic',
  },
];
