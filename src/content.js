export const languages = [
  { id: 'ko', label: 'KR' },
  { id: 'en', label: 'EN' },
];

const heroTitle = {
  ko: '한국의 전통',
  en: "korea's Traditions",
};

const images = {
  hanok: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bukchon_Hanok_Village.jpg?width=1200',
  hanbok: 'assets/images/hanbok-mannequin.svg',
  games: 'https://commons.wikimedia.org/wiki/Special:FilePath/Yut-nori.jpg?width=1200',
};

export const heroSlides = [
  {
    id: 'hanok',
    image: images.hanok,
    title: heroTitle,
    caption: {
      ko: '자연과 어울리는 한옥',
      en: 'Hanok in harmony with nature',
    },
    alt: {
      ko: '한옥 처마와 마당이 보이는 전통 가옥',
      en: 'Traditional Korean hanok with roofline and courtyard',
    },
  },
  {
    id: 'hanbok',
    image: images.hanbok,
    title: heroTitle,
    caption: {
      ko: '색과 선이 아름다운 한복',
      en: 'Hanbok shaped by color and line',
    },
    alt: {
      ko: '전통 한복의 색과 옷감',
      en: 'Traditional hanbok colors and fabric',
    },
  },
  {
    id: 'games',
    image: images.games,
    title: heroTitle,
    caption: {
      ko: '함께 즐기는 전통놀이',
      en: 'Traditional games played together',
    },
    alt: {
      ko: '윷놀이와 전통 놀이 도구',
      en: 'Yutnori and traditional Korean game pieces',
    },
  },
];

export const sections = [
  {
    id: 'houses',
    menuImage: images.hanok,
    heroImage: images.hanok,
    title: { ko: '한국 가옥', en: 'Korean Houses' },
    kicker: { ko: '한옥의 구조와 생활', en: 'Hanok, structure, and daily life' },
    summary: {
      ko: '한옥은 나무, 흙, 돌, 종이 같은 자연 재료로 지은 한국의 전통 가옥입니다. 계절에 맞게 따뜻함과 시원함을 조절하도록 만들어졌고, 마당과 처마를 통해 자연과 가까이 지내는 삶을 담고 있습니다.',
      en: 'Hanok is a traditional Korean house built with natural materials such as wood, earth, stone, and paper. It was designed to stay warm in winter and cool in summer while staying close to nature.',
    },
    cards: [
      {
        title: { ko: '온돌', en: 'Ondol' },
        body: {
          ko: '바닥을 따뜻하게 데우는 한국의 전통 난방 방식입니다.',
          en: 'A traditional heating system that warms the floor.',
        },
      },
      {
        title: { ko: '마루', en: 'Maru' },
        body: {
          ko: '바람이 잘 통하는 나무 바닥 공간으로 여름을 시원하게 보낼 수 있게 합니다.',
          en: 'An open wooden floor area that helps air flow in summer.',
        },
      },
      {
        title: { ko: '자연과의 조화', en: 'Harmony with Nature' },
        body: {
          ko: '마당, 처마, 창호를 통해 집 안팎이 자연스럽게 이어집니다.',
          en: 'Hanok connects with nature through courtyards, roof eaves, and paper doors.',
        },
      },
    ],
    vocabulary: [
      { term: '한옥 Hanok', meaning: { ko: '한국의 전통 가옥', en: 'Traditional Korean house' } },
      { term: '온돌 Ondol', meaning: { ko: '바닥 난방 방식', en: 'Floor heating system' } },
      { term: '마루 Maru', meaning: { ko: '나무로 만든 열린 바닥 공간', en: 'Open wooden floor space' } },
    ],
  },
  {
    id: 'hanbok',
    menuImage: images.hanbok,
    heroImage: images.hanbok,
    title: { ko: '한복', en: 'Hanbok' },
    kicker: { ko: '색, 선, 예절의 옷', en: 'Clothing of color, line, and occasion' },
    summary: {
      ko: '한복은 한국의 전통 의복입니다. 부드러운 선과 넉넉한 형태가 특징이며, 명절과 결혼식 같은 특별한 날에 자주 입습니다. 색과 모양에는 계절, 나이, 예절의 의미가 담기기도 합니다.',
      en: 'Hanbok is traditional Korean clothing. It is known for soft lines and graceful volume, and it is often worn on holidays, weddings, and ceremonies.',
    },
    cards: [
      {
        title: { ko: '저고리', en: 'Jeogori' },
        body: {
          ko: '상체에 입는 한복의 짧은 윗옷입니다.',
          en: 'The short upper garment of hanbok.',
        },
      },
      {
        title: { ko: '치마와 바지', en: 'Chima and Baji' },
        body: {
          ko: '치마는 긴 스커트, 바지는 넉넉한 하의로 한복의 흐르는 실루엣을 만듭니다.',
          en: 'Chima is the long skirt, and baji are loose trousers.',
        },
      },
      {
        title: { ko: '색의 의미', en: 'Meaning of Color' },
        body: {
          ko: '한복의 색은 계절, 나이, 행사, 상징과 연결되기도 합니다.',
          en: 'Colors can connect to season, age, ceremony, and symbolism.',
        },
      },
    ],
    vocabulary: [
      { term: '한복 Hanbok', meaning: { ko: '한국의 전통 의복', en: 'Traditional Korean clothing' } },
      { term: '저고리 Jeogori', meaning: { ko: '한복의 윗옷', en: 'Upper garment' } },
      { term: '치마 Chima', meaning: { ko: '한복의 긴 치마', en: 'Long skirt' } },
    ],
  },
  {
    id: 'games',
    menuImage: images.games,
    heroImage: images.games,
    title: { ko: '전통놀이', en: 'Traditional Games' },
    kicker: { ko: '함께 배우고 즐기는 놀이', en: 'Games for learning and gathering' },
    summary: {
      ko: '한국의 전통놀이는 가족과 마을 사람들이 함께 즐기던 놀이입니다. 명절, 잔치, 마당에서 쉽게 즐길 수 있었고, 규칙이 간단해 처음 접하는 사람도 따라 하기 좋습니다.',
      en: 'Traditional Korean games were enjoyed by families and communities. Many were played during holidays, festivals, and outdoor gatherings.',
    },
    cards: [
      {
        title: { ko: '윷놀이', en: 'Yutnori' },
        body: {
          ko: '윷가락을 던져 말을 움직이는 대표적인 명절 놀이입니다.',
          en: 'A holiday board game played by throwing wooden sticks.',
        },
      },
      {
        title: { ko: '제기차기', en: 'Jegichagi' },
        body: {
          ko: '제기를 발로 차며 떨어뜨리지 않는 놀이입니다.',
          en: 'A game where players kick a jegi and keep it in the air.',
        },
      },
      {
        title: { ko: '투호', en: 'Tuho' },
        body: {
          ko: '항아리에 화살을 던져 넣는 전통놀이입니다.',
          en: 'A game where players throw arrows into a jar.',
        },
      },
    ],
    vocabulary: [
      { term: '윷놀이 Yutnori', meaning: { ko: '윷가락과 말판으로 하는 놀이', en: 'Board game using wooden sticks' } },
      { term: '제기차기 Jegichagi', meaning: { ko: '제기를 발로 차는 놀이', en: 'Foot-kicking game' } },
      { term: '투호 Tuho', meaning: { ko: '항아리에 화살을 던지는 놀이', en: 'Arrow-throwing jar game' } },
    ],
  },
];

export const quizBank = {
  houses: [
    {
      prompt: {
        ko: '한옥에서 바닥을 따뜻하게 데우는 전통 난방 방식은 무엇인가요?',
        en: 'What is the traditional floor heating system in hanok called?',
      },
      options: {
        ko: ['온돌', '마루', '저고리', '투호'],
        en: ['Ondol', 'Maru', 'Jeogori', 'Tuho'],
      },
      answerIndex: 0,
      feedback: {
        ko: '맞아요. 온돌은 바닥을 데워 실내를 따뜻하게 합니다.',
        en: 'Correct. Ondol warms the floor to heat the room.',
      },
      relatedSectionId: 'houses',
    },
    {
      prompt: {
        ko: '마루의 중요한 역할로 알맞은 것은 무엇인가요?',
        en: 'What is a main role of maru?',
      },
      options: {
        ko: ['바람이 통하게 하기', '화살을 던지기', '옷의 윗부분 만들기', '놀이 말을 움직이기'],
        en: ['Helping air flow', 'Throwing arrows', 'Making an upper garment', 'Moving game pieces'],
      },
      answerIndex: 0,
      feedback: {
        ko: '맞아요. 마루는 바람이 잘 통하게 해 여름을 시원하게 합니다.',
        en: 'Correct. Maru helps air flow and keeps the space cool.',
      },
      relatedSectionId: 'houses',
    },
    {
      prompt: {
        ko: '전통 한옥에 주로 쓰이는 재료가 아닌 것은 무엇인가요?',
        en: 'Which material is not typical for traditional hanok?',
      },
      options: {
        ko: ['나무', '흙', '종이', '플라스틱'],
        en: ['Wood', 'Earth', 'Paper', 'Plastic'],
      },
      answerIndex: 3,
      feedback: {
        ko: '맞아요. 한옥은 주로 자연 재료를 사용합니다.',
        en: 'Correct. Hanok mainly uses natural materials.',
      },
      relatedSectionId: 'houses',
    },
  ],
  hanbok: [
    {
      prompt: {
        ko: '한복의 윗옷은 무엇이라고 하나요?',
        en: 'What is the upper garment of hanbok called?',
      },
      options: {
        ko: ['저고리', '온돌', '마루', '윷'],
        en: ['Jeogori', 'Ondol', 'Maru', 'Yut'],
      },
      answerIndex: 0,
      feedback: {
        ko: '맞아요. 저고리는 한복의 윗옷입니다.',
        en: 'Correct. Jeogori is the upper garment of hanbok.',
      },
      relatedSectionId: 'hanbok',
    },
    {
      prompt: {
        ko: '한복을 설명하는 특징으로 알맞은 것은 무엇인가요?',
        en: 'Which feature often describes hanbok?',
      },
      options: {
        ko: ['부드러운 선과 움직임', '단단한 금속 구조', '바닥 난방', '항아리에 화살 넣기'],
        en: ['Soft lines and movement', 'A hard metal structure', 'Floor heating', 'Throwing arrows into a jar'],
      },
      answerIndex: 0,
      feedback: {
        ko: '맞아요. 한복은 부드러운 선과 넉넉한 움직임이 특징입니다.',
        en: 'Correct. Hanbok is known for soft lines and graceful movement.',
      },
      relatedSectionId: 'hanbok',
    },
    {
      prompt: {
        ko: '한복을 자주 입는 날로 알맞은 것은 무엇인가요?',
        en: 'When is hanbok often worn?',
      },
      options: {
        ko: ['명절과 결혼식', '매일 운동할 때', '비행기 조종할 때', '공사 현장에서'],
        en: ['Holidays and weddings', 'Daily exercise', 'Flying an airplane', 'At a construction site'],
      },
      answerIndex: 0,
      feedback: {
        ko: '맞아요. 한복은 명절, 결혼식, 의식에서 자주 입습니다.',
        en: 'Correct. Hanbok is often worn for holidays, weddings, and ceremonies.',
      },
      relatedSectionId: 'hanbok',
    },
  ],
  games: [
    {
      prompt: {
        ko: '윷가락을 던져 말을 움직이는 놀이는 무엇인가요?',
        en: 'Which game uses wooden sticks to move pieces on a board?',
      },
      options: {
        ko: ['윷놀이', '온돌', '저고리', '마루'],
        en: ['Yutnori', 'Ondol', 'Jeogori', 'Maru'],
      },
      answerIndex: 0,
      feedback: {
        ko: '맞아요. 윷놀이는 대표적인 명절 놀이입니다.',
        en: 'Correct. Yutnori is a well-known holiday game.',
      },
      relatedSectionId: 'games',
    },
    {
      prompt: {
        ko: '제기를 발로 차며 떨어뜨리지 않는 놀이는 무엇인가요?',
        en: 'Which game is played by kicking a jegi with the foot?',
      },
      options: {
        ko: ['제기차기', '투호', '한옥', '치마'],
        en: ['Jegichagi', 'Tuho', 'Hanok', 'Chima'],
      },
      answerIndex: 0,
      feedback: {
        ko: '맞아요. 제기차기는 발로 제기를 차는 놀이입니다.',
        en: 'Correct. Jegichagi is played by kicking a jegi.',
      },
      relatedSectionId: 'games',
    },
    {
      prompt: {
        ko: '항아리에 화살을 던져 넣는 전통놀이는 무엇인가요?',
        en: 'Which traditional game uses arrows and a jar?',
      },
      options: {
        ko: ['투호', '윷놀이', '온돌', '저고리'],
        en: ['Tuho', 'Yutnori', 'Ondol', 'Jeogori'],
      },
      answerIndex: 0,
      feedback: {
        ko: '맞아요. 투호는 항아리에 화살을 던져 넣는 놀이입니다.',
        en: 'Correct. Tuho is played by throwing arrows into a jar.',
      },
      relatedSectionId: 'games',
    },
  ],
  mixed: [],
};

quizBank.mixed = [
  quizBank.houses[0],
  quizBank.hanbok[0],
  quizBank.games[0],
  quizBank.houses[1],
  quizBank.games[2],
];
