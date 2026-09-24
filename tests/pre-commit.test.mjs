import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { test } from 'node:test';

const indexPath = spawnSync('git', ['rev-parse', '--git-path', 'index'], {
  encoding: 'utf8',
});
assert.equal(indexPath.status, 0, indexPath.stderr);

function digest(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function checkRejectedWithoutChanges(fixture, contents, expectedStage) {
  writeFileSync(fixture, contents, { flag: 'wx' });
  const trackedSource = 'src/App.jsx';
  const before = {
    index: digest(indexPath.stdout.trim()),
    source: digest(trackedSource),
    fixture: digest(fixture),
  };

  try {
    const result = spawnSync('sh', ['.husky/pre-commit'], {
      encoding: 'utf8',
      timeout: 30_000,
    });
    assert.equal(result.status, 1, result.stderr || result.stdout);
    assert.match(result.stdout, expectedStage);
    assert.equal(digest(indexPath.stdout.trim()), before.index);
    assert.equal(digest(trackedSource), before.source);
    assert.equal(digest(fixture), before.fixture);
    return result.stdout + result.stderr;
  } finally {
    rmSync(fixture);
  }
}

test('pre-commit rejects lint errors before formatting without changing files or index', () => {
  const output = checkRejectedWithoutChanges(
    'tests/__hook_lint_fixture__.js',
    'const = ;\n',
    /eslint/
  );
  assert.doesNotMatch(output, /format:check/);
});

test('pre-commit rejects format errors without changing files or index', () => {
  const output = checkRejectedWithoutChanges(
    'tests/__hook_format_fixture__.css',
    'body{color:red}\n',
    /format:check/
  );
  assert.match(output, /__hook_format_fixture__\.css/);
});
