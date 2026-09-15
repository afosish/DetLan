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
    id: 'case-01-missing-key',
    number: 1,
    title: 'Справа про зниклий ключ',
    location: 'Гранд-Готель «Балкан», Софія',
    status: 'unlocked',
    description: 'З номеру мансарди 42 викрадено секретні креслення. Портьє запевняє, що гість пішов о 21:30, але біля дверей знайдено дивну записку зі слідами поспіху. Пройдіть 15 рівнів розслідування: вивчайте болгарські слова, розпізнавайте хибних друзів та викрийте спільника!',
    rewardItem: 'Ключ від мансарди',
    badgeReward: 'Гостре око',
    requiredXp: 0,
    steps: [
      // 1. Теорія: Привітання
      {
        id: 'step-01-intro-greeting',
        type: 'theory_intro',
        title: 'Рівень 1: Вітання в лобі готелю',
        instruction: 'Перед тим як розпочати допит свідків, детектив зобов\'язаний знати формули ввічливості. Прослухайте та запам\'ятайте болгарське вітання:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'Mon cher ami, ввічливість відчиняє навіть замкнені двері! Послухайте, як вимовляється головне вечірнє вітання:',
        wordCard: {
          wordBg: 'Добър вечер',
          transcription: '[до́бър ве́чер]',
          translationUa: 'Добрий вечір',
          category: 'Етикет слідчого',
          detectiveTip: 'Зверніть увагу на болгарську літеру «Ъ» у слові «добър» — це короткий глухий голосний звук, схожий на щось середнє між [и] та [е].',
          exampleSentence: 'Добър вечер, господин детектив!',
          exampleTranslation: 'Добрий вечір, пане детектив!',
        },
        audioText: 'Добър вечер',
        xpReward: 10,
      },

      // 2. Практика: Перший контакт
      {
        id: 'step-02-practice-greeting',
        type: 'word_practice',
        title: 'Рівень 2: Перший контакт на рецепції',
        instruction: 'Ви підійшли до стійки нічного портьє Бояна. На годиннику 22:00. Як болгарською мовою ввічливо привітатися з ним?',
        characterName: 'Боян Ангелов',
        characterRole: 'Нічний портьє готелю',
        characterAvatar: '🛎️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Зробіть бездоганне враження, щоб портьє відчув ваш авторитет.',
        options: [
          {
            id: 'opt-2-1',
            text: '«Добър вечер!»',
            isCorrect: true,
            feedback: 'Блискуче! Портьє чемно кивнув головою і готовий відповідати на ваші запитання. (+15 XP)',
          },
          {
            id: 'opt-2-2',
            text: '«Добро утро!»',
            isCorrect: false,
            feedback: 'Зараз ніч! «Добро утро» означає «Доброго ранку». Портьє здивовано зиркає на вас.',
          },
          {
            id: 'opt-2-3',
            text: '«Лека нощ!»',
            isCorrect: false,
            feedback: '«Лека нощ» — це «На добраніч» (побажання перед сном, а не привітання для бесіди).',
          },
        ],
        xpReward: 15,
      },

      // 3. Теорія: Номер і кімната
      {
        id: 'step-03-intro-room',
        type: 'theory_intro',
        title: 'Рівень 3: Місце злочину — Кімната',
        instruction: 'Вивчаємо ключове слово для готельних розслідувань та знайомимося з болгарським означеним артиклем:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'Зверніть увагу: у болгарській мові артикль приєднується прямо до кінця слова!',
        wordCard: {
          wordBg: 'стая / стаята',
          transcription: '[ста́я / ста́ята]',
          translationUa: 'кімната / конкретна кімната (номер)',
          category: 'Локація справи',
          detectiveTip: '«Стая» — це просто кімната. А закінчення «-та» робить її конкретною: «стаята» = саме той номер, де скоєно злочин!',
          exampleSentence: 'Влезте в стаята на мансардата.',
          exampleTranslation: 'Увійдіть до кімнати на мансарді.',
        },
        audioText: 'стая, стаята',
        xpReward: 10,
      },

      // 4. Теорія: Числа та номер 42
      {
        id: 'step-04-intro-numbers',
        type: 'theory_intro',
        title: 'Рівень 4: Числа та номер мансарди',
        instruction: 'Злочини відбуваються в конкретних номерах. Вивчіть, як болгарською звучить номер кімнати «42»:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Математична точність — основа дедукції. Четири (4) + десет (10) = 40!',
        wordCard: {
          wordBg: 'четиридесет и две (42)',
          transcription: '[четириде́сет и две]',
          translationUa: 'сорок два (42)',
          category: 'Коди та нумерація',
          detectiveTip: 'Десятки утворюються додаванням «-десет»: четиридесет (40). Числа поєднуються сполучником «и»: четиридесет и две = 42.',
          exampleSentence: 'Стая четиридесет и две е празна.',
          exampleTranslation: 'Кімната сорок два порожня.',
        },
        audioText: 'четиридесет и две',
        xpReward: 10,
      },

      // 5. Аудіо-свідчення: Номер кімнати
      {
        id: 'step-05-audio-room',
        type: 'audio_testimony',
        title: 'Етап 5: Запис свідчень портьє на грамофоні',
        instruction: 'Натисніть кнопку звуку, уважно послухайте свідчення портьє та визначте, про який номер кімнати він говорить:',
        characterName: 'Боян Ангелов',
        characterRole: 'Нічний портьє',
        characterAvatar: '🛎️',
        poirotEmotion: 'alert',
        poirotCommentary: 'Слухайте уважно кожне слово. Не дайте цифрам ввести вас в оману!',
        audioText: 'Гостът беше настанен в стая четиридесет и две на последния етаж.',
        options: [
          {
            id: 'opt-5-1',
            text: 'Номер 42 (стая четиридесет и две)',
            isCorrect: true,
            feedback: 'Чудова спостережливість! Номер мансарди 42 зафіксовано у слідчому протоколі. (+20 XP)',
          },
          {
            id: 'opt-5-2',
            text: 'Номер 24 (стая двадесет и четири)',
            isCorrect: false,
            feedback: 'Помилка розпізнавання! Боян чітко вимовив «четиридесет и две» (42), а не 24.',
          },
          {
            id: 'opt-5-3',
            text: 'Номер 14 (стая четиринадесет)',
            isCorrect: false,
            feedback: 'Невірно. 14 болгарською звучить як «четиринадесет».',
          },
        ],
        xpReward: 20,
      },

      // 5.5 Обшук кімнати мансарди
      {
        id: 'step-05b-crime-scene-room',
        type: 'crime_scene_search',
        title: 'Рівень 6: Обшук номера мансарди 42',
        instruction: 'Обшукайте кімнату мансарди. Натискайте на предмети, щоб дізнатися їх болгарські назви та знайти сховану улику!',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️♂️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Обережно оглядайте кожен предмет, mon ami. Пам\'ятайте головну пастку: болгарський «стол» — це стілець, а «маса» — це стіл!',
        crimeScene: {
          sceneName: 'hotel-room-42',
          sceneDescription: 'Мансарда 42, Гранд-Готель «Балкан» — місце викрадення креслень',
          hotspots: [
            {
              id: 'hs-bed',
              objectName: 'Легло',
              position: { x: 5, y: 15, width: 30, height: 35 },
              wordBg: 'легло',
              transcription: '[легло́]',
              translationUa: 'ліжко',
              isEvidence: false,
              poirotHint: 'Ліжко акуратно застелене. Нічого підозрілого.',
            },
            {
              id: 'hs-table',
              objectName: 'Маса (стіл)',
              position: { x: 55, y: 10, width: 22, height: 30 },
              wordBg: 'маса',
              transcription: '[ма́са]',
              translationUa: 'стіл',
              isEvidence: false,
              poirotHint: 'Пам\'ятайте: «маса» = стіл! А «стол» = стілець. Не плутайте!',
            },
            {
              id: 'hs-chair',
              objectName: 'Стол (стілець)',
              position: { x: 80, y: 25, width: 15, height: 30 },
              wordBg: 'стол',
              transcription: '[стол]',
              translationUa: 'стілець (!)',
              isEvidence: false,
              poirotHint: 'Ось вона, головна пастка! «Стол» болгарською — це СТІЛЕЦЬ, на ньому сидять!',
            },
            {
              id: 'hs-carpet',
              objectName: 'Килим',
              position: { x: 35, y: 55, width: 35, height: 20 },
              wordBg: 'килим',
              transcription: '[кили́м]',
              translationUa: 'килим',
              isEvidence: true,
              poirotHint: 'Sacré bleu! Під килимом — сліди подряпин! Хтось ховав тут предмет... Можливо, ключ!',
            },
            {
              id: 'hs-window',
              objectName: 'Прозорец',
              position: { x: 40, y: 2, width: 20, height: 18 },
              wordBg: 'прозорец',
              transcription: '[прозо́рец]',
              translationUa: 'вікно',
              isEvidence: false,
              poirotHint: 'Вікно зачинене зсередини. Злочинець не міг увійти цим шляхом.',
            },
            {
              id: 'hs-door',
              objectName: 'Врата',
              position: { x: 0, y: 50, width: 12, height: 45 },
              wordBg: 'врата',
              transcription: '[вра́та]',
              translationUa: 'двері',
              isEvidence: false,
              poirotHint: 'Замок не зламано — хтось відчинив дверима ключем!',
            },
          ],
        },
        audioText: 'Влезте в стаята и огледайте всичко внимателно.',
        xpReward: 25,
      },

      // 6. Теорія: Час і годинник
      {
        id: 'step-06-intro-time',
        type: 'theory_intro',
        title: 'Рівень 6: Хронологія злочину та час',
        instruction: 'Вивчаємо болгарські слова для точного позначення часу та перевірки алібі підозрюваних:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'Кожна секунда на вагу золота. Зверніть увагу на різницю між годиною та хвилиною:',
        wordCard: {
          wordBg: 'час / минута / девет часа (21:00)',
          transcription: '[час / мину́та / де́вет часа́]',
          translationUa: 'година / хвилина / дев\'ята година',
          category: 'Час і хронологія',
          detectiveTip: 'Слово «час» у болгарській мові означає саме ГОДИНУ (а не період часу). «Девет часа и тридесет минути» = 9 година 30 хвилин (21:30).',
          exampleSentence: 'В колко часа напусна хотела?',
          exampleTranslation: 'О котрій годині він покинув готель?',
        },
        audioText: 'девет часа и тридесет минути',
        xpReward: 10,
      },

      // 7. Практика: Звірення годинника
      {
        id: 'step-07-practice-time',
        type: 'word_practice',
        title: 'Рівень 7: Перевірка журналу відвідувань',
        instruction: 'У журналі портьє записано: «Гостът напусна в девет часа и тридесет минути вечерта». О котрій годині за 24-годинним форматом це сталося?',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Співставте «девет часа» (9:00) та «тридесет минути» (30 хв) вечора.',
        options: [
          {
            id: 'opt-7-1',
            text: 'О 21:30 (дев\'ята тридцять вечора)',
            isCorrect: true,
            feedback: 'Точно! Хронометраж подій співпадає: 21:30. (+15 XP)',
          },
          {
            id: 'opt-7-2',
            text: 'О 20:15 (восьма п\'ятнадцять)',
            isCorrect: false,
            feedback: 'Невірно! «Девет» — це 9, а «тридесет» — це 30.',
          },
          {
            id: 'opt-7-3',
            text: 'О 22:00 (десята година рівно)',
            isCorrect: false,
            feedback: 'Помилка! Десята година була б «десет часа».',
          },
        ],
        xpReward: 15,
      },

      // 8. Пастка: Напрямок руху (Направо vs Надясно)
      {
        id: 'step-08-trap-direction',
        type: 'trap_warning',
        title: 'Рівень 8: Головна мовна пастка — «НАПРАВО»!',
        instruction: 'Увага! Це найпідступніше болгарське слово для українця. Ознайомтеся з пасткою напрямку:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'alert',
        poirotCommentary: 'Sacré bleu! Якщо болгарин кричить вам «Направо!», куди ви побіжите? Тільки не повертайте праворуч!',
        wordCard: {
          wordBg: 'направо = ПРЯМО! (а праворуч = надясно)',
          transcription: '[напра́во = ПРЯМО, надя́сно = праворуч]',
          translationUa: 'ПРЯМО вперед! (а не праворуч!)',
          category: 'Смертельні слова-пастки',
          detectiveTip: '«Направо» болгарською означає виключно «ПРЯМО ВПЕРЕД»! Поворот праворуч — це «надясно», а ліворуч — «наляво».',
          exampleSentence: 'Вървете направо през коридора, не завивайте!',
          exampleTranslation: 'Ідіть прямо через коридор, не повертайте!',
        },
        audioText: 'Вървете направо през коридора.',
        options: [
          {
            id: 'opt-8-1',
            text: '«Направо» означає рухатися прямо вперед!',
            isCorrect: true,
            feedback: 'Браво! Ви знешкодили найпідступнішу мовну пастку Балкан! (+20 XP)',
          },
          {
            id: 'opt-8-2',
            text: '«Направо» означає повернути в правий бік.',
            isCorrect: false,
            feedback: 'Ви потрапили у пастку! У болгарській мові поворот праворуч — це «надясно», а «направо» — це ПРЯМО!',
          },
        ],
        xpReward: 20,
      },

      // 9. Практика: План втечі коридором
      {
        id: 'step-09-practice-direction',
        type: 'word_practice',
        title: 'Рівень 9: Переслідування втікача коридором',
        instruction: 'Ви помітили свіжі сліди бруду біля сходів. Портьє вказує рукою і каже: «Тръгнете направо към асансьора, а след това надясно». Куди бігти?',
        characterName: 'Боян Ангелов',
        characterRole: 'Нічний портьє',
        characterAvatar: '🛎️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Згадайте: «направо» = прямо, «асансьор» = ліфт, «надясно» = праворуч.',
        options: [
          {
            id: 'opt-9-1',
            text: 'Бігти прямо до ліфта, а потім повернути праворуч.',
            isCorrect: true,
            feedback: 'Вірно! Маршрут пройдено без затримок. Ви вийшли точно до схованки! (+15 XP)',
          },
          {
            id: 'opt-9-2',
            text: 'Повернути праворуч до ліфта, а потім іти прямо.',
            isCorrect: false,
            feedback: 'Помилка! «Тръгнете направо» означає рушати прямо!',
          },
          {
            id: 'opt-9-3',
            text: 'Розвернутися назад і спуститися у підвал.',
            isCorrect: false,
            feedback: 'У репліці портьє взагалі не було слів про підвал чи повернення назад.',
          },
        ],
        xpReward: 15,
      },

      // 10. Теорія & Пастка: Меблі (Стол vs Маса)
      {
        id: 'step-10-trap-furniture',
        type: 'trap_warning',
        title: 'Рівень 10: Меблі номеру 42 (Пастка столу)',
        instruction: 'Ви зайшли до номеру 42 для огляду. Не сплутайте назви меблів у болгарській мові:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'У кімнаті стоїть «стол» і «маса». Але де тут стілець, а де стіл? Зараз розберемося!',
        wordCard: {
          wordBg: 'стол = СТІЛЕЦЬ (а стіл = маса)',
          transcription: '[стол = стілець, ма́са = стіл]',
          translationUa: '«Стол» — це стілець, а стіл — це «маса»!',
          category: 'Огляд місця події',
          detectiveTip: 'Слово «стол» у болгарській мові означає СТІЛЕЦЬ, на якому сидять! А стіл для роботи або обіду називається «маса».',
          exampleSentence: 'Седнете на този стол до голямата маса.',
          exampleTranslation: 'Сідайте на цей стілець біля великого столу.',
        },
        audioText: 'Седнете на този стол до голямата маса.',
        options: [
          {
            id: 'opt-10-1',
            text: 'Болгарський «стол» — це стілець для сидіння, а «маса» — це стіл!',
            isCorrect: true,
            feedback: 'Чудова пам\'ять! Тепер ви знаєте, де саме шукати сліди пальців. (+20 XP)',
          },
          {
            id: 'opt-10-2',
            text: '«Стол» — це письмовий стіл, а «маса» — вага предмета.',
            isCorrect: false,
            feedback: 'Пастка! На болгарському «столі» сидять, бо це звичайнісінький стілець!',
          },
        ],
        xpReward: 20,
      },

      // 11. Дослідження доказів: Пошук ключа
      {
        id: 'step-11-clue-key',
        type: 'clue_analysis',
        title: 'Рівень 11: Огляд схованок під меблями',
        instruction: 'Під час огляду кімнати 42 детектив Пуаро знайшов прихований запис: «Ключът е скрит под килима до масата». Де сховано доказ?',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Під килимом (под килима) біля столу (до масата). Перевірте це місце!',
        clueSnippet: {
          label: 'Слідчий протокол огляду',
          text: '«Ключът от мансардата е под килима близо до масата.»',
          noteAuthor: 'Інспектор поліції',
        },
        audioText: 'Ключът е под килима близо до масата.',
        options: [
          {
            id: 'opt-11-1',
            text: 'Ключ лежить під килимом біля столу.',
            isCorrect: true,
            feedback: 'Знайдено! Ви підняли кут килима і знайшли латунний ключ від мансарди! (+20 XP)',
          },
          {
            id: 'opt-11-2',
            text: 'Ключ сховано на стільці під подушкою.',
            isCorrect: false,
            feedback: 'У записі написано «под килима» (під килимом), а не на стільці.',
          },
          {
            id: 'opt-11-3',
            text: 'Ключ викинуто у відчинене вікно.',
            isCorrect: false,
            feedback: 'У тексті доказу такого немає. Читайте протокол уважніше!',
          },
        ],
        xpReward: 20,
      },

      // 11.5 Відновлення розірваної записки
      {
        id: 'step-11b-sentence-assembly',
        type: 'sentence_assembly',
        title: 'Рівень 14: Відновлення розірваної записки',
        instruction: 'Ви знайшли у смітнику шматки розірваної записки. Складіть болгарські слова у правильному порядку, щоб прочитати таємну інструкцію:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️♂️',
        poirotEmotion: 'alert',
        poirotCommentary: 'Кожен шматочок паперу — це фрагмент змови! Зберіть текст у правильному порядку, щоб розшифрувати план злочинців.',
        sentenceFragments: {
          correctOrder: ['Вземете', 'ключа', 'под', 'килима', 'до', 'масата'],
          distractorWords: ['стола', 'надясно'],
        },
        audioText: 'Вземете ключа под килима до масата.',
        xpReward: 25,
      },

      // 12. Теорія: Дієслова пересування
      {
        id: 'step-12-intro-verbs',
        type: 'theory_intro',
        title: 'Рівень 12: Дієслова дії та втечі',
        instruction: 'Щоб зрозуміти, хто куди переміщався, вивчіть три головні детективні дієслова минулого часу:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'speaking',
        poirotCommentary: 'Хто увійшов, а хто втік? Ці дієслова розкриють задум спільників:',
        wordCard: {
          wordBg: 'напусна / влезе / взе',
          transcription: '[напу́сна / вле́зе / взе]',
          translationUa: 'покинув (вийшов) / увійшов (зайшов) / узяв',
          category: 'Дії фігурантів справи',
          detectiveTip: '«Той напусна хотела» = він покинув готель. «Той влезе в стаята» = він зайшов у кімнату. «Той взе ключа» = він узяв ключ.',
          exampleSentence: 'Заподозреният напусна сградата бързо.',
          exampleTranslation: 'Підозрюваний швидко покинув будівлю.',
        },
        audioText: 'Той напусна хотела и влезе в асансьора.',
        xpReward: 10,
      },

      // 13. Розбір повної записки спільника
      {
        id: 'step-13-clue-full-note',
        type: 'clue_analysis',
        title: 'Рівень 13: Розшифрування записки спільника',
        instruction: 'Ви зібрали докупи шматки паперу зі смітника біля ліфта. Прочитайте повний текст записки та виберіть точний зміст інструкції злочинців:',
        characterName: 'Еркюль Пуаро',
        characterRole: 'Метр детективу',
        characterAvatar: '🕵️‍♂️',
        poirotEmotion: 'alert',
        poirotCommentary: 'Застосуйте всі вивчені слова: ключ під килимом, рух прямо та ліфт!',
        clueSnippet: {
          label: 'Речовий доказ № 14-B (Секретна записка)',
          text: '«Вземете ключа под килима до масата. Тръгнете направо през коридора и вземете асансьора в девет часа.»',
          noteAuthor: 'Таємничий спільник Бояна',
        },
        audioText: 'Вземете ключа под килима до масата. Тръгнете направо през коридора и вземете асансьора в девет часа.',
        options: [
          {
            id: 'opt-13-1',
            text: 'Взяти ключ під килимом біля столу, іти прямо коридором і скористатися ліфтом о дев\'ятій годині.',
            isCorrect: true,
            feedback: 'Бездоганний переклад! Усі зачіпки зійшлися в єдину картину змови. (+25 XP)',
          },
          {
            id: 'opt-13-2',
            text: 'Залишити ключ на стільці, повернути праворуч і чекати біля входу о десятій годині.',
            isCorrect: false,
            feedback: 'Помилка! «Тръгнете направо» — це прямо, а «под килима» — під килимом!',
          },
          {
            id: 'opt-13-3',
            text: 'Сховати валізу в ресторані та піти пішки на вокзал.',
            isCorrect: false,
            feedback: 'У записці нічого немає про валізу чи вокзал. Будьте уважнішими.',
          },
        ],
        xpReward: 25,
      },

      // 13.5 Відновлення алібі портьє
      {
        id: 'step-13b-alibi-assembly',
        type: 'sentence_assembly',
        title: 'Рівень 16: Зібрати алібі портьє',
        instruction: 'Портьє Боян написав офіційне свідчення, але нервував і порвав його. Зберіть речення його алібі:',
        characterName: 'Боян Ангелов',
        characterRole: 'Нічний портьє готелю',
        characterAvatar: '😰',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Якщо ми зберемо його алібі правильно, зможемо знайти суперечності з іншими доказами!',
        sentenceFragments: {
          correctOrder: ['Гостът', 'напусна', 'стаята', 'в', 'девет', 'часа', 'и', 'тридесет', 'минути'],
          distractorWords: ['десет', 'влезе'],
        },
        audioText: 'Гостът напусна стаята в девет часа и тридесет минути.',
        xpReward: 20,
      },

      // 14. Практика: Правда та брехня (Истина vs Лъжа)
      {
        id: 'step-14-practice-truth',
        type: 'word_practice',
        title: 'Рівень 14: Викриття суперечностей свідка',
        instruction: 'Портьє Боян помітно нервує і пітніє. Він вигукує: «Кълна се, казвам истината! Не лъжа!» (Клянуся, я кажу правду! Я не брешу!). Яке слово в болгарській мові означає «брехати / неправда»?',
        characterName: 'Боян Ангелов',
        characterRole: 'Нічний портьє',
        characterAvatar: '😰',
        poirotEmotion: 'thinking',
        poirotCommentary: 'Його голос тремтить. «Сірі клітинки» підказують, що він приховує правду!',
        options: [
          {
            id: 'opt-14-1',
            text: 'лъжа / лъжете (брехня / ви брешете)',
            isCorrect: true,
            feedback: 'Правильно! Дієслово «лъжа» — брехати. Ви готові до фінального викриття! (+20 XP)',
          },
          {
            id: 'opt-14-2',
            text: 'казвам (говорю / кажу)',
            isCorrect: false,
            feedback: 'Ні, «казвам» означає просто говорити або повідомляти.',
          },
          {
            id: 'opt-14-3',
            text: 'истина (правда)',
            isCorrect: false,
            feedback: '«Истина» — це навпаки правда (істина), а не брехня.',
          },
        ],
        xpReward: 20,
      },

      // 15. Фінальний бос: Очна ставка з Бояном
      {
        id: 'step-15-boss-interrogation',
        type: 'boss_interrogation',
        title: 'Рівень 15: Фінальний допит портьє Бояна (Очна ставка)',
        instruction: 'Висуньте беззаперечне фінальне звинувачення! Спираючись на знайдені докази, розклад і записку, розбийте алібі портьє (У вас 45 секунд):',
        characterName: 'Боян Ангелов',
        characterRole: 'Спільник викрадача',
        characterAvatar: '😰',
        poirotEmotion: 'shocked',
        poirotCommentary: 'Час завдати вирішального удару! Покажіть портьє всю силу дедукції!',
        audioText: 'Защо ме обвинявате? Казах ви, че гостът от стая четиридесет и две напусна в девет часа и тридесет минути!',
        timeLimitSeconds: 45,
        options: [
          {
            id: 'boss-opt-1',
            text: '«Ви брешете (лъжете)! У записці чорним по білому написано взяти ключ під килимом (под килима) біля столу і йти прямо (направо) до ліфта о 21:00 (девет часа). Ви особисто сховали ключ для крадія креслень!»',
            isCorrect: true,
            feedback: 'БРАВО! «Сірі клітинки» Пуаро тріумфують! Портьє Боян упав на коліна та зізнався у змові. Креслення врятовано, а Справу №1 повністю розкрито! (+50 XP)',
          },
          {
            id: 'boss-opt-2',
            text: '«Вибачте, Бояне, я помилився дверима. Будь ласка, принесіть мені чашку чаю в номер 24.»',
            isCorrect: false,
            feedback: 'Ви злякалися і відступили! Злочинець утік із кресленнями, справа провалена!',
          },
          {
            id: 'boss-opt-3',
            text: '«Я просто хотів запитати, скільки коштує сніданок у готелі.»',
            isCorrect: false,
            feedback: 'Абсурдне питання! Портьє перевів подих і встиг знищити докази, поки ви говорили про сніданок.',
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
    description: 'Під час вечері зник коштовний сапфір пані Данилової. Офіціант нервує при замовленні страв, плутаючи «стол» (стілець) та «диня» (кавун).',
    rewardItem: 'Залізничний розклад кондуктора',
    badgeReward: 'Чисте зізнання',
    requiredXp: 70,
    requiredClue: 'Ключ від мансарди',
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
          hotspots: [
            {
              id: 'hs-chair',
              objectName: 'Стілець пані Данилової',
              position: { x: 12, y: 50, width: 22, height: 32 },
              wordBg: 'стол',
              transcription: '[стол]',
              translationUa: 'стілець',
              isEvidence: false,
              poirotHint: 'Зручний стілець з оксамитом. Сумочки тут вже немає, лише сліди поспіху.',
            },
            {
              id: 'hs-glass',
              objectName: 'Келих для вина',
              position: { x: 40, y: 32, width: 14, height: 20 },
              wordBg: 'чаша за вино',
              transcription: '[ча́-ша за ви́-но]',
              translationUa: 'келих для вина',
              isEvidence: false,
              poirotHint: 'Келих порожній. Відбитків пальців немає — офіціант працював у рукавичках.',
            },
            {
              id: 'hs-bread-basket',
              objectName: 'Кошик із хлібом',
              position: { x: 58, y: 38, width: 20, height: 24 },
              wordBg: 'кошница с хляб',
              transcription: '[ко́ш-ни-ца с хляб]',
              translationUa: 'кошик із хлібом',
              isEvidence: true,
              poirotHint: 'Mon Dieu! Під лляною серветкою на дні кошика заховано клаптик розірваної телеграми!',
            },
            {
              id: 'hs-curtain',
              objectName: 'Фіранка біля вікна',
              position: { x: 82, y: 15, width: 14, height: 48 },
              wordBg: 'перде',
              transcription: '[пер-де́]',
              translationUa: 'фіранка',
              isEvidence: false,
              poirotHint: 'Важка фіранка. За вікном лише нічна темрява та миготіння ліхтарів.',
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
