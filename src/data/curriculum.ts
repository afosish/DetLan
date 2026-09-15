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
  | 'boss_interrogation';

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
