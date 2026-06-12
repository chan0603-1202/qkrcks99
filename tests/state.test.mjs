import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  answerQuestion,
  closeMenu,
  createAppState,
  getQuizResult,
  navigateTo,
  nextQuestion,
  openMenu,
  setLanguage,
  startQuiz,
} from '../src/state.js';
import { quizBank } from '../src/content.js';

describe('app state', () => {
  it('starts on the home route in Korean with the menu closed', () => {
    assert.deepEqual(createAppState(), {
      language: 'ko',
      route: 'home',
      sectionId: null,
      menuOpen: false,
      activeSlide: 0,
      quiz: null,
    });
  });

  it('changes language only for supported values', () => {
    const state = createAppState();
    assert.equal(setLanguage(state, 'en').language, 'en');
    assert.equal(setLanguage(state, 'fr').language, 'ko');
  });

  it('opens and closes the slide menu', () => {
    const state = createAppState();
    assert.equal(openMenu(state).menuOpen, true);
    assert.equal(closeMenu(openMenu(state)).menuOpen, false);
  });

  it('navigates to content and quiz chooser routes', () => {
    const state = createAppState();
    const sectionState = navigateTo(state, 'section', 'houses');
    assert.equal(sectionState.route, 'section');
    assert.equal(sectionState.sectionId, 'houses');
    assert.equal(sectionState.menuOpen, false);

    const quizState = navigateTo(startQuiz(state, 'houses', quizBank.houses), 'quiz');
    assert.equal(quizState.route, 'quiz');
    assert.equal(quizState.sectionId, null);
    assert.equal(quizState.quiz, null);
  });

  it('scores quiz answers and advances questions', () => {
    let state = startQuiz(createAppState(), 'houses', quizBank.houses);
    assert.equal(state.quiz.categoryId, 'houses');
    assert.equal(state.quiz.currentIndex, 0);

    state = answerQuestion(state, state.quiz.questions[0].answerIndex);
    assert.equal(state.quiz.answers[0].correct, true);

    state = nextQuestion(state);
    assert.equal(state.quiz.currentIndex, 1);

    state = answerQuestion(state, 3);
    const result = getQuizResult(state);
    assert.equal(result.total, quizBank.houses.length);
    assert.equal(result.score, 1);
  });

  it('randomizes quiz answer order and keeps the correct answer mapped', () => {
    const state = startQuiz(createAppState(), 'houses', quizBank.houses, () => 0);
    const question = state.quiz.questions[0];

    assert.notDeepEqual(question.options.ko, quizBank.houses[0].options.ko);
    assert.equal(question.answerIndex, 3);

    const answered = answerQuestion(state, question.answerIndex);
    assert.equal(answered.quiz.answers[0].correct, true);
  });

  it('does not allow changing an answer after selecting once', () => {
    const state = startQuiz(createAppState(), 'games', quizBank.games);
    const firstChoice = answerQuestion(state, 1);
    const changedChoice = answerQuestion(firstChoice, state.quiz.questions[0].answerIndex);

    assert.deepEqual(changedChoice.quiz.answers, firstChoice.quiz.answers);
    assert.equal(changedChoice.quiz.answers[0].selectedIndex, 1);
  });
});
