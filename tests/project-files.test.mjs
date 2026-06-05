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
    assert.equal(config.framework, null);
    assert.equal(config.buildCommand, 'npm test && npm run build');
    assert.equal(config.outputDirectory, 'dist');
  });

  it('mounts the web app from index.html', () => {
    const html = readFileSync('index.html', 'utf8');
    assert.match(html, /<main id="app"/);
    assert.match(html, /<style>/);
    assert.match(html, /<script>/);
    assert.match(html, /한국의 전통/);
  });
});
