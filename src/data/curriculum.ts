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

export interface QuestStep {
  id: string;
  type: 'audio_testimony' | 'clue_translation' | 'trap_disarm' | 'boss_interrogation';
  title: string;
  instruction: string;
  characterName: string;
  characterRole: string;
  characterAvatar: string;
  audioText?: string;
  clueSnippet?: {
    label: string;
    text: string;
    noteAuthor: string;
  };
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  timeLimitSeconds?: number;
  xpReward: number;
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
  steps: QuestStep[];
}

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: 'case-01-missing-key',
    number: 1,
    title: 'Справа про зниклий ключ',
    location: 'Гранд-Готель «Балкан», Софія',
    status: 'unlocked',
    description: 'З номеру мансарди 42 викрадено секретні креслення. Портьє запевняє, що гість пішов о 21:30, але біля дверей знайдено дивну записку зі слідами поспіху.',
    rewardItem: 'Ключ від мансарди',
    badgeReward: 'Гостре око',
    requiredXp: 0,
    steps: [
      {
        id: 'step-1-porter-testimony',
        type: 'audio_testimony',
        title: 'Етап 1: Показання портьє Бояна',
        instruction: 'Натисніть кнопку грамофона, щоб прослухати свідчення портьє болгарською мовою. Зверніть особливу увагу на час та номер кімнати.',
        characterName: 'Боян Ангелов',
        characterRole: 'Нічний портьє готелю',
        characterAvatar: '🛎️',
        audioText: 'Добър вечер, господин детектив. Гостът от стая четиридесет и две напусна хотела точно в девет часа и тридесет минути вечерта.',
        options: [
          {
            id: 'opt-1',
            text: 'Гість із номеру 42 залишив готель рівно о 21:30 (девет часа и тридесет минути).',
            isCorrect: true,
            feedback: 'Блискуче! «Стая 42» та «девет часа и тридесет минути» розпізнано бездоганно. (+25 XP)',
          },
          {
            id: 'opt-2',
            text: 'Гість із номеру 24 пішов о 20:00 (осем часа).',
            isCorrect: false,
            feedback: 'Помилка спостережливості! Боян сказав «четиридесет и две» (42), а не 24.',
          },
          {
            id: 'opt-3',
            text: 'Гість із номеру 42 взагалі не виходив зі своєї кімнати.',
            isCorrect: false,
            feedback: 'Невірно! Дієслово «напусна» означає «покинув / залишив».',
          },
        ],
        xpReward: 25,
      },
      {
        id: 'step-2-deceptive-note',
        type: 'trap_disarm',
        title: 'Етап 2: Записка біля дверей (Пастка напрямку)',
        instruction: 'Огляньте клапоть паперу, знайдений під килимом. У ньому є критично важлива вказівка. Остерігайтеся хибних друзів перекладача!',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Приватний детектив',
        characterAvatar: '🕵️‍♂️',
        clueSnippet: {
          label: 'Речовий доказ № 14-B',
          text: '«Тръгнете направо през дългия коридор, след това завийте надясно към асансьора. Ключът е под килима.»',
          noteAuthor: 'Невідомий спільник',
        },
        audioText: 'Тръгнете направо през дългия коридор, след това завийте надясно към асансьора.',
        options: [
          {
            id: 'opt-trap-1',
            text: 'Повернути праворуч по довгому коридору, а потім наліво до сходів.',
            isCorrect: false,
            feedback: 'Ви потрапили у пастку автоперекладача! «Направо» болгарською означає ПРЯМО! (-5 XP)',
          },
          {
            id: 'opt-trap-2',
            text: 'Іти ПРЯМО через довгий коридор, а потім повернути ПРАВОРУЧ до ліфта.',
            isCorrect: true,
            feedback: 'Чудово! Ви знешкодили пастку: «направо» = прямо, а «надясно» = праворуч! «Асансьор» = ліфт. (+15 XP)',
          },
          {
            id: 'opt-trap-3',
            text: 'Спуститися вниз і залишити ключ на рецепції.',
            isCorrect: false,
            feedback: 'У тексті немає жодного слова про спуск чи рецепцію. Читайте зачіпку уважніше!',
          },
        ],
        xpReward: 15,
      },
      {
        id: 'step-3-interrogation-boss',
        type: 'boss_interrogation',
        title: 'Етап 3: Фінальний допит портьє (Очна ставка)',
        instruction: 'Викрийте неправдиве алібі! Портьє стверджує, що гість вийшов о 21:30. Але на квитку на поїзд стоїть штамп 21:00! У вас є обмежений час для висунення бездоганного звинувачення болгарською.',
        characterName: 'Боян Ангелов',
        characterRole: 'Підозрюваний портьє',
        characterAvatar: '😰',
        audioText: 'Кълна се, господин детектив! Часовникът показваше девет и половина! Защо ме гледате така?',
        timeLimitSeconds: 40,
        options: [
          {
            id: 'boss-opt-1',
            text: '«Има разлика от тридесет минути! Билетът е подпечатан в девет часа! Лъжете, господин Боян!»',
            isCorrect: true,
            feedback: 'БРАВО! «Сірі клітинки» Пуаро торжествують! Ви вказали на розбіжність у 30 хвилин. Портьє зізнається у приховуванні злодія! (+30 XP)',
          },
          {
            id: 'boss-opt-2',
            text: '«Всичко е наред, господин Боян, благодаря за кафето.»',
            isCorrect: false,
            feedback: 'Ви просто подякували йому за каву! Підозрюваний втік, справа провалена!',
          },
          {
            id: 'boss-opt-3',
            text: '«Аз обичам да спя в стая четиридесет и две.»',
            isCorrect: false,
            feedback: 'Безглузда репліка: «Я люблю спати в кімнаті 42». Портьє здивовано сміється з вас.',
          },
        ],
        xpReward: 30,
      },
    ],
  },
  {
    id: 'case-02-orient-express',
    number: 2,
    title: 'Таємниця Східного Експресу',
    location: 'Вагон-ресторан поїзда «Софія — Варна»',
    status: 'locked',
    description: 'Під час вечері зник коштовний сапфір пані Данилової. Офіціант нервує при замовленні страв, плутаючи «стол» (стілець) та «диня» (кавун).',
    rewardItem: 'Залізничний розклад кондуктора',
    badgeReward: 'Чисте зізнання',
    requiredXp: 70,
    steps: [],
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
    unlocked: true, // starts unlocked for motivation
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
