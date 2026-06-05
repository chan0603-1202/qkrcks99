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

export function startQuiz(state, categoryId, questions) {
  return {
    ...state,
    route: 'quiz',
    sectionId: null,
    menuOpen: false,
    quiz: {
      categoryId,
      questions,
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
  const answers = state.quiz.answers.filter(
    (answer) => answer.questionIndex !== state.quiz.currentIndex,
  );

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
