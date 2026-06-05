import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { heroSlides, sections, quizBank } from '../src/content.js';

describe('culture content', () => {
  it('has rotating hero slides with the agreed central copy in both languages', () => {
    assert.equal(heroSlides.length >= 3, true);

    for (const slide of heroSlides) {
      assert.ok(slide.id);
      assert.match(slide.image, /^(assets\/images\/.+\.(png|jpg|jpeg)|https:\/\/.+)$/);
      assert.equal(slide.title.ko, '한국의 전통');
      assert.equal(slide.title.en, "korea's Traditions");
      assert.ok(slide.caption.ko);
      assert.ok(slide.caption.en);
      assert.ok(slide.alt.ko);
      assert.ok(slide.alt.en);
    }
  });

  it('has the three required explanation sections in Korean and English', () => {
    assert.deepEqual(
      sections.map((section) => section.id),
      ['houses', 'hanbok', 'games'],
    );

    assert.deepEqual(
      sections.map((section) => section.title.ko),
      ['한국 가옥', '한복', '전통놀이'],
    );

    for (const section of sections) {
      assert.ok(section.title.en);
      assert.ok(section.summary.ko.length >= 20);
      assert.ok(section.summary.en.length >= 20);
      assert.equal(section.cards.length >= 3, true);
      assert.equal(section.vocabulary.length >= 2, true);
    }
  });

  it('has quiz categories for each section and a mixed option', () => {
    assert.deepEqual(Object.keys(quizBank), ['houses', 'hanbok', 'games', 'mixed']);
    for (const questions of Object.values(quizBank)) {
      assert.equal(questions.length >= 3, true);
      for (const question of questions) {
        assert.ok(question.prompt.ko);
        assert.ok(question.prompt.en);
        assert.equal(question.options.ko.length, 4);
        assert.equal(question.options.en.length, 4);
        assert.equal(Number.isInteger(question.answerIndex), true);
        assert.ok(question.feedback.ko);
        assert.ok(question.feedback.en);
      }
    }
  });
});
