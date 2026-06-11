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
const hanokPhoto = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Korea-Seoul-Namsangol-02.jpg/960px-Korea-Seoul-Namsangol-02.jpg';
const localImages = {
  houses: hanokPhoto,
  hanok: hanokPhoto,
  hanbok: 'https://www.handmk.com/news/photo/202301/14567_34731_2622.jpg',
  games: 'https://norifriends.com/web/product/big/202512/d61c3476b5a4fc6ce872e2f91234b6d6.jpg',
};

const yutnoriFrameStyle = document.createElement('style');
yutnoriFrameStyle.textContent = `
  .hero-photo[src*="Yut_Nori"],
  .hero-photo[src*="yutnori-realistic"],
  .hero-photo[src*="yutnori-landscape"],
  .hero-photo[src*="norifriends.com/web/product/big/202512/d61c3476b5a4fc6ce872e2f91234b6d6"] {
    top: clamp(184px, 25svh, 232px);
    height: clamp(260px, 36svh, 360px);
    object-fit: cover;
    object-position: center center;
  }
`;
document.head.append(yutnoriFrameStyle);

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
