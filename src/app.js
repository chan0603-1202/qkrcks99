import { heroSlides, quizBank, sections } from './content.js?v=one-page-2';
import {
  answerQuestion,
  closeMenu,
  createAppState,
  navigateTo,
  nextQuestion,
  openMenu,
  setActiveSlide,
  setLanguage,
  startQuiz,
} from './state.js?v=one-page-2';
import { renderApp } from './render.js?v=one-page-2';

const root = document.querySelector('#app');
const data = { heroSlides, sections, quizBank };
const localImages = {
  houses: 'assets/images/hanok-fixed.svg',
  hanok: 'assets/images/hanok-fixed.svg',
  hanbok: 'https://www.handmk.com/news/photo/202301/14567_34731_2622.jpg',
  games: 'assets/images/yutnori-fixed.svg',
};

for (const slide of data.heroSlides) {
  slide.image = localImages[slide.id] || slide.image;
}

for (const section of data.sections) {
  const image = localImages[section.id];
  if (image) {
    section.menuImage = image;
    section.heroImage = image;
  }
}

let state = createAppState();

function render() {
  root.innerHTML = renderApp(state, data);
  document.body.classList.toggle('menu-open', state.menuOpen);
}

function handleRoute(target) {
  const routeButton = target.closest('[data-route]');
  if (!routeButton) {
    return false;
  }

  state = navigateTo(
    state,
    routeButton.dataset.route,
    routeButton.dataset.sectionId || null,
  );
  render();
  return true;
}

function handleQuizStart(target) {
  const quizButton = target.closest('[data-quiz-category]');
  if (!quizButton) {
    return false;
  }

  const categoryId = quizButton.dataset.quizCategory;
  state = startQuiz(state, categoryId, quizBank[categoryId]);
  render();
  return true;
}

function handleAnswer(target) {
  const answerButton = target.closest('[data-answer-index]');
  if (!answerButton) {
    return false;
  }

  state = answerQuestion(state, Number(answerButton.dataset.answerIndex));
  render();
  return true;
}

root.addEventListener('click', (event) => {
  const target = event.target;
  const action = target.closest('[data-action]')?.dataset.action;
  const language = target.closest('[data-language]')?.dataset.language;

  if (language) {
    state = setLanguage(state, language);
    render();
    return;
  }

  if (action === 'open-menu') {
    state = openMenu(state);
    render();
    return;
  }

  if (action === 'close-menu') {
    state = closeMenu(state);
    render();
    return;
  }

  if (action === 'next-question') {
    state = nextQuestion(state);
    render();
    return;
  }

  if (handleAnswer(target)) return;
  if (handleQuizStart(target)) return;
  handleRoute(target);
});

setInterval(() => {
  if (state.route !== 'home' || state.menuOpen) {
    return;
  }

  state = setActiveSlide(state, (state.activeSlide + 1) % data.heroSlides.length);
  render();
}, 4500);

render();
