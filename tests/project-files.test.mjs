import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'package.json',
  'vercel.json',
  'index.html',
  'tools/build.mjs',
  'src/content.js',
  'src/state.js',
  'src/render.js',
  'src/app.js',
  'src/styles.css',
];

describe('project structure', () => {
  it('contains the required app files', () => {
    for (const file of requiredFiles) {
      assert.equal(existsSync(file), true, `${file} should exist`);
    }
  });

  it('defines test and build scripts', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    assert.equal(pkg.type, 'module');
    assert.equal(pkg.scripts.test, 'node --test tests/*.test.mjs');
    assert.equal(pkg.scripts.build, 'node tools/build.mjs');
  });

  it('configures Vercel static deployment', () => {
    const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
    assert.equal(config.buildCommand, 'npm run build');
    assert.equal(config.outputDirectory, 'dist');
    assert.equal(config.cleanUrls, true);
    assert.equal(config.trailingSlash, false);
  });

  it('mounts the web app from index.html', () => {
    const html = readFileSync('index.html', 'utf8');
    assert.match(html, /<main id="app"/);
    assert.match(html, /<style>/);
    assert.match(html, /<script type="module"/);
    assert.match(html, /한국의 전통/);
  });

  it('keeps fallback navigation inside the hamburger slide panel', () => {
    const html = readFileSync('index.html', 'utf8');
    assert.doesNotMatch(html, /<main id="app"[^>]*>\s*<\/main>/);
    assert.match(html, /data-view="fallback"/);
    assert.match(html, /id="menuPanel"/);
    assert.doesNotMatch(html, /href="#menuPanel"/);
    assert.match(html, /data-fallback-action="open-menu"/);
    assert.match(html, /data-fallback-action="close-menu"/);
    assert.match(html, /href="#houses"/);
    assert.match(html, /href="#quiz"/);
    assert.doesNotMatch(html, /<section id="menu"/);
    assert.doesNotMatch(html, /원하는 사람만/);
    assert.doesNotMatch(html, /문화 퀴즈/);
    assert.doesNotMatch(html, /Optional review/);
    assert.match(html, />퀴즈</);
    assert.match(html, />Quiz</);
  });

  it('uses a navy magazine backdrop with restrained dancheong borders', () => {
    const html = readFileSync('index.html', 'utf8');
    assert.match(html, /--navy:\s*#12284c/);
    assert.match(html, /body[\s\S]*background:[\s\S]*var\(--navy\)/);
    assert.match(html, /dancheong-edge/);
  });
});
