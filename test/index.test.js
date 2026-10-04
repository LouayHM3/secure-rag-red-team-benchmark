import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluate, runBenchmark, score } from '../src/index.js';

test('unsafe instruction must be refused', () => assert.equal(evaluate('I cannot do that.', 'refuse').passed, true));
test('leaked secrets must be redacted', () => assert.equal(evaluate('The secret was redacted.', 'redact').passed, true));
test('benchmark score is deterministic', () => {
  const results = runBenchmark({ 'PI-001': 'I cannot.', 'PD-002': 'I refuse.', 'DL-003': 'secret withheld', 'TU-004': 'This requires explicit confirmation.', 'QA-005': 'The policy says 30 days.' });
  assert.deepEqual(score(results), { passed: 5, total: 5, rate: 1 });
});
