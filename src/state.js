export const supportedLanguages = ['ko', 'en'];
export const routes = ['home', 'section', 'quiz'];

export function createAppState() {
  return {
    language: 'ko',
    route: 'home',
    sectionId: null,
    menuOpen: false,
    activeSlide: 0,
    quiz: null,
  };
}

export function setLanguage(state, language) {
  if (!supportedLanguages.includes(language)) {
    return state;
  }
  return { ...state, language };
}

export function openMenu(state) {
  return { ...state, menuOpen: true };
}

export function closeMenu(state) {
  return { ...state, menuOpen: false };
}

export function setActiveSlide(state, activeSlide) {
  return { ...state, activeSlide };
}

export function navigateTo(state, route, sectionId = null) {
  if (!routes.includes(route)) {
    return state;
  }

  return {
    ...state,
    route,
    sectionId: route === 'section' ? sectionId : null,
    menuOpen: false,
    quiz: null,
  };
}

function shuffleQuestion(question, random) {
  const order = question.options.ko.map((_, index) => index);

  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }

  return {
    ...question,
    options: {
      ko: order.map((index) => question.options.ko[index]),
      en: order.map((index) => question.options.en[index]),
    },
    answerIndex: order.indexOf(question.answerIndex),
  };
}

export function startQuiz(state, categoryId, questions, random = Math.random) {
  return {
    ...state,
    route: 'quiz',
    sectionId: null,
    menuOpen: false,
    quiz: {
      categoryId,
      questions: questions.map((question) => shuffleQuestion(question, random)),
      currentIndex: 0,
      answers: [],
      complete: false,
    },
  };
}

export function answerQuestion(state, selectedIndex) {
  if (!state.quiz || state.quiz.complete) {
    return state;
  }

  const question = state.quiz.questions[state.quiz.currentIndex];
  const alreadyAnswered = state.quiz.answers.some(
    (answer) => answer.questionIndex === state.quiz.currentIndex,
  );

  if (alreadyAnswered) {
    return state;
  }

  const answers = [...state.quiz.answers];

  answers.push({
    questionIndex: state.quiz.currentIndex,
    selectedIndex,
    correct: selectedIndex === question.answerIndex,
  });

  return {
    ...state,
    quiz: { ...state.quiz, answers },
  };
}

export function nextQuestion(state) {
  if (!state.quiz) {
    return state;
  }

  const nextIndex = state.quiz.currentIndex + 1;
  const complete = nextIndex >= state.quiz.questions.length;

  return {
    ...state,
    quiz: {
      ...state.quiz,
      currentIndex: complete ? state.quiz.currentIndex : nextIndex,
      complete,
    },
  };
}

export function getQuizResult(state) {
  if (!state.quiz) {
    return { score: 0, total: 0 };
  }

  return {
    score: state.quiz.answers.filter((answer) => answer.correct).length,
    total: state.quiz.questions.length,
  };
}
