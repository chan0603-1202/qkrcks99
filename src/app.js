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
const hanokPhoto = 'data:image/jpeg;base64,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或js43cg==';
const localImages = {
  houses: hanokPhoto,
  hanok: hanokPhoto,
  hanbok: 'https://www.handmk.com/news/photo/202301/14567_34731_2622.jpg',
  games: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Yut_Nori.jpg/500px-Yut_Nori.jpg',
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
