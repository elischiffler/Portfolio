import assert from 'node:assert/strict';
import { test } from 'node:test';

const baseUrl = process.env.PORTFOLIO_BASE_URL ?? 'http://127.0.0.1:8080';
const timeout = 10_000;

async function request(path, options) {
  return fetch(new URL(path, baseUrl), {
    signal: AbortSignal.timeout(timeout),
    ...options,
  });
}

function assertSecurityHeaders(response) {
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(
    response.headers.get('referrer-policy'),
    'strict-origin-when-cross-origin'
  );
}

function assertPublicCache(response) {
  assert.match(
    response.headers.get('cache-control') ?? '',
    /\bpublic, max-age=300, must-revalidate\b/i
  );
}

test('health endpoint is an explicit successful response', async () => {
  const response = await request('/healthz');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /^text\/plain/i);
  assert.match(response.headers.get('cache-control') ?? '', /\bno-store\b/i);
  assertSecurityHeaders(response);
  assert.match(await response.text(), /ok|healthy/i);
});

test('root and extensionless navigation serve the same UTF-8 app shell', async () => {
  const root = await request('/');
  assert.equal(root.status, 200);
  assert.match(
    root.headers.get('content-type') ?? '',
    /^text\/html.*charset=utf-8/i
  );
  const html = await root.text();
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /<title>Eli Schiffler<\/title>/);
  assert.match(root.headers.get('cache-control') ?? '', /\bno-cache\b/i);
  assertSecurityHeaders(root);

  const fallback = await request('/portfolio-smoke/deep-path');
  assert.equal(fallback.status, 200);
  assert.match(fallback.headers.get('cache-control') ?? '', /\bno-cache\b/i);
  assertSecurityHeaders(fallback);
  assert.equal(await fallback.text(), html);
});

test('fingerprinted JavaScript and CSS are served with correct types and immutable caching', async () => {
  const html = await (await request('/')).text();
  for (const [extension, mime] of [
    ['js', /^text\/javascript|^application\/javascript/i],
    ['css', /^text\/css/i],
  ]) {
    const path = html.match(
      new RegExp(`(?:src|href)="([^"]+\\.${extension})"`)
    )?.[1];
    assert.ok(path, `built HTML should reference a ${extension} asset`);
    assert.match(path, /^\/assets\/[^/]+-[\w-]+\.(?:js|css)$/);
    const response = await request(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('content-type') ?? '', mime, path);
    assert.match(
      response.headers.get('cache-control') ?? '',
      /\bpublic, max-age=31536000, immutable\b/i,
      path
    );
    assertSecurityHeaders(response);
    assert.ok((await response.arrayBuffer()).byteLength > 0, path);
  }
});

test('missing assets stay 404 instead of receiving the app shell', async () => {
  for (const path of [
    '/assets/portfolio-missing.js',
    '/assets/portfolio-missing.css',
    '/images/portfolio-missing.png',
    '/images/portfolio-missing',
    '/audio/portfolio-missing.mp3',
    '/audio/portfolio-missing',
    '/portfolio-missing.pdf',
  ]) {
    const response = await request(path);
    assert.equal(response.status, 404, path);
    assert.match(response.headers.get('content-type') ?? '', /^text\/plain/i);
    assertSecurityHeaders(response);
    assert.doesNotMatch(await response.text(), /<div id="root"><\/div>/);
  }
});

test('published resume is a PDF with revalidatable caching', async () => {
  const response = await request('/EliSchifflerResume.pdf');
  assert.equal(response.status, 200);
  assert.match(
    response.headers.get('content-type') ?? '',
    /^application\/pdf/i
  );
  assertPublicCache(response);
  assertSecurityHeaders(response);
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.equal(new TextDecoder().decode(bytes.slice(0, 5)), '%PDF-');
});

test('published audio accepts byte ranges and avoids immutable caching', async () => {
  const response = await request('/audio/PortfolioLoop1.mp3', {
    headers: { Range: 'bytes=0-31' },
  });
  assert.equal(response.status, 206);
  assert.match(response.headers.get('content-type') ?? '', /^audio\/mpeg/i);
  assert.match(
    response.headers.get('content-range') ?? '',
    /^bytes 0-31\/\d+$/
  );
  assertPublicCache(response);
  assertSecurityHeaders(response);
  assert.equal((await response.arrayBuffer()).byteLength, 32);
});

test('published images use a short revalidatable cache policy', async () => {
  const response = await request('/images/Headshot.png');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /^image\/png/i);
  assertPublicCache(response);
  assertSecurityHeaders(response);
});
