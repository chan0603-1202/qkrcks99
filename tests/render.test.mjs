import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { heroSlides, quizBank, sections } from '../src/content.js';
import { createAppState, setLanguage, startQuiz } from '../src/state.js';
import { renderApp } from '../src/render.js';

describe('renderApp', () => {
  it('renders the rotating home screen, hamburger menu, and Korean central copy', () => {
    const html = renderApp(createAppState(), { heroSlides, sections, quizBank });
    assert.match(html, /class="hero-screen"/);
    assert.match(html, /data-action="open-menu"/);
    assert.match(html, /한국의 전통/);
    assert.match(html, /class="menu-panel[^"]*"/);
    assert.match(html, /aria-hidden="true"/);
  });

  it('renders the English central copy when language is changed', () => {
    const state = setLanguage(createAppState(), 'en');
    const html = renderApp(state, { heroSlides, sections, quizBank });
    assert.match(html, /korea&#39;s Traditions/);
  });

  it('renders the slide menu with the four required Korean entries when open', () => {
    const state = { ...createAppState(), menuOpen: true };
    const html = renderApp(state, { heroSlides, sections, quizBank });
    assert.match(html, /class="menu-panel[^"]*open[^"]*"/);
    assert.match(html, /한국 가옥/);
    assert.match(html, /한복/);
    assert.match(html, /전통놀이/);
    assert.match(html, />퀴즈</);
    assert.doesNotMatch(html, /문화 퀴즈/);
    assert.doesNotMatch(html, /원하는 사람만/);
  });

  it('renders the slide menu with the four required English entries when open', () => {
    const state = { ...setLanguage(createAppState(), 'en'), menuOpen: true };
    const html = renderApp(state, { heroSlides, sections, quizBank });
    assert.match(html, /Korean Houses/);
    assert.match(html, /Hanbok/);
    assert.match(html, /Traditional Games/);
    assert.match(html, />Quiz</);
    assert.doesNotMatch(html, /Culture Quiz/);
    assert.doesNotMatch(html, /Optional review/);
  });

  it('renders a section page', () => {
    const state = { ...createAppState(), route: 'section', sectionId: 'hanbok' };
    const html = renderApp(state, { heroSlides, sections, quizBank });
    assert.match(html, /class="content-page"/);
    assert.match(html, /한복/);
    assert.match(html, /저고리/);
  });

  it('renders the quiz chooser and quiz question', () => {
    const chooserHtml = renderApp({ ...createAppState(), route: 'quiz' }, { heroSlides, sections, quizBank });
    assert.match(chooserHtml, />퀴즈</);
    assert.match(chooserHtml, /data-quiz-category="houses"/);
    assert.doesNotMatch(chooserHtml, /문화 퀴즈/);
    assert.doesNotMatch(chooserHtml, /원하는 사람만/);

    const quizState = startQuiz(createAppState(), 'houses', quizBank.houses);
    const questionHtml = renderApp(quizState, { heroSlides, sections, quizBank });
    assert.match(questionHtml, /quiz-question/);
    assert.match(questionHtml, /data-answer-index="0"/);
  });
});
