const labels = {
  ko: {
    menu: '메뉴',
    close: '닫기',
    home: '처음 화면',
    quiz: '문화 퀴즈',
    chooseQuiz: '퀴즈 선택',
    start: '들어가기',
    backHome: '처음으로',
    review: '퀴즈로 복습하기',
    result: '결과',
    again: '다시 풀기',
    related: '설명 다시 보기',
    next: '다음',
    explore: '둘러보기',
    menuTitle: '한국 전통문화',
    optionalQuiz: '원하는 사람만 들어가는 복습 공간',
    keyWords: '핵심 단어',
    questionCount: '문항',
    quizCategories: {
      houses: '한국 가옥 퀴즈',
      hanbok: '한복 퀴즈',
      games: '전통놀이 퀴즈',
      mixed: '랜덤 퀴즈',
    },
  },
  en: {
    menu: 'Menu',
    close: 'Close',
    home: 'Home',
    quiz: 'Culture Quiz',
    chooseQuiz: 'Choose a Quiz',
    start: 'Open',
    backHome: 'Home',
    review: 'Review with Quiz',
    result: 'Result',
    again: 'Try Again',
    related: 'Review Section',
    next: 'Next',
    explore: 'Explore',
    menuTitle: 'Korean Tradition',
    optionalQuiz: 'Optional review and play space',
    keyWords: 'Key Words',
    questionCount: 'questions',
    quizCategories: {
      houses: 'Korean Houses Quiz',
      hanbok: 'Hanbok Quiz',
      games: 'Traditional Games Quiz',
      mixed: 'Random Quiz',
    },
  },
};

function htmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function copy(value, language) {
  if (typeof value === 'string') {
    return htmlEscape(value);
  }
  return htmlEscape(value[language] || value.ko || '');
}

function optionCopy(question, language) {
  if (Array.isArray(question.options)) {
    return question.options;
  }
  return question.options[language] || question.options.ko || [];
}

function renderLanguageToggle(language) {
  return `
    <div class="language-toggle" aria-label="Language">
      <button class="${language === 'ko' ? 'active' : ''}" data-language="ko" type="button">KR</button>
      <button class="${language === 'en' ? 'active' : ''}" data-language="en" type="button">EN</button>
    </div>
  `;
}

function renderTopBar(state) {
  const { language } = state;
  return `
    <header class="top-bar">
      <button class="menu-button" data-action="open-menu" type="button" aria-label="${labels[language].menu}">
        <span></span><span></span><span></span>
      </button>
      ${renderLanguageToggle(language)}
    </header>
  `;
}

function renderHome(state, data) {
  const { language } = state;
  const slide = data.heroSlides[state.activeSlide % data.heroSlides.length];
  return `
    <section class="hero-screen" style="--hero-image: url('${htmlEscape(slide.image)}')">
      ${renderTopBar(state)}
      <div class="hero-copy">
        <p>${copy(slide.caption, language)}</p>
        <h1>${copy(slide.title, language)}</h1>
      </div>
      <div class="slide-dots" aria-label="Slides">
        ${data.heroSlides.map((item, index) => `
          <span class="${index === state.activeSlide ? 'active' : ''}" aria-label="${copy(item.caption, language)}"></span>
        `).join('')}
      </div>
    </section>
  `;
}

function renderMenu(state, data) {
  const { language } = state;
  const menuClass = state.menuOpen ? 'menu-panel open' : 'menu-panel';
  return `
    <aside class="${menuClass}" aria-hidden="${state.menuOpen ? 'false' : 'true'}">
      <div class="menu-head">
        <div>
          <p>${labels[language].explore}</p>
          <h2>${labels[language].menuTitle}</h2>
        </div>
        <button class="close-button" data-action="close-menu" type="button">${labels[language].close}</button>
      </div>
      <nav class="menu-cards">
        ${data.sections.map((section) => `
          <button class="menu-card" data-route="section" data-section-id="${section.id}" type="button">
            <img src="${htmlEscape(section.menuImage)}" alt="${copy(section.title, language)}">
            <span>
              <strong>${copy(section.title, language)}</strong>
              <small>${copy(section.kicker, language)}</small>
            </span>
          </button>
        `).join('')}
        <button class="menu-card quiz-card" data-route="quiz" type="button">
          <span>
            <strong>${labels[language].quiz}</strong>
            <small>${labels[language].optionalQuiz}</small>
          </span>
        </button>
      </nav>
    </aside>
    <button class="${state.menuOpen ? 'menu-scrim open' : 'menu-scrim'}" data-action="close-menu" type="button" aria-label="${labels[language].close}"></button>
  `;
}

function renderSection(state, data) {
  const { language } = state;
  const section = data.sections.find((item) => item.id === state.sectionId) || data.sections[0];
  return `
    <section class="content-page">
      ${renderTopBar(state)}
      <button class="back-link" data-route="home" type="button">${labels[language].backHome}</button>
      <img class="section-hero" src="${htmlEscape(section.heroImage)}" alt="${copy(section.title, language)}">
      <p class="kicker">${copy(section.kicker, language)}</p>
      <h1>${copy(section.title, language)}</h1>
      <p class="summary">${copy(section.summary, language)}</p>
      <div class="info-grid">
        ${section.cards.map((card) => `
          <article class="info-card">
            <h2>${copy(card.title, language)}</h2>
            <p>${copy(card.body, language)}</p>
          </article>
        `).join('')}
      </div>
      <section class="vocab-box">
        <h2>${labels[language].keyWords}</h2>
        ${section.vocabulary.map((word) => `
          <div>
            <strong>${htmlEscape(word.term)}</strong>
            <span>${copy(word.meaning, language)}</span>
          </div>
        `).join('')}
      </section>
      <button class="primary-action" data-quiz-category="${section.id}" type="button">${labels[language].review}</button>
    </section>
  `;
}

function renderQuizChooser(state, data) {
  const { language } = state;
  const categories = ['houses', 'hanbok', 'games', 'mixed'];

  return `
    <section class="quiz-page">
      ${renderTopBar(state)}
      <button class="back-link" data-route="home" type="button">${labels[language].backHome}</button>
      <p class="kicker">${labels[language].quiz}</p>
      <h1>${labels[language].chooseQuiz}</h1>
      <div class="quiz-options">
        ${categories.map((id) => `
          <button class="quiz-option" data-quiz-category="${id}" type="button">
            <strong>${labels[language].quizCategories[id]}</strong>
            <span>${data.quizBank[id].length} ${labels[language].questionCount}</span>
          </button>
        `).join('')}
      </div>
    </section>
  `;
}

function renderQuizQuestion(state) {
  const { language, quiz } = state;
  const question = quiz.questions[quiz.currentIndex];
  const options = optionCopy(question, language);
  const answered = quiz.answers.find((answer) => answer.questionIndex === quiz.currentIndex);
  const nextLabel = quiz.currentIndex + 1 === quiz.questions.length
    ? labels[language].result
    : labels[language].next;

  return `
    <section class="quiz-page quiz-question">
      ${renderTopBar(state)}
      <p class="kicker">${quiz.currentIndex + 1} / ${quiz.questions.length}</p>
      <h1>${copy(question.prompt, language)}</h1>
      <div class="answer-list">
        ${options.map((option, index) => `
          <button class="answer-button ${answered?.selectedIndex === index ? 'selected' : ''}" data-answer-index="${index}" type="button">
            ${htmlEscape(option)}
          </button>
        `).join('')}
      </div>
      ${answered ? `<p class="feedback">${copy(question.feedback, language)}</p>` : ''}
      ${answered ? `<button class="primary-action" data-action="next-question" type="button">${nextLabel}</button>` : ''}
    </section>
  `;
}

function renderQuizResult(state) {
  const { language, quiz } = state;
  const score = quiz.answers.filter((answer) => answer.correct).length;
  const total = quiz.questions.length;
  const relatedSectionId = quiz.questions.find((question) => question.relatedSectionId)?.relatedSectionId || 'houses';

  return `
    <section class="quiz-page result-page">
      ${renderTopBar(state)}
      <p class="kicker">${labels[language].result}</p>
      <h1>${score} / ${total}</h1>
      <button class="primary-action" data-quiz-category="${quiz.categoryId}" type="button">${labels[language].again}</button>
      <button class="secondary-action" data-route="section" data-section-id="${relatedSectionId}" type="button">${labels[language].related}</button>
    </section>
  `;
}

export function renderApp(state, data) {
  const body = state.route === 'section'
    ? renderSection(state, data)
    : state.route === 'quiz' && state.quiz?.complete
      ? renderQuizResult(state, data)
      : state.route === 'quiz' && state.quiz
        ? renderQuizQuestion(state, data)
        : state.route === 'quiz'
          ? renderQuizChooser(state, data)
          : renderHome(state, data);

  return `${body}${renderMenu(state, data)}`;
}
